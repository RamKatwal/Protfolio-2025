"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/app/components/ui/tooltip"
import { Kbd } from "@/components/ui/kbd"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if input/textarea is focused
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                e.target instanceof HTMLSelectElement
            ) {
                return
            }

            if (e.key.toLowerCase() === 'd') {
                setTheme(prev => prev === 'dark' ? 'light' : 'dark')
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [setTheme])

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    // Prevent hydration mismatch by rendering a placeholder or sticking to one state until mounted
    // However, for the icon toggle animation to work correctly without flickering, 
    // we can just render the button. The icons use CSS transitions generally.
    if (!mounted) {
        return (
            <Button variant="ghost" size="sm" className="gap-1.5 h-9 px-2" disabled>
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                <Kbd className="h-4 min-w-4 text-[10px]">D</Kbd>
                <span className="sr-only">Toggle theme</span>
            </Button>
        )
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 h-9 px-2" onClick={toggleTheme}>
                    <span className="relative h-[1.2rem] w-[1.2rem]">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute inset-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </span>
                    <Kbd className="h-4 min-w-4 text-[10px]">D</Kbd>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <p className="flex items-center gap-2">
                    Switch Theme
                    <Kbd>D</Kbd>
                </p>
            </TooltipContent>
        </Tooltip>
    )
}
