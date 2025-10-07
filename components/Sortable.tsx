"use client";
import React, { useEffect, useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowUpRight, Share, Trash2 } from "lucide-react";
import { useLinkData, useLinkDataDispatch } from '@/store/LinkStore'
import SpinnerSurface from "./SpinnerSurface";
import IsPreview from "./IsPreview";
// 🧩 主组件

export function Sortable() {
    const [activeId, setActiveId] = useState(null);
    const { linkData } = useLinkData();
    const [items, setItems] = useState([]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // 初次加载时根据 order 排序
    useEffect(() => {
        if (linkData && Array.isArray(linkData)) {
            const sorted = [...linkData].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            setItems(sorted);
        }
    }, [linkData]);

    // 拖拽开始
    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    // 拖拽结束 + 乐观更新
    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) {
            setActiveId(null);
            return;
        }

        const activeIndex = items.findIndex((i) => i.id === active.id);
        const overIndex = items.findIndex((i) => i.id === over.id);

        // 克隆当前数据（用于失败时回滚）
        const prevItems = [...items];

        // 克隆数组避免直接修改 state
        const newItems = [...items];

        // 交换 order 值
        const tempOrder = newItems[activeIndex].order;
        newItems[activeIndex].order = newItems[overIndex].order;
        newItems[overIndex].order = tempOrder;

        // 重新排序以立即反映到界面（乐观更新）
        const reordered = arrayMove(newItems, activeIndex, overIndex);
        setItems(reordered);

        // 乐观同步后端
        try {
            const res = await fetch("/api/link-data", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([
                    { id: newItems[activeIndex].id, order: newItems[activeIndex].order },
                    { id: newItems[overIndex].id, order: newItems[overIndex].order },
                ]),
            });

            if (!res.ok) throw new Error("同步失败");

            // ✅ 成功则无需额外操作
        } catch (err) {
            console.error("❌ 同步失败，回滚：", err);
            setItems(prevItems); // 回滚 UI
        }

        setActiveId(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
                <div className="flex flex-wrap gap-4 w-[416px]">
                    {items.map((item) => (
                        <SortableItem key={item.id} item={item} />
                    ))}
                </div>
            </SortableContext>

            {/* 拖拽悬浮阴影 */}
            <DragOverlay adjustScale={false}>
                {activeId ? (
                    <OverlayItem item={items.find((i) => i.id === activeId)} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}


// 🧱 单个可拖拽元素
function SortableItem({ item }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString({
            x: transform?.x ?? 0,
            y: transform?.y ?? 0,
            scaleX: 1,
            scaleY: 1,
        }),
        transition,
        zIndex: isDragging ? 10 : 1,

    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={` cursor-grab rounded-lg shadow-md   ${isDragging ? "opacity-70" : "opacity-100"
                }`}
        >
            <ItemContent item={item} />
        </div>
    );
}

function SizeSvg({ item }) {
    const { updateLink } = useLinkDataDispatch()

    return <IsPreview> <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-7 bg-gray-700 rounded-[5px] flex w-auto items-center px-2 gap-1 absolute -bottom-2 z-30 left-1/2 -translate-x-1/2">
        <div
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
                updateLink({


                    id: item.id,
                    size: 'mini'

                })
            }}
            className="hover:bg-gray-600 w-5 h-5 flex justify-center items-center rounded-[5px]"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none"
            >
                <path
                    d="M6.5 1.25H1.5C1.36193 1.25 1.25 1.36193 1.25 1.5V6.5C1.25 6.63807 1.36193 6.75 1.5 6.75H6.5C6.63807 6.75 6.75 6.63807 6.75 6.5V1.5C6.75 1.36193 6.63807 1.25 6.5 1.25Z"
                    stroke="#F3F4F6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </svg>
        </div>
        <div
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
                updateLink({
                    id: item.id,
                    size: 'little'

                })
            }}
            className="hover:bg-gray-600 w-5 h-5 flex justify-center items-center rounded-[5px]"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                    d="M13 6H3C2.72386 6 2.5 6.22386 2.5 6.5V9C2.5 9.27614 2.72386 9.5 3 9.5H13C13.2761 9.5 13.5 9.27614 13.5 9V6.5C13.5 6.22386 13.2761 6 13 6Z"
                    stroke="#F3F4F6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </svg>
        </div>
        <div
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
                updateLink({


                    id: item.id,
                    size: 'normal'

                })
            }}
            className="hover:bg-gray-600 w-5 h-5 flex justify-center items-center rounded-[5px]"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
                <path
                    d="M17.2273 4H1.77273C1.34596 4 1 4.51167 1 5.14286V10.8571C1 11.4883 1.34596 12 1.77273 12H17.2273C17.654 12 18 11.4883 18 10.8571V5.14286C18 4.51167 17.654 4 17.2273 4Z"
                    stroke="#F3F4F6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </svg>
        </div>
        <div
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
                updateLink({


                    id: item.id,
                    size: 'big'

                })
            }}
            className="hover:bg-gray-600 w-5 h-5 flex justify-center items-center rounded-[5px]"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                    d="M13 2.5H3C2.72386 2.5 2.5 2.72386 2.5 3V13C2.5 13.2761 2.72386 13.5 3 13.5H13C13.2761 13.5 13.5 13.2761 13.5 13V3C13.5 2.72386 13.2761 2.5 13 2.5Z"
                    stroke="#F3F4F6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </svg>
        </div>
    </div>
    </IsPreview>
}

