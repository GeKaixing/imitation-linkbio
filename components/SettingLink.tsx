"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLinkDataDispatch } from "@/store/LinkStore";
import { useState, useEffect, useMemo } from "react";

export function SettingLink({
    open,
    onOpenChange,
    item,
}: {
    item: any;
    open: boolean;
    onOpenChange: (v: boolean) => void;
}) {
    const { updateLink } = useLinkDataDispatch();

    // 初始数据（用于比较）
    const initialData = useMemo(
        () => ({
            link: item.link ?? "",
            title: item.title ?? "",
            button_text: item.button?.text ?? "",
            button_link: item.button?.link ?? "",
        }),
        [item]
    );

    const [data, setData] = useState(initialData);

    // 当 item 改变时，重置表单
    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const hasChanged = useMemo(() => {
        return (
            data.link !== initialData.link ||
            data.title !== initialData.title ||
            data.button_text !== initialData.button_text ||
            data.button_link !== initialData.button_link
        );
    }, [data, initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (hasChanged) {
            updateLink({
                id: item.id,
                link: data.link,
                title: data.title,
                button: {
                    text: data.button_text,
                    link: data.button_link,
                }
            });
        }

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                aria-describedby={undefined}
                className="sm:max-w-lg bg-[#141517] border border-[#1f2023] text-white rounded-2xl"
                onPointerDown={(e) => e.stopPropagation()}
            >
                <DialogHeader className="flex flex-col items-start justify-between">
                    <DialogTitle className="text-lg font-semibold">Setting Link</DialogTitle>
                    <DialogDescription className="text-gray-400 text-sm">
                        Edit your link details and click Save when done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6 text-sm">
                    <div>
                        <label className="block mb-1 text-gray-400">Link</label>
                        <Input
                            name="link"
                            value={data.link}
                            onChange={handleChange}
                            placeholder="Enter link URL"
                            className="bg-[#1b1c1f] border-[#2a2b2f] text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-400">Title</label>
                        <Input
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                            className="bg-[#1b1c1f] border-[#2a2b2f] text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-400">Button Text</label>
                        <Input
                            name="button_text"
                            value={data.button_text}
                            onChange={handleChange}
                            placeholder="Enter button text"
                            className="bg-[#1b1c1f] border-[#2a2b2f] text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-400">Button Link</label>
                        <Input
                            name="button_link"
                            value={data.button_link}
                            onChange={handleChange}
                            placeholder="Enter button link"
                            className="bg-[#1b1c1f] border-[#2a2b2f] text-white"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            variant="ghost"
                            className="text-gray-400 hover:text-gray-200 hover:bg-transparent"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={!hasChanged}
                            className={`text-white ${hasChanged
                                ? "bg-[#2563eb] hover:bg-[#1d4ed8]"
                                : "bg-gray-600 cursor-not-allowed"
                                }`}
                        >
                            Save Link
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
