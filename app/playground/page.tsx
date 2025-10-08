"use client";

import PlaygroundClickToAddLink from "@/components/PlaygroundClickToAddLink";
import { PlaygroundSortable } from "@/components/PlaygroundSortable";
import { LinkDataProvider } from "@/store/LinkStore";
import PreviewProvider from "@/store/PreviewStore";
import PlaygroundHeader from "@/components/PlaygroundHeader";
import PlaygroundUserContent from "@/components/PlaygroundUserContent";
import PlaygroundBrowser from "@/components/PlaygroundBrowser";
import UserProvider from "@/store/UserStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("user_id");
    useEffect(()=>{
        if(userId)localStorage.setItem('user_id',userId)
    })
    return (
        <UserProvider >
            <PreviewProvider>
                < LinkDataProvider>
                    <div className="min-h-screen bg-main flex flex-col relative">
                        {/* Header */}
                        <PlaygroundHeader></PlaygroundHeader>
                        {/* Main Content */}
                        <div className="flex justify-center grow pb-10 z-10 items-center px-4">
                            <div className="w-full max-w-[584px]">
                                <div className="rounded-xl border-4 md:border-8 border-[#3c3e44] overflow-hidden min-h-[calc(100vh-160px)]">
                                    {/* Browser Bar */}
                                    <PlaygroundBrowser></PlaygroundBrowser>
                                    {/* Content Area */}
                                    <form className="space-y-6">
                                        <div className="px-[15px] md:px-[70px] py-[30px] md:py-[45px] flex flex-col items-center justify-center w-full">
                                            {/* Profile Section */}
                                            <PlaygroundUserContent></PlaygroundUserContent>
                                            {/* Content Addition Area */}
                                            <PlaygroundClickToAddLink></PlaygroundClickToAddLink>
                                            {/* Grid Layout */}
                                            <PlaygroundSortable ></PlaygroundSortable>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </LinkDataProvider >
            </PreviewProvider>
        </UserProvider>
    );
}
