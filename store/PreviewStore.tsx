import React, { createContext, useContext, useState } from 'react'

const PreviewContext = createContext();
export default function PreviewProvider({ children }) {
    const [isPreview, setIsPreview] = useState(false);
    return (
        <PreviewContext.Provider value={{
            isPreview, setIsPreview
        }}>
            {children}</PreviewContext.Provider>
    )
}
export function usePreview() {
    return useContext(PreviewContext);
}