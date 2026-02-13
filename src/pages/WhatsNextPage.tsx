import { useEffect, useRef, useState } from 'react'

const WhatsNextPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [fadeOpacity, setFadeOpacity] = useState(1)
  const [isFading, setIsFading] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [glitchText, setGlitchText] = useState({ line1: 'create', line2: 'stories...' })
  const glitchIntervalRef = useRef<number | null>(null)

  // Random glitch characters
  const glitchChars = '^@#(^($*)@)$&!%*+[]{}|\\/<>?~`'

  const generateGlitchText = (original: string) => {
    // Maintain the same length as original text
    return Array.from({ length: original.length }, () => 
      glitchChars[Math.floor(Math.random() * glitchChars.length)]
    ).join('')
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let fadeAnimationFrame: number | null = null
    let isPlaying = false

    const handleLoadedMetadata = () => {
      setVideoReady(true)
      setTextVisible(true)
      // Don't set currentTime here, wait for canplay
    }

    const handleCanPlay = async () => {
      if (!isPlaying) {
        try {
          // Set video to start at 3 seconds
          video.currentTime = 3
          // Wait a bit for the seek to complete
          await new Promise(resolve => setTimeout(resolve, 100))
          
          // Try to play
          const playPromise = video.play()
          if (playPromise !== undefined) {
            await playPromise
            isPlaying = true
          }
        } catch (err) {
          console.error('Error playing video:', err)
          setVideoError(true)
          setTextVisible(true)
        }
      }
    }

    const handleTimeUpdate = () => {
      // Start fading gradually from 7.5 seconds, complete by 8.5 seconds
      if (video.currentTime >= 7.5 && !isFading) {
        setIsFading(true)
      }
      
      // Calculate fade progress (0 to 1 from 7.5s to 8.5s)
      if (video.currentTime >= 7.5) {
        const fadeStart = 7.5
        const fadeEnd = 8.5
        let fadeProgress = 0
        
        if (video.currentTime <= fadeEnd) {
          fadeProgress = (video.currentTime - fadeStart) / (fadeEnd - fadeStart)
        } else {
          fadeProgress = 1 // Fully faded
        }
        
        // Use ease-out curve for smoother fade
        const easedProgress = 1 - Math.pow(1 - fadeProgress, 3)
        setFadeOpacity(1 - easedProgress)
      }
      
      // When video reaches 8.5 seconds, pause it (fully faded)
      if (video.currentTime >= 8.5 && !video.paused) {
        video.pause()
        setFadeOpacity(0)
      }
    }

    const handleError = () => {
      setVideoError(true)
      setVideoReady(false)
      // Show text even if video fails
      setTimeout(() => setTextVisible(true), 500)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('canplaythrough', handleCanPlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('error', handleError)

    // Set source and let browser handle loading
    // Don't call video.load() as it conflicts with React

    // Fallback: show text after 1 second even if video doesn't load
    const fallbackTimer = setTimeout(() => {
      if (!videoReady) {
        setTextVisible(true)
      }
    }, 1000)

    return () => {
      clearTimeout(fallbackTimer)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('canplaythrough', handleCanPlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('error', handleError)
      if (fadeAnimationFrame) {
        cancelAnimationFrame(fadeAnimationFrame)
      }
    }
  }, [isFading, videoReady])

  // Handle hover glitch animation
  useEffect(() => {
    if (isHovered) {
      const duration = 300 // 0.3 seconds
      
      // Rapidly change to glitch characters
      glitchIntervalRef.current = window.setInterval(() => {
        setGlitchText({
          line1: generateGlitchText('create'),
          line2: generateGlitchText('stories...')
        })
      }, 30) // Change every 30ms for fast glitch effect

      // After 0.3 seconds, change to "create comics"
      setTimeout(() => {
        if (glitchIntervalRef.current) {
          clearInterval(glitchIntervalRef.current)
          glitchIntervalRef.current = null
        }
        setGlitchText({
          line1: 'create',
          line2: 'comics...'
        })
      }, duration)
    } else {
      // Reset to original text when not hovered
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current)
        glitchIntervalRef.current = null
      }
      setGlitchText({
        line1: 'create',
        line2: 'stories...'
      })
    }

    return () => {
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current)
      }
    }
  }, [isHovered])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black" data-whats-next-page>
      {/* Video Background */}
      {!videoError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: fadeOpacity * 0.2,
            transition: 'opacity 0.1s linear'
          }}
          muted
          loop={false}
          playsInline
          preload="auto"
          onError={() => setVideoError(true)}
          onLoadedData={() => {
            const video = videoRef.current
            if (video) {
              video.currentTime = 3
            }
          }}
        >
          <source src="/Marvel Opening Theme - AM Clips (1080p, h264).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      )}

      {/* Subtle gradient overlay for text readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 transition-opacity duration-1000"
        style={{
          opacity: fadeOpacity
        }}
      />

      {/* Dark overlay that increases as video fades */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-1000"
        style={{
          opacity: 1 - fadeOpacity
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-4 sm:px-8 max-w-6xl mx-auto">
          {/* Main Heading */}
          <h1 
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-light text-white mb-8 tracking-tighter leading-none cursor-pointer select-none"
            style={{ 
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              textShadow: '0 0 60px rgba(255,255,255,0.15), 0 0 120px rgba(255,255,255,0.05)',
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1.5s ease-out, transform 1.5s ease-out, font-family 0.3s ease'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span 
              className="block font-light"
              style={{
                opacity: textVisible ? 0.98 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 1.8s ease-out 0.2s, transform 1.8s ease-out 0.2s',
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 300,
                fontStyle: 'normal'
              }}
            >
              {glitchText.line1}
            </span>
            <span 
              className="block mt-2 font-light"
              style={{
                opacity: textVisible ? 0.95 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 1.8s ease-out 0.4s, transform 1.8s ease-out 0.4s',
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 300,
                fontStyle: 'normal'
              }}
            >
              {glitchText.line2}
            </span>
          </h1>
        </div>
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  )
}

export default WhatsNextPage
