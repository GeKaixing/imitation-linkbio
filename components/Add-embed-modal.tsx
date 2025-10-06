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
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLinkDataDispatch } from "@/store/LinkStore";

export function AddEmbedModal({
    open,
    onOpenChange,
    onOpenCards
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    onOpenCards: (v: boolean) => void;
}) {
    const [mode, setMode] = useState<"html" | "url">("html");
    const { addLink } = useLinkDataDispatch()
    const [linkInput, setInput] = useState('')

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-[#141517] border border-[#1f2023] text-white rounded-2xl">
                {/* Header */}
                <DialogHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ArrowLeft onClick={() => onOpenChange(false)}
                            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-200 transition" />
                        <DialogTitle className="text-lg font-semibold">Embed</DialogTitle>
                    </div>

                </DialogHeader>

                <div className="border-t border-[#1f2023] mt-2 mb-4" />

                {/* 预览区域 */}
                <div className="flex justify-center mb-6">
                    <div className="w-[260px] h-[150px] bg-gradient-to-b from-[#1a1b1e] to-[#111113] rounded-xl border border-[#2a2b2f] flex items-center justify-center">
                        <div className="w-[120px] h-[80px] border border-[#2a2b2f] rounded-md flex flex-col items-center justify-center text-gray-500">
                            <div className="w-8 h-6 border border-[#2a2b2f] rounded-sm mb-1"></div>
                            <div className="h-1.5 w-10 bg-[#2a2b2f] rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* 标题说明 */}
                <div className="text-center mb-4">
                    <h2 className="text-lg font-bold">Add Embed</h2>
                    <p className="text-sm text-gray-400 mt-1">
                        Share from YouTube, Spotify, Facebook, Calendly, Google Maps and more.
                    </p>
                </div>

                {/* 切换标签按钮 */}
                <div className="flex items-center justify-center mb-4 bg-[#1a1b1e] rounded-lg border border-[#2a2b2f] overflow-hidden">
                    <button
                        onClick={() => setMode("html")}
                        className={`w-1/2 py-2 text-sm font-medium transition ${mode === "html"
                            ? "bg-[#1f2023] text-white"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        HTML Code
                    </button>
                    <button
                        onClick={() => setMode("url")}
                        className={`w-1/2 py-2 text-sm font-medium transition ${mode === "url"
                            ? "bg-[#1f2023] text-white"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Paste URL
                    </button>
                </div>

                {/* 输入区域 */}
                <div className="space-y-4">
                    <Input
                        value={linkInput}
                        onChange={e => {
                            setInput(e.target.value)
                        }}
                        placeholder="Title for tracking analytics"
                        className="bg-[#1a1b1e] border-[#2a2b2f] text-white placeholder:text-gray-500"
                    />
                    <Textarea
                        placeholder={
                            mode === "html"
                                ? "Paste Embed Code"
                                : "Paste URL (e.g., https://youtu.be/...)"
                        }
                        className="bg-[#1a1b1e] border-[#2a2b2f] text-white placeholder:text-gray-500 min-h-[120px]"
                    />
                </div>

                {/* 按钮区域 */}
                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        onClick={() => { onOpenChange(false); onOpenCards(false) }}
                        variant="ghost"
                        className="text-gray-400 hover:text-gray-200 hover:bg-transparent"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            if (linkInput === '') return;
                            addLink({
                                authorId: localStorage.getItem('user_id'),
                                id: new Date().toString(),
                                link: linkInput,
                                type: 'embed',
                            })
                            onOpenChange(false);
                            onOpenCards(false)
                        }}
                        className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
                        Add Embed
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
