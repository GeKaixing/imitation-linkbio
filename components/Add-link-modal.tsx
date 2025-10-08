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
import { ArrowLeft } from "lucide-react";
import { useLinkData, useLinkDataDispatch } from "@/store/LinkStore";
import { useState } from "react";

export function AddLinkModal({
    open,
    onOpenChange,
    onOpenCards
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    onOpenCards: (v: boolean) => void;
}) {
    const [linkInput, setInput] = useState('')
    const { addLink } = useLinkDataDispatch()
    const data = useLinkData()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-[#141517] border border-[#1f2023] text-white rounded-2xl">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ArrowLeft
                            onClick={() => onOpenChange(false)}
                            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-200 transition" />
                        <DialogTitle className="text-lg font-semibold">Link</DialogTitle>
                    </div>

                </DialogHeader>

                <div className="border-t border-[#1f2023] mt-2 mb-4" />

                {/* 示例预览区 */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#1a1b1e] rounded-xl border border-[#2a2b2f] p-4 flex flex-col items-start justify-between hover:bg-[#1f2023] transition cursor-pointer">
                        <div className="text-sm font-medium">Publer Ambassador</div>
                        <div className="text-xs text-gray-400 mb-2">publer.io</div>
                        <Button
                            size="sm"
                            className="text-xs bg-[#2563eb] hover:bg-[#1d4ed8] h-6 px-3 rounded-md"
                        >
                            Get Started
                        </Button>
                    </div>

                    <div className="bg-[#1a1b1e] rounded-xl border border-[#2a2b2f] p-4 flex flex-col items-start justify-between hover:bg-[#1f2023] transition cursor-pointer">
                        <div className="text-sm font-medium">Sabri Hakuli</div>
                        <div className="text-xs text-gray-400 mb-2">dribbble.com</div>
                        <Button
                            size="sm"
                            className="text-xs bg-[#db2777] hover:bg-[#be185d] h-6 px-3 rounded-md"
                        >
                            Follow me
                        </Button>
                    </div>
                </div>

                {/* 输入区域 */}
                <div className="text-center mb-4">
                    <h2 className="text-lg font-bold">Paste Website URL</h2>
                    <p className="text-sm text-gray-400 mt-1">
                        Paste any website link
                    </p>
                </div>

                <div className="flex items-center gap-2">
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

                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        onClick={() => { onOpenChange(false); onOpenCards(false) }}
                        variant="ghost"
                        className="text-gray-400 hover:text-gray-200 hover:bg-transparent"
                    >
                        Cancel
                    </Button>
                    <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                        onClick={
                            () => {
                                if (linkInput === '') return;
                                addLink(
                                    {
                                        id: new Date().toString(),
                                        link: linkInput,
                                        type: 'link',
                                        size: 'normal',
                                        domain: 'test',
                                        authorId: localStorage.getItem('user_id'),
                                        button:{
                                            text:'',
                                            link:""
                                        }
                                    }

                                )
                                onOpenChange(false);
                                onOpenCards(false)
                            }

                        }
                    >
                        Add Link
                    </Button>
                </div>
            </DialogContent>
        </Dialog >
    );
}
