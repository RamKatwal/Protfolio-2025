'use client';

import React from 'react';
import { BookMarked } from 'lucide-react';

const DailyReads = () => {
    return (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <BookMarked className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Daily Reads</h3>
            <p className="text-sm text-gray-500 max-w-xs">
                A curated collection of articles and resources I find interesting.
                <br />
                <span className="text-xs text-gray-400 mt-2 block">(Coming Soon)</span>
            </p>
        </div>
    );
};

export default DailyReads;
