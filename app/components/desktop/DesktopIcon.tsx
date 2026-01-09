'use client';

import React from 'react';

interface DesktopIconProps {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    isSelected?: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon, onClick, isSelected }) => {
    return (
        <button
            onClick={onClick}
            className={`group flex flex-col items-center gap-2 p-2 rounded-lg w-24 hover:bg-gray-100/50 transition-colors focus:outline-none ${isSelected ? 'bg-gray-100 ring-1 ring-gray-200' : ''
                }`}
        >
            <div className="w-12 h-12 rounded-xl border border-gray-200 bg-white flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 active:scale-95 duration-200">
                <div className="text-gray-900">
                    {icon}
                </div>
            </div>
            <span
                className="text-xs text-gray-700 font-medium text-center leading-tight px-1 py-0.5 rounded-sm group-hover:text-gray-900"
            >
                {label}
            </span>
        </button>
    );
};

export default DesktopIcon;
