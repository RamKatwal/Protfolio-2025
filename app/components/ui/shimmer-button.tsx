import * as React from "react"
import { cn } from "@/lib/utils"

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      children,
      className,
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "0.5rem",
      background = "rgba(0, 0, 0, 1)",
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--shimmer-color": shimmerColor,
            "--shimmer-size": shimmerSize,
            "--shimmer-duration": shimmerDuration,
            "--radius": borderRadius,
            "--background": background,
          } as React.CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-black/10 px-6 py-2.5 text-xs font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 [background:var(--background)] [border-radius:var(--radius)]",
          "transform-gpu transition-transform duration-300 ease-in-out",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Shimmer effect - Continuous animation */}
        <div
          className={cn(
            "absolute inset-0 -z-30 overflow-hidden rounded-md opacity-100"
          )}
          style={{
            background: `linear-gradient(110deg, transparent 30%, ${shimmerColor} 50%, transparent 70%)`,
            backgroundSize: "200% 100%",
            backgroundPosition: "-200% 0",
            animation: "shimmerSlide 3s linear infinite",
          }}
        />

        {/* Border animation */}
        <div className="absolute inset-0 rounded-md pointer-events-none">
          {/* Top border - left to right */}
          <div className="absolute top-0 left-0 h-[2px] w-full overflow-hidden">
            <div className="h-full w-1/4 bg-gradient-to-r from-transparent via-black to-transparent animate-borderTop" />
          </div>
          
          {/* Right border - top to bottom */}
          <div className="absolute top-0 right-0 w-[2px] h-full overflow-hidden">
            <div className="w-full h-1/4 bg-gradient-to-b from-transparent via-black to-transparent animate-borderRight" />
          </div>
          
          {/* Bottom border - right to left */}
          <div className="absolute bottom-0 right-0 h-[2px] w-full overflow-hidden">
            <div className="h-full w-1/4 bg-gradient-to-l from-transparent via-black to-transparent ml-auto animate-borderBottom" />
          </div>
          
          {/* Left border - bottom to top */}
          <div className="absolute bottom-0 left-0 w-[2px] h-full overflow-hidden">
            <div className="w-full h-1/4 bg-gradient-to-t from-transparent via-black to-transparent mt-auto animate-borderLeft" />
          </div>
        </div>

        {/* Content */}
        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)

ShimmerButton.displayName = "ShimmerButton"

export { ShimmerButton }

