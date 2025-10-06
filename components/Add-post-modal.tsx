"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useLinkDataDispatch } from "@/store/LinkStore";
import { useState } from "react";

export function AddPostModal({
    open,
    onOpenChange,
    onOpenCards,
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    onOpenCards: (v: boolean) => void;
}) {
    const [linkInput, setInput] = useState('')
    const [customURL, setCustomURL] = useState('')
    const {addLink} = useLinkDataDispatch()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-[#141517] border border-[#1f2023] text-white rounded-2xl">
                {/* Header */}
                <DialogHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ArrowLeft onClick={() => onOpenChange(false)}
                            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-200 transition" />
                        <DialogTitle className="text-lg font-semibold">Post</DialogTitle>
                    </div>

                </DialogHeader>

                <div className="border-t border-[#1f2023] mt-2 mb-4" />

                {/* 社交图标区 */}
                <div className="grid grid-cols-6 gap-4 justify-items-center mb-6">
                    {[
                        "linkedin",
                        "x",
                        "facebook",
                        "instagram",
                        "tiktok",
                        "mastodon",
                        "bluesky",
                        "pinterest",
                        "threads",
                        "telegram",
                        "youtube",
                    ].map((icon, i) => (
                        <div
                            key={i}
                            className="w-10 h-10 bg-[#1a1b1e] rounded-xl border border-[#2a2b2f] flex items-center justify-center hover:bg-[#1f2023] transition cursor-pointer"
                        >
                            <Image
                                src={`/icons/${icon}.svg`}
                                alt={icon}
                                width={20}
                                height={20}
                                className="opacity-80"
                            />
                        </div>
                    ))}
                </div>

                {/* 输入区域 */}
                <div className="text-center mb-4">
                    <h2 className="text-lg font-bold">Paste Post URL</h2>
                    <p className="text-sm text-gray-400 mt-1">
                        Paste a link from Twitter, Instagram, LinkedIn, or any social
                        platform, and we’ll display it beautifully for you!
                    </p>
                </div>

                {/* 输入框 + 快捷键提示 */}
                <div className="flex items-center gap-2 mb-4">
                    <Input
                        value={linkInput}
                        onChange={(e) => {
                            setInput(e.target.value)
                        }}
                        placeholder="Paste URL"
                        className="flex-1 bg-[#1a1b1e] border-[#2a2b2f] text-white placeholder:text-gray-500"
                    />
                    <div className="flex gap-1">
                        <Button
                            size="sm"
                            variant="secondary"
                            className="bg-[#1f2023] border border-[#2a2b2f] text-gray-300 hover:bg-[#2a2b2f]"
                        >
                            ⌘
                        </Button>
                        <Button
                            size="sm"
                            variant="secondary"
                            className="bg-[#1f2023] border border-[#2a2b2f] text-gray-300 hover:bg-[#2a2b2f]"
                        >
                            V
                        </Button>
                    </div>
                </div>

                {/* 开关设置 */}
                <div className="flex items-center justify-between bg-[#1a1b1e] border border-[#2a2b2f] rounded-lg p-3 mb-2">
                    <span className="text-sm text-gray-300">
                        On click, redirect to a custom URL
                    </span>
                    <Switch className="data-[state=checked]:bg-blue-600" />
                </div>

                {/* 按钮区 */}
                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        onClick={() => { onOpenChange(false); onOpenCards(false) }}
                        variant="ghost"
                        className="text-gray-400 hover:text-gray-200 hover:bg-transparent"
                    >
                        Cancel
                    </Button>
                    <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                        onClick={async() => {
                            if (linkInput === '') return;
                            const data= await  fetch("/api/tweet?url=https://x.com/elonmusk/status/17789754321")
                            const result=await data.json()
                            console.log(result)
                            addLink({
                           authorId: localStorage.getItem('user_id'),
                      
                                    id: new Date().toString(),
                                    link: linkInput,
                                    type: 'post',
                                    customURL: ""
                                
                            })
                            onOpenChange(false);
                            onOpenCards(false)
                        }}
                    >
                        Add Post
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