function DeleteIcon({ item }) {
    const { deleteLink } = useLinkDataDispatch()
    return <IsPreview>

        <div
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
                deleteLink({
                    id: item.id,
                })
            }}
            className="opacity-0 group-hover:opacity-100  hover:bg-gray-600 absolute -top-2 -right-4  w-8 h-8 bg-gray-700 flex justify-center items-center rounded-2xl"><Trash2 width={16} height={16} color="white" /></div>
    </IsPreview>

}

// 🧩 不同类型的 UI 渲染
function ItemContent({ item }) {
    const { loading, submitting } = useLinkData();
    const [formData, setFormData] = useState({

        ctaButton: "",
    });

    switch (item.type) {
        case "link":
            {
                switch (item.size) {
                    case "mini":
                        return (
                            <SpinnerSurface loading={loading} submitting={submitting}>
                                <div className="group flex flex-col justify-center items-center rounded-2xl bg-[#23262c]  w-16 h-16 p-2 relative">
                                    <div className=" w-8 h-8">
                                        <svg width="32" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.4613 17.0032C29.6421 14.7071 29.2071 12.4044 28.2013 10.3325C26.5365 11.9143 24.5685 13.1426 22.416 13.9432C22.5891 16.0676 22.4932 18.2054 22.1307 20.3058C24.75 19.6461 27.2318 18.528 29.4613 17.0032ZM20.012 20.7338C20.4379 18.6978 20.5868 16.6137 20.4547 14.5378C19.1853 14.8405 17.8613 15.0005 16.5 15.0005C15.1387 15.0005 13.8147 14.8405 12.5453 14.5378C12.4163 16.6137 12.5652 18.6974 12.988 20.7338C15.3158 21.0906 17.6843 21.0906 20.012 20.7338ZM13.5293 22.8258C15.5029 23.0593 17.4971 23.0593 19.4707 22.8258C18.7924 25.0093 17.7911 27.0789 16.5 28.9658C15.2089 27.0789 14.2076 25.0093 13.5293 22.8258ZM10.8693 20.3072C10.5049 18.206 10.409 16.0671 10.584 13.9418C8.43105 13.1415 6.46257 11.9132 4.79734 10.3312C3.79176 12.4036 3.35727 14.7068 3.53868 17.0032C5.7682 18.528 8.25004 19.6475 10.8693 20.3072ZM28.9747 19.6698C28.3015 21.9511 27.0163 24.0043 25.2585 25.6067C23.5008 27.2091 21.3377 28.2994 19.004 28.7592C20.1727 26.7942 21.0647 24.6773 21.6547 22.4685C24.2273 21.9293 26.6981 20.9851 28.9747 19.6712V19.6698ZM4.02534 19.6698C6.26801 20.9645 8.73201 21.9205 11.3453 22.4685C11.9354 24.6773 12.8273 26.7942 13.996 28.7592C11.6625 28.2995 9.49953 27.2094 7.7418 25.6073C5.98407 24.0051 4.69874 21.9522 4.02534 19.6712V19.6698ZM19.004 3.24049C22.3076 3.88983 25.2308 5.79493 27.1587 8.55516C25.7356 9.99299 24.0367 11.1286 22.164 11.8938C21.6594 8.83758 20.5877 5.90267 19.004 3.24049ZM16.5 3.03516C18.4459 5.87795 19.7244 9.12364 20.24 12.5298C19.044 12.8365 17.7907 13.0005 16.5 13.0005C15.2093 13.0005 13.956 12.8378 12.76 12.5298C13.2756 9.12363 14.5541 5.87793 16.5 3.03516ZM13.996 3.24049C12.4123 5.90266 11.3406 8.83757 10.836 11.8938C8.96329 11.1286 7.26443 9.99302 5.84134 8.55516C7.76939 5.79533 10.6925 3.88937 13.996 3.24049Z" fill="url(#paint0_linear_1779_5696)"></path><defs><linearGradient id="paint0_linear_1779_5696" x1="15.8333" y1="2.66536" x2="15.8333" y2="31.332" gradientUnits="userSpaceOnUse"><stop stopColor="#0091F0"></stop><stop offset="1" stopColor="#23262C"></stop></linearGradient></defs></svg>
                                    </div>

                                    {/* hover 时显示 */}
                                    <SizeSvg item={item}></SizeSvg>
                                    <DeleteIcon item={item}></DeleteIcon>
                                </div >
                            </SpinnerSurface>

                        )
                    case "little":
                        return (
                            <SpinnerSurface loading={loading} submitting={submitting}>
                                <div className="flex justify-center items-center rounded-2xl bg-[#23262c] w-[426px] h-14 p-2 relative group">
                                    <div className=" w-8 h-8">
                                        <svg width="32" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.4613 17.0032C29.6421 14.7071 29.2071 12.4044 28.2013 10.3325C26.5365 11.9143 24.5685 13.1426 22.416 13.9432C22.5891 16.0676 22.4932 18.2054 22.1307 20.3058C24.75 19.6461 27.2318 18.528 29.4613 17.0032ZM20.012 20.7338C20.4379 18.6978 20.5868 16.6137 20.4547 14.5378C19.1853 14.8405 17.8613 15.0005 16.5 15.0005C15.1387 15.0005 13.8147 14.8405 12.5453 14.5378C12.4163 16.6137 12.5652 18.6974 12.988 20.7338C15.3158 21.0906 17.6843 21.0906 20.012 20.7338ZM13.5293 22.8258C15.5029 23.0593 17.4971 23.0593 19.4707 22.8258C18.7924 25.0093 17.7911 27.0789 16.5 28.9658C15.2089 27.0789 14.2076 25.0093 13.5293 22.8258ZM10.8693 20.3072C10.5049 18.206 10.409 16.0671 10.584 13.9418C8.43105 13.1415 6.46257 11.9132 4.79734 10.3312C3.79176 12.4036 3.35727 14.7068 3.53868 17.0032C5.7682 18.528 8.25004 19.6475 10.8693 20.3072ZM28.9747 19.6698C28.3015 21.9511 27.0163 24.0043 25.2585 25.6067C23.5008 27.2091 21.3377 28.2994 19.004 28.7592C20.1727 26.7942 21.0647 24.6773 21.6547 22.4685C24.2273 21.9293 26.6981 20.9851 28.9747 19.6712V19.6698ZM4.02534 19.6698C6.26801 20.9645 8.73201 21.9205 11.3453 22.4685C11.9354 24.6773 12.8273 26.7942 13.996 28.7592C11.6625 28.2995 9.49953 27.2094 7.7418 25.6073C5.98407 24.0051 4.69874 21.9522 4.02534 19.6712V19.6698ZM19.004 3.24049C22.3076 3.88983 25.2308 5.79493 27.1587 8.55516C25.7356 9.99299 24.0367 11.1286 22.164 11.8938C21.6594 8.83758 20.5877 5.90267 19.004 3.24049ZM16.5 3.03516C18.4459 5.87795 19.7244 9.12364 20.24 12.5298C19.044 12.8365 17.7907 13.0005 16.5 13.0005C15.2093 13.0005 13.956 12.8378 12.76 12.5298C13.2756 9.12363 14.5541 5.87793 16.5 3.03516ZM13.996 3.24049C12.4123 5.90266 11.3406 8.83757 10.836 11.8938C8.96329 11.1286 7.26443 9.99302 5.84134 8.55516C7.76939 5.79533 10.6925 3.88937 13.996 3.24049Z" fill="url(#paint0_linear_1779_5696)"></path><defs><linearGradient id="paint0_linear_1779_5696" x1="15.8333" y1="2.66536" x2="15.8333" y2="31.332" gradientUnits="userSpaceOnUse"><stop stopColor="#0091F0"></stop><stop offset="1" stopColor="#23262C"></stop></linearGradient></defs></svg>

                                    </div>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline text-xs break-all text-center"
                                    >
                                        {item.link}
                                    </a>
                                    <ArrowUpRight></ArrowUpRight>
                                    <SizeSvg item={item}></SizeSvg>
                                    <DeleteIcon item={item}></DeleteIcon>
                                </div>
                            </SpinnerSurface>
                        )
                    case "normal":
                        return (
                            <SpinnerSurface loading={loading} submitting={submitting}>
                                <div className="flex  items-center rounded-2xl  bg-[#23262c] w-[416px] h-[200px] p-2 relative group">
                                    <div className="flex flex-col flex-1 gap-2  items-start">
                                        <div className=" w-8 h-8 flex-1">
                                            <svg width="32" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.4613 17.0032C29.6421 14.7071 29.2071 12.4044 28.2013 10.3325C26.5365 11.9143 24.5685 13.1426 22.416 13.9432C22.5891 16.0676 22.4932 18.2054 22.1307 20.3058C24.75 19.6461 27.2318 18.528 29.4613 17.0032ZM20.012 20.7338C20.4379 18.6978 20.5868 16.6137 20.4547 14.5378C19.1853 14.8405 17.8613 15.0005 16.5 15.0005C15.1387 15.0005 13.8147 14.8405 12.5453 14.5378C12.4163 16.6137 12.5652 18.6974 12.988 20.7338C15.3158 21.0906 17.6843 21.0906 20.012 20.7338ZM13.5293 22.8258C15.5029 23.0593 17.4971 23.0593 19.4707 22.8258C18.7924 25.0093 17.7911 27.0789 16.5 28.9658C15.2089 27.0789 14.2076 25.0093 13.5293 22.8258ZM10.8693 20.3072C10.5049 18.206 10.409 16.0671 10.584 13.9418C8.43105 13.1415 6.46257 11.9132 4.79734 10.3312C3.79176 12.4036 3.35727 14.7068 3.53868 17.0032C5.7682 18.528 8.25004 19.6475 10.8693 20.3072ZM28.9747 19.6698C28.3015 21.9511 27.0163 24.0043 25.2585 25.6067C23.5008 27.2091 21.3377 28.2994 19.004 28.7592C20.1727 26.7942 21.0647 24.6773 21.6547 22.4685C24.2273 21.9293 26.6981 20.9851 28.9747 19.6712V19.6698ZM4.02534 19.6698C6.26801 20.9645 8.73201 21.9205 11.3453 22.4685C11.9354 24.6773 12.8273 26.7942 13.996 28.7592C11.6625 28.2995 9.49953 27.2094 7.7418 25.6073C5.98407 24.0051 4.69874 21.9522 4.02534 19.6712V19.6698ZM19.004 3.24049C22.3076 3.88983 25.2308 5.79493 27.1587 8.55516C25.7356 9.99299 24.0367 11.1286 22.164 11.8938C21.6594 8.83758 20.5877 5.90267 19.004 3.24049ZM16.5 3.03516C18.4459 5.87795 19.7244 9.12364 20.24 12.5298C19.044 12.8365 17.7907 13.0005 16.5 13.0005C15.2093 13.0005 13.956 12.8378 12.76 12.5298C13.2756 9.12363 14.5541 5.87793 16.5 3.03516ZM13.996 3.24049C12.4123 5.90266 11.3406 8.83757 10.836 11.8938C8.96329 11.1286 7.26443 9.99302 5.84134 8.55516C7.76939 5.79533 10.6925 3.88937 13.996 3.24049Z" fill="url(#paint0_linear_1779_5696)"></path><defs><linearGradient id="paint0_linear_1779_5696" x1="15.8333" y1="2.66536" x2="15.8333" y2="31.332" gradientUnits="userSpaceOnUse"><stop stopColor="#0091F0"></stop><stop offset="1" stopColor="#23262C"></stop></linearGradient></defs></svg>

                                        </div>
                                        <div className="text-sm font-semibold text-blue-800 mb-2 flex-1">🔗 Link lorem</div>
                                        <div className="mt-4 h-[38px] w-[90%] md:w-[80%] mx-auto flex-1">
                                            <input
                                                className="rounded-lg bg-transparent transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 text-center cursor-pointer outline-none font-bold text-sm py-2 border-2 border-secondary px-3 w-full max-w-[150px] text-light hover:bg-dark hover:text-lighter focus:text-lighter focus:bg-dark focus:border-primary"
                                                placeholder="Add Button"
                                                name="ctaButton"
                                                value={formData.ctaButton}
                                                onChange={(e) => setFormData({ ...formData, ctaButton: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="h-[150px] flex-1 bg-amber-500"></div>
                                    <SizeSvg item={item}></SizeSvg>
                                    <DeleteIcon item={item}></DeleteIcon>
                                </div>
                            </SpinnerSurface>
                        )
                    case "big":
                        return (
                            <SpinnerSurface loading={loading} submitting={submitting}>
                                <div className="flex flex-col  rounded-2xl items-start bg-[#23262c] w-[192px] h-[200px] p-2 relative group">
                                    <div className=" w-8 h-8 flex-1">
                                        <svg width="32" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.4613 17.0032C29.6421 14.7071 29.2071 12.4044 28.2013 10.3325C26.5365 11.9143 24.5685 13.1426 22.416 13.9432C22.5891 16.0676 22.4932 18.2054 22.1307 20.3058C24.75 19.6461 27.2318 18.528 29.4613 17.0032ZM20.012 20.7338C20.4379 18.6978 20.5868 16.6137 20.4547 14.5378C19.1853 14.8405 17.8613 15.0005 16.5 15.0005C15.1387 15.0005 13.8147 14.8405 12.5453 14.5378C12.4163 16.6137 12.5652 18.6974 12.988 20.7338C15.3158 21.0906 17.6843 21.0906 20.012 20.7338ZM13.5293 22.8258C15.5029 23.0593 17.4971 23.0593 19.4707 22.8258C18.7924 25.0093 17.7911 27.0789 16.5 28.9658C15.2089 27.0789 14.2076 25.0093 13.5293 22.8258ZM10.8693 20.3072C10.5049 18.206 10.409 16.0671 10.584 13.9418C8.43105 13.1415 6.46257 11.9132 4.79734 10.3312C3.79176 12.4036 3.35727 14.7068 3.53868 17.0032C5.7682 18.528 8.25004 19.6475 10.8693 20.3072ZM28.9747 19.6698C28.3015 21.9511 27.0163 24.0043 25.2585 25.6067C23.5008 27.2091 21.3377 28.2994 19.004 28.7592C20.1727 26.7942 21.0647 24.6773 21.6547 22.4685C24.2273 21.9293 26.6981 20.9851 28.9747 19.6712V19.6698ZM4.02534 19.6698C6.26801 20.9645 8.73201 21.9205 11.3453 22.4685C11.9354 24.6773 12.8273 26.7942 13.996 28.7592C11.6625 28.2995 9.49953 27.2094 7.7418 25.6073C5.98407 24.0051 4.69874 21.9522 4.02534 19.6712V19.6698ZM19.004 3.24049C22.3076 3.88983 25.2308 5.79493 27.1587 8.55516C25.7356 9.99299 24.0367 11.1286 22.164 11.8938C21.6594 8.83758 20.5877 5.90267 19.004 3.24049ZM16.5 3.03516C18.4459 5.87795 19.7244 9.12364 20.24 12.5298C19.044 12.8365 17.7907 13.0005 16.5 13.0005C15.2093 13.0005 13.956 12.8378 12.76 12.5298C13.2756 9.12363 14.5541 5.87793 16.5 3.03516ZM13.996 3.24049C12.4123 5.90266 11.3406 8.83757 10.836 11.8938C8.96329 11.1286 7.26443 9.99302 5.84134 8.55516C7.76939 5.79533 10.6925 3.88937 13.996 3.24049Z" fill="url(#paint0_linear_1779_5696)"></path><defs><linearGradient id="paint0_linear_1779_5696" x1="15.8333" y1="2.66536" x2="15.8333" y2="31.332" gradientUnits="userSpaceOnUse"><stop stopColor="#0091F0"></stop><stop offset="1" stopColor="#23262C"></stop></linearGradient></defs></svg>

                                    </div>
                                    <div className="text-sm font-semibold text-blue-800 mb-2 flex-1">🔗 Link</div>
                                    <div className="mt-4 h-[38px] w-[90%] md:w-[80%] mx-auto flex-1">
                                        <input
                                            className="rounded-lg bg-transparent transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 text-center cursor-pointer outline-none font-bold text-sm py-2 border-2 border-secondary px-3 w-full max-w-[150px] text-light hover:bg-dark hover:text-lighter focus:text-lighter focus:bg-dark focus:border-primary"
                                            placeholder="Add Button"
                                            name="ctaButton"
                                            value={formData.ctaButton}
                                            onChange={(e) => setFormData({ ...formData, ctaButton: e.target.value })}
                                        />
                                    </div>
                                    <SizeSvg item={item}></SizeSvg>
                                    <DeleteIcon item={item}></DeleteIcon>
                                </div>
                            </SpinnerSurface>
                        )
                }

            };

        case "post":
            return (
                <SpinnerSurface loading={loading} submitting={submitting}>
                    <div className=" group relative flex flex-col justify-center items-center rounded-2xl bg-[#23262c] w-[192px] h-[462px] p-2 ">
                        <div className="w-full h-80 rounded-2xl bg-amber-400"></div>
                        <div className="text-sm font-semibold text-green-800 mb-1">📝 Post</div>
                        <div className="text-gray-700 text-xs p-2 text-center overflow-hidden w-full">
                            This is a post component<br />({item.link})
                        </div>
                        <DeleteIcon item={item}></DeleteIcon>
                    </div>
                </SpinnerSurface>
            );

        case "embed":
            return (
                <SpinnerSurface loading={loading} submitting={submitting}>
                    <div className=" group relative bg-purple-200 w-[416px] h-[432px] p-2  flex flex-col justify-center items-center rounded-2xl">
                        <iframe
                            src={item.link}
                            title="Embed"
                            className="w-full h-full rounded-2xl"
                        />
                        <DeleteIcon item={item}></DeleteIcon>
                    </div>
                </SpinnerSurface>
            );

        default:
            return (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    Unknown type
                </div>
            );
    }
}

// ✨ 拖拽时的悬浮影子
function OverlayItem({ item }) {
    if (!item) return null;

    return (
        <div className="opacity-80 rounded-lg shadow-2xl">
            <ItemContent item={item} />
        </div>
    );
}
