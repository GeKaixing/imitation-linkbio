import { usePreview } from '@/store/PreviewStore'
import React from 'react'

export default function IsPreview({ children }) {
    const { isPreview } = usePreview()
    return (
        !isPreview ? <>{children}</> : null
    )
}
