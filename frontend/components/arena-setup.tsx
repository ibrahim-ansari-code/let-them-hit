"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface ArenaSetupProps {
  subjectA: string | null
  subjectB: string | null
  onSubjectAChange: (url: string) => void
  onSubjectBChange: (url: string) => void
  onInitiate: () => void
}

export function ArenaSetup({ subjectA, subjectB, onSubjectAChange, onSubjectBChange, onInitiate }: ArenaSetupProps) {
  const fileInputA = useRef<HTMLInputElement>(null)
  const fileInputB = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setter(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, setter: (url: string) => void) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setter(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const canInitiate = subjectA && subjectB

  return (
    <div className="space-y-12">
      {/* Upload Grid */}
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
        {/* Subject A Upload */}
        <div
          className="upload-zone group"
          onDrop={(e) => handleDrop(e, onSubjectAChange)}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputA.current?.click()}
        >
          {subjectA ? (
            <div className="relative w-full h-full">
              <img
                src={subjectA || "/placeholder.svg"}
                alt="Subject A"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                <p className="text-white font-mono text-sm">CLICK TO CHANGE</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Upload className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
              <p className="font-mono text-sm text-center text-muted-foreground group-hover:text-primary transition-colors">
                DROP SUBJECT [A]
                <br />
                OR CLICK TO UPLOAD
              </p>
            </div>
          )}
          <input
            ref={fileInputA}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, onSubjectAChange)}
          />
        </div>

        {/* Center Button */}
        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            onClick={onInitiate}
            disabled={!canInitiate}
            className="combat-button h-auto py-6 px-8 text-base md:text-lg font-bold tracking-wider"
          >
            <span className="relative z-10">
              INITIALIZE
              <br />
              COMBAT
              <br />
              SEQUENCE
            </span>
          </Button>

          <p className="text-xs font-mono text-muted-foreground text-center">
            Powered by CNN Vision
            <br />& NLP Logic Cores
          </p>
        </div>

        {/* Subject B Upload */}
        <div
          className="upload-zone group"
          onDrop={(e) => handleDrop(e, onSubjectBChange)}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputB.current?.click()}
        >
          {subjectB ? (
            <div className="relative w-full h-full">
              <img
                src={subjectB || "/placeholder.svg"}
                alt="Subject B"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                <p className="text-white font-mono text-sm">CLICK TO CHANGE</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Upload className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
              <p className="font-mono text-sm text-center text-muted-foreground group-hover:text-primary transition-colors">
                DROP SUBJECT [B]
                <br />
                OR CLICK TO UPLOAD
              </p>
            </div>
          )}
          <input
            ref={fileInputB}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, onSubjectBChange)}
          />
        </div>
      </div>
    </div>
  )
}

