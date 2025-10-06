"use client"
import React from 'react'
import { ComboboxDemo } from './Combobox'
import { usePreview } from '@/store/PreviewStore'
import Link from 'next/link'

export default function PlaygroundHeader() {
    const { isPreview, setIsPreview } = usePreview()
    return (
        <div className="flex items-center justify-between flex-col md:flex-row py-4 md:py-8 px-4 md:px-24 z-50">
            <div className="relative inline-block text-left">
                <button className="inline-flex w-full justify-center gap-x-2 text-sm font-semibold">
                    <p className="text-light font-bold cursor-pointer">
                        linkie.bio/<span className="text-white"></span>
                    </p>
                    <ComboboxDemo></ComboboxDemo>
                </button>
            </div>

            <div className="flex md:grid gap-4 justify-center items-center mt-4 md:mt-0 grid-cols-2">
                <button
                    type="button"
                    onClick={() => setIsPreview(!isPreview)}
                    className="flex w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-secondary transition-all duration-200 ease-in-out border border-secondary bg-transparent hover:bg-secondary text-light"
                >
                    {isPreview ?  'Edit':'Preview' }
                </button>
                <button
                    type="button"
                    className="flex w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-secondary transition-all duration-200 ease-in-out bg-primary text-white shadow-sm hover:bg-primary-dark md:w-20"
                >
                    <Link href={'/statistics'}>
                        Dashboard
                    </Link>
                </button>
            </div>
        </div>
    )
}
