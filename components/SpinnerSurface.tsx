import React from 'react'
import { Spinner } from './ui/spinner'
import { Check } from 'lucide-react'

export default function SpinnerSurface({ children, loading,submitting }) {
    return (
        <div className="relative rounded-2xl ">
            {/* 半透明遮罩 + Spinner 居中 */}
            {(loading || submitting) && (<div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                {loading && <Spinner className="text-[#8b5cf6] size-8" />}
                {submitting && <Check className="text-green-500 size-8" />}
            </div>)}

            {/* 子元素放在下面 */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}
