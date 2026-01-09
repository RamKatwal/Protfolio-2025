'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
    title: string;
    icon?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onMinimize?: () => void;
    children: React.ReactNode;
    initialPosition?: { x: number; y: number };
    initialSize?: { width: number; height: number };
    isActive?: boolean;
    onFocus?: () => void;
    defaultMaximized?: boolean;
}

const Window: React.FC<WindowProps> = ({
    title,
    icon,
    isOpen,
    onClose,
    onMinimize,
    children,
    initialPosition = { x: 50, y: 50 },
    initialSize = { width: 600, height: 500 },
    isActive = false,
    onFocus,
    defaultMaximized = false
}) => {
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [isMaximized, setIsMaximized] = useState(defaultMaximized);
    const [preMaximizeState, setPreMaximizeState] = useState({ position, size });

    const windowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isDragging) {
            const handleMouseMove = (e: MouseEvent) => {
                const dx = e.clientX - dragStart.x;
                const dy = e.clientY - dragStart.y;

                setPosition({
                    x: startPos.x + dx,
                    y: startPos.y + dy
                });
            };

            const handleMouseUp = () => {
                setIsDragging(false);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, dragStart, startPos]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (onFocus) onFocus();
        if (isMaximized) return;

        // Only allow dragging from header
        const target = e.target as HTMLElement;
        if (target.closest('.window-controls')) return;

        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setStartPos({ x: position.x, y: position.y });
    };

    const toggleMaximize = () => {
        if (isMaximized) {
            setPosition(preMaximizeState.position);
            setSize(preMaximizeState.size);
        } else {
            setPreMaximizeState({ position, size });
            setPosition({ x: 0, y: 0 });
            // We'll let CSS handle the 100% size
        }
        setIsMaximized(!isMaximized);
    };

    if (!isOpen) return null;

    return (
        <div
            ref={windowRef}
            className={`absolute flex flex-col bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transition-all duration-200 ${isActive ? 'z-50 shadow-2xl ring-1 ring-black/5' : 'z-10 shadow-md opacity-95'
                } ${isMaximized ? '!inset-0 !w-full !h-full rounded-none border-0' : ''}`}
            style={!isMaximized ? {
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                position: 'absolute' // Explicitly set position
            } : {}}
            onMouseDown={() => onFocus && onFocus()}
        >
            {/* Title Bar */}
            <div
                className={`h-10 bg-white border-b border-gray-100 flex items-center justify-between px-4 select-none cursor-default ${isActive ? 'bg-gray-50/50' : ''
                    }`}
                onMouseDown={handleMouseDown}
                onDoubleClick={toggleMaximize}
            >
                <div className="flex items-center gap-3">
                    <div className="opacity-80">
                        {icon}
                    </div>
                    <span className="text-xs font-semibold text-gray-800 tracking-tight">{title}</span>
                </div>

                <div className="flex items-center gap-2 window-controls pl-4 border-l border-gray-100 h-5">
                    <button
                        onClick={(e) => { e.stopPropagation(); onMinimize?.(); }}
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        <Minus size={14} strokeWidth={2} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        <Square size={12} strokeWidth={2} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X size={14} strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-white/80 relative">
                {children}
            </div>
        </div>
    );
};

export default Window;
