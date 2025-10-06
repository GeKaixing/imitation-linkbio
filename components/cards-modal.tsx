"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Leaf, Grid2x2 } from "lucide-react";
import { AddLinkModal } from "./Add-link-modal";
import { useState } from "react";
import { AddEmbedModal } from "./Add-embed-modal";
import { AddPostModal } from "./Add-post-modal";

export function CardsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
    const [Linkopen, setLinkopen] = useState(false);
    const [Embedopen, setEmbedopen] = useState(false);
    const [Postopen, setPostopen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-[#141517] border border-[#1f2023] text-white rounded-2xl">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="text-xl font-semibold">Cards</DialogTitle>

                </DialogHeader>

                <div className="border-t border-[#1f2023] mt-2 mb-4" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Website Link */}
                    <Card
                        onClick={() => setLinkopen(true)}
                        className="flex flex-col items-center justify-center bg-[#1a1b1e] border border-[#2a2b2f] hover:bg-[#1f2023] transition-all p-6 cursor-pointer">
                        <Link2 className="w-6 h-6 text-[#2563eb] mb-3" />
                        <span className="text-white font-medium text-center text-sm">
                            Add a website link
                        </span>
                    </Card>
                    <AddLinkModal open={Linkopen} onOpenChange={setLinkopen} onOpenCards={onOpenChange} />
                    {/* Social Post */}
                    <Card
                        onClick={() => setEmbedopen(true)}
                        className="flex flex-col items-center justify-center bg-[#1a1b1e] border border-[#2a2b2f] hover:bg-[#1f2023] transition-all p-6 cursor-pointer">
                        <Leaf className="w-6 h-6 text-[#7ae582] mb-3" />
                        <span className="text-white font-medium text-center text-sm">
                            Add a social post
                        </span>
                    </Card>
                    <AddPostModal open={Embedopen} onOpenChange={setEmbedopen} onOpenCards={onOpenChange} ></AddPostModal>
                    {/* Embed */}
                    <Card
                        onClick={() => setPostopen(true)}
                        className="flex flex-col items-center justify-center bg-[#1a1b1e] border border-[#2a2b2f] hover:bg-[#1f2023] transition-all p-6 cursor-pointer">
                        <Grid2x2 className="w-6 h-6 text-[#facc15] mb-3" />
                        <span className="text-white font-medium text-center text-sm">
                            Add an embed
                        </span>
                    </Card>
                    <AddEmbedModal open={Postopen} onOpenChange={setPostopen} onOpenCards={onOpenChange} ></AddEmbedModal>
                </div>
            </DialogContent>
        </Dialog>
    );
}
