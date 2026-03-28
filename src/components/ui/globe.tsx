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
    let width = 0
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()

    if (!canvasRef.current) return
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 0, // 0 for light appearance
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 2,
      baseColor: [0.95, 0.95, 0.95],
      markerColor: [0.1, 0.8, 0.3], // Emerald green markers
      glowColor: [1, 1, 1], // White glow
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
        state.width = width * 2
        state.height = width * 2
      }
    } as any)

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className={cn("relative w-full aspect-square flex items-center justify-center", className)}>
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
