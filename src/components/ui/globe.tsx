"use client"

import createGlobe from "cobe"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  
  useEffect(() => {
    let phi = 0

    if (!canvasRef.current) return
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000, // Fixed internal resolution, CSS handles responsive scaling!
      height: 1000,
      phi: 0,
      theta: 0.3,
      dark: 0, // MUST BE 0 on a white background
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.4, 0.2], // Solid dark green surface so it stands out strongly on white
      markerColor: [0.1, 0.9, 0.3], // Vibrant emerald green markers
      glowColor: [1, 1, 1], // Pure white glow (subtractive on white bg)
      markers: [
        { location: [37.7595, -122.4367], size: 0.05 }, // SF
        { location: [40.7128, -74.0060], size: 0.05 }, // NY
        { location: [51.5074, -0.1278], size: 0.05 }, // London
        { location: [35.6895, 139.6917], size: 0.05 }, // Tokyo
        { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
        { location: [-23.5505, -46.6333], size: 0.05 }, // São Paulo
      ],
      onRender: (state: any) => {
        // Slow auto-rotation
        if (!pointerInteracting.current) {
          phi += 0.003
        }
        state.phi = phi + pointerInteractionMovement.current
        state.width = 1000
        state.height = 1000
      }
    } as any)

    return () => {
      globe.destroy()
    }
  }, [])

  return (
    <div className={cn("relative w-full max-w-[500px] aspect-square flex items-center justify-center mx-auto", className)}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
        }}
        onPointerUp={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
        }}
        onPointerOut={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta * 0.01 // Sensitivity modifier
            pointerInteracting.current = e.clientX
          }
        }}
        className="w-full h-full cursor-grab"
        style={{ width: "100%", height: "100%", contain: 'layout paint size' }}
      />
    </div>
  )
}
