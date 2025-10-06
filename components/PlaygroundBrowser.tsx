import React from 'react'

export default function PlaygroundBrowser() {
    return (
        <div className="flex gap-2 bg-browser-taskbar px-3 py-2 rounded-tl-[4px] rounded-tr-[4px] border-b border-b-1 border-surface">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27CA3F]"></div>
        </div>
    )
}
