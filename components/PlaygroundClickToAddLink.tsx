"use client";
import { Plus } from 'lucide-react'
import React from 'react'
import { useState } from "react";
import { CardsModal } from "@/components/cards-modal";
import IsPreview from './IsPreview';


export default function PlaygroundClickToAddLink() {
  const [open, setOpen] = useState(false);
  return (
    <IsPreview>
      <div className="w-full">
        <div className="h-[196px] mb-[20px] mx-1">
          <div
            className="cursor-pointer rounded-[18px] border-2 border-secondary w-full h-[200px] hover:bg-dark transition-all duration-200 ease-in-out"
          >
            <div className="rounded-2xl border-8 border-[#3c3e44] w-full h-full flex flex-col justify-center items-center">
              <div className="w-full h-full flex flex-col justify-center items-center" onClick={() => setOpen(true)}>
                <Plus className="w-8 h-8 text-primary mb-2" />
                <span className="text-lighter text-sm mt-2">
                  Click to add link, post, embed, etc.
                </span>
              </div>
              <CardsModal open={open} onOpenChange={setOpen} />
            </div>
          </div>
        </div>
      </div>
    </IsPreview>




  )
}
