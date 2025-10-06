import AnalyticsCharts from '@/components/AnalyticsCharts'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import AnalyticsTable from '@/components/AnalyticsTable'
import { ComboboxDemo } from '@/components/Combobox'
import PlaygroundHeader from '@/components/PlaygroundHeader'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div className="min-h-screen bg-[#0e1116] text-white flex items-center justify-center p-8 flex-col gap-8">
            <div className="w-full max-w-5xl  flex items-center justify-between flex-col md:flex-row py-4 md:py-8 px-4 md:px-24 z-50">
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
                        className="flex w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-secondary transition-all duration-200 ease-in-out bg-primary text-white shadow-sm hover:bg-primary-dark md:w-20"
                    >
                        <Link href={'/playground'}>
                            Back
                        </Link>
                    </button>
                </div>
            </div>
            <AnalyticsDashboard></AnalyticsDashboard>
            <AnalyticsCharts></AnalyticsCharts>
            <AnalyticsTable></AnalyticsTable>
        </div>

    )
}
