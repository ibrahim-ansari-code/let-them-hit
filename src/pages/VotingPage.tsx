import { useState } from 'react'

const VotingPage = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  const handleCardClick = (cardNumber: number) => {
    setSelectedCard(cardNumber)
  }

  const handleSkip = () => {
    setSelectedCard(null)
    // TODO: Implement skip logic
  }

  const handleDraw = () => {
    setSelectedCard(null)
    // TODO: Implement draw/tie logic
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(to bottom, #ff00ff 0%, #8000ff 25%, #0080ff 50%, #00ff00 100%)'
    }}>
      {/* Main content area with dotted borders */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto" style={{
          border: '8px dotted white',
          background: 'linear-gradient(to bottom, #ff00ff 0%, #8000ff 25%, #0080ff 50%, #00ff00 100%)',
          padding: '40px'
        }}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4" style={{
              color: '#000',
              textShadow: '3px 3px 0px #fff, -3px -3px 0px #fff, 3px -3px 0px #fff, -3px 3px 0px #fff'
            }}>
              <span className="bg-white px-4 py-2 border-4 border-red-500 inline-block">BAD</span>
              <span className="bg-white px-4 py-2 border-4 border-black inline-block ml-2">HTML</span>
            </h1>
            <p className="text-lg text-black font-bold">
              Today is {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Two voting cards side by side */}
          <div className="flex justify-center gap-8 mb-8 flex-wrap">
            {/* Card 1 */}
            <div 
              className="relative cursor-pointer"
              onClick={() => handleCardClick(1)}
              style={{
                border: '4px dotted white',
                background: 'transparent',
                padding: '20px',
                minWidth: '300px',
                maxWidth: '400px'
              }}
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-black mb-4">MEME 1</h2>
                <div className="bg-gray-200 h-64 flex items-center justify-center mb-4">
                  <span className="text-gray-600 text-xl font-bold">IMAGE PLACEHOLDER</span>
                </div>
                <p className="text-black font-bold text-lg">CLICK TO VOTE</p>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              className="relative cursor-pointer"
              onClick={() => handleCardClick(2)}
              style={{
                border: '4px dotted white',
                background: 'transparent',
                padding: '20px',
                minWidth: '300px',
                maxWidth: '400px'
              }}
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-black mb-4">MEME 2</h2>
                <div className="bg-gray-200 h-64 flex items-center justify-center mb-4">
                  <span className="text-gray-600 text-xl font-bold">IMAGE PLACEHOLDER</span>
                </div>
                <p className="text-black font-bold text-lg">CLICK TO VOTE</p>
              </div>
            </div>
          </div>

          {/* Skip and Draw buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={handleSkip}
              className="px-8 py-4 text-xl cursor-pointer transition-colors"
              style={{
                fontFamily: 'Comic Sans MS',
                fontWeight: 'bold',
                color: '#000',
                background: 'transparent',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'yellow'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <span className="underline">SKIP</span>
            </button>
            <button
              onClick={handleDraw}
              className="px-8 py-4 text-xl cursor-pointer transition-colors"
              style={{
                fontFamily: 'Comic Sans MS',
                fontWeight: 'bold',
                color: '#000',
                background: 'transparent',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'yellow'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <span className="underline">DRAW/TIE</span>
            </button>
          </div>

          {/* Decorative elements */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-green-400 p-4 border-4 border-black">
              <p className="text-black font-bold">
                <span className="text-2xl">⭐</span> VOTE FOR YOUR FAVORITE MEME! <span className="text-2xl">⭐</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VotingPage

