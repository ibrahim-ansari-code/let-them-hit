"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RotateCcw } from "lucide-react"

interface ArenaResultsProps {
  subjectA: string
  subjectB: string
  onReset: () => void
}

// Mock battle data
const mockBattle = {
  winner: "A",
  entityA: {
    name: "DOMESTIC CAT",
    hp: 85,
    attack: 72,
    agility: 94,
    moves: ["Quick Slash", "Intimidate", "Pounce Strike"],
  },
  entityB: {
    name: "GOLDEN RETRIEVER",
    hp: 65,
    attack: 58,
    agility: 71,
    moves: ["Tackle", "Bark Wave", "Tail Whip"],
  },
  log: [
    "> COMBAT SEQUENCE INITIALIZED...",
    "> Subject A: DOMESTIC CAT identified",
    "> Subject B: GOLDEN RETRIEVER identified",
    "> ",
    "> [ROUND 1]",
    "> Subject A executed [Quick Slash] - CRITICAL HIT",
    "> Subject B HP: 100 → 78",
    "> Subject B executed [Bark Wave] - MISS",
    "> ",
    "> [ROUND 2]",
    "> Subject A executed [Intimidate] - SUCCESS",
    "> Subject B ATTACK -15%",
    "> Subject B executed [Tackle] - HIT",
    "> Subject A HP: 100 → 89",
    "> ",
    "> [ROUND 3]",
    "> Subject A executed [Pounce Strike] - CRITICAL HIT",
    "> Subject B HP: 78 → 42",
    "> Subject B executed [Tail Whip] - INEFFECTIVE",
    "> ",
    "> [FINAL ROUND]",
    "> Subject A executed [Quick Slash] - FINISHING BLOW",
    "> Subject B HP: 42 → 0",
    "> ",
    "> === COMBAT COMPLETE ===",
    "> VICTOR: SUBJECT A - DOMESTIC CAT",
    "> SIMULATION DURATION: 2.4s",
  ],
}

export function ArenaResults({ subjectA, subjectB, onReset }: ArenaResultsProps) {
  const isAWinner = mockBattle.winner === "A"

  return (
    <div className="space-y-8">
      {/* Subject Images with Winner Highlight */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Subject A */}
        <div className={`subject-frame ${isAWinner ? "winner" : "loser"}`}>
          <img src={subjectA || "/placeholder.svg"} alt="Subject A" className="w-full h-64 object-cover rounded-lg" />
          {isAWinner && (
            <div className="absolute top-4 left-4 px-4 py-2 bg-primary/90 backdrop-blur-sm rounded font-mono text-sm font-bold">
              ⚡ VICTOR IDENTIFIED
            </div>
          )}
          <div className="absolute bottom-4 left-4 px-4 py-2 glass-panel font-mono text-xs">SUBJECT A</div>
        </div>

        {/* Subject B */}
        <div className={`subject-frame ${!isAWinner ? "winner" : "loser"}`}>
          <img src={subjectB || "/placeholder.svg"} alt="Subject B" className="w-full h-64 object-cover rounded-lg" />
          {!isAWinner && (
            <div className="absolute top-4 left-4 px-4 py-2 bg-primary/90 backdrop-blur-sm rounded font-mono text-sm font-bold">
              ⚡ VICTOR IDENTIFIED
            </div>
          )}
          <div className="absolute bottom-4 left-4 px-4 py-2 glass-panel font-mono text-xs">SUBJECT B</div>
        </div>
      </div>

      {/* Combat Log */}
      <Card className="glass-panel">
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4 text-primary font-mono">&gt; COMBAT LOG // NARRATIVE SEQUENCE</h3>
          <div className="bg-black/40 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs md:text-sm space-y-1 terminal-scroll">
            {mockBattle.log.map((line, i) => (
              <div
                key={i}
                className={`${
                  line.includes("CRITICAL") || line.includes("VICTOR")
                    ? "text-primary font-bold"
                    : line.includes("MISS") || line.includes("INEFFECTIVE")
                      ? "text-destructive"
                      : "text-muted-foreground"
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Data Decks */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Subject A Data Deck */}
        <Card className="glass-panel">
          <div className="p-6 space-y-4">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">ENTITY IDENTIFIED</p>
              <h3 className="text-xl font-bold text-primary">{mockBattle.entityA.name}</h3>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-mono">HP</span>
                  <span className="font-mono text-primary">{mockBattle.entityA.hp}%</span>
                </div>
                <Progress value={mockBattle.entityA.hp} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-mono">ATTACK</span>
                  <span className="font-mono text-primary">{mockBattle.entityA.attack}%</span>
                </div>
                <Progress value={mockBattle.entityA.attack} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-mono">AGILITY</span>
                  <span className="font-mono text-primary">{mockBattle.entityA.agility}%</span>
                </div>
                <Progress value={mockBattle.entityA.agility} className="h-2" />
              </div>
            </div>

            <div>
              <p className="text-xs font-mono text-muted-foreground mb-2">MOVESET DATABASE</p>
              <div className="flex flex-wrap gap-2">
                {mockBattle.entityA.moves.map((move) => (
                  <span
                    key={move}
                    className="px-3 py-1 bg-primary/20 rounded font-mono text-xs border border-primary/40"
                  >
                    {move}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Subject B Data Deck */}
        <Card className="glass-panel">
          <div className="p-6 space-y-4">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">ENTITY IDENTIFIED</p>
              <h3 className="text-xl font-bold text-destructive">{mockBattle.entityB.name}</h3>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-mono">HP</span>
                  <span className="font-mono text-muted-foreground">{mockBattle.entityB.hp}%</span>
                </div>
                <Progress value={mockBattle.entityB.hp} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-mono">ATTACK</span>
                  <span className="font-mono text-muted-foreground">{mockBattle.entityB.attack}%</span>
                </div>
                <Progress value={mockBattle.entityB.attack} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-mono">AGILITY</span>
                  <span className="font-mono text-muted-foreground">{mockBattle.entityB.agility}%</span>
                </div>
                <Progress value={mockBattle.entityB.agility} className="h-2" />
              </div>
            </div>

            <div>
              <p className="text-xs font-mono text-muted-foreground mb-2">MOVESET DATABASE</p>
              <div className="flex flex-wrap gap-2">
                {mockBattle.entityB.moves.map((move) => (
                  <span key={move} className="px-3 py-1 bg-secondary rounded font-mono text-xs border border-border">
                    {move}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center pt-4">
        <Button onClick={onReset} size="lg" variant="outline" className="gap-2 bg-transparent">
          <RotateCcw className="w-4 h-4" />
          <span className="font-mono">NEW SIMULATION</span>
        </Button>
      </div>
    </div>
  )
}

