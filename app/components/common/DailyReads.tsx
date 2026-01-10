'use client';

import React from 'react';
import { BookMarked } from 'lucide-react';

const DailyReads = () => {
    return (
        <div className="w-full h-full bg-background flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <BookMarked className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Daily Reads</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
                A curated collection of articles and resources I find interesting.
                <br />
                <span className="text-xs text-muted-foreground/60 mt-2 block">(Coming Soon)</span>
            </p>
        </div>
    );
};

export default DailyReads;
