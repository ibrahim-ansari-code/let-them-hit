"use client"

import { useState } from "react"
import { ArenaSetup } from "@/components/arena-setup"
import { ArenaResults } from "@/components/arena-results"

export default function NeuralArenaPage() {
  const [state, setState] = useState<"setup" | "scanning" | "results">("setup")
  const [subjectA, setSubjectA] = useState<string | null>(null)
  const [subjectB, setSubjectB] = useState<string | null>(null)

  const handleInitiateCombat = () => {
    if (!subjectA || !subjectB) return

    setState("scanning")

    // Simulate scanning process
    setTimeout(() => {
      setState("results")
    }, 3000)
  }

  const handleReset = () => {
    setState("setup")
    setSubjectA(null)
    setSubjectB(null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wider mb-2 text-balance">
            <span className="text-primary">NEURAL ARENA</span>
            <span className="text-muted-foreground"> // </span>
            <span className="text-accent">BATTLE SIMULATOR</span>
          </h1>
          <p className="text-sm md:text-base font-mono text-muted-foreground tracking-wider">
            v1.0.0 // AI-POWERED COMBAT ANALYSIS
          </p>
        </header>

        {/* Main Content */}
        {state === "setup" && (
          <ArenaSetup
            subjectA={subjectA}
            subjectB={subjectB}
            onSubjectAChange={setSubjectA}
            onSubjectBChange={setSubjectB}
            onInitiate={handleInitiateCombat}
          />
        )}

        {state === "scanning" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
            <div className="relative w-full max-w-2xl">
              {/* Scanning Animation */}
              <div className="glass-panel p-8 text-center">
                <div className="mb-6">
                  <div className="inline-block animate-pulse">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-primary animate-pulse">SCANNING SUBJECTS</h2>
                <div className="space-y-2 font-mono text-sm text-muted-foreground">
                  <p className="animate-pulse">&gt; Initializing neural networks...</p>
                  <p className="animate-pulse delay-100">&gt; Analyzing combat potential...</p>
                  <p className="animate-pulse delay-200">&gt; Running simulations...</p>
                </div>

                {/* Progress Bar */}
                <div className="mt-8 w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-primary animate-progress" />
                </div>
              </div>

              {/* Image Previews with Scan Effect */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {subjectA && (
                  <div className="relative glass-panel p-4 overflow-hidden">
                    <img
                      src={subjectA || "/placeholder.svg"}
                      alt="Subject A"
                      className="w-full h-40 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-primary/20 animate-scan" />
                  </div>
                )}
                {subjectB && (
                  <div className="relative glass-panel p-4 overflow-hidden">
                    <img
                      src={subjectB || "/placeholder.svg"}
                      alt="Subject B"
                      className="w-full h-40 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-primary/20 animate-scan" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {state === "results" && subjectA && subjectB && (
          <ArenaResults subjectA={subjectA} subjectB={subjectB} onReset={handleReset} />
        )}
      </div>
    </div>
  )
}

