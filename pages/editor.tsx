import React from 'react'
import dynamic from "next/dynamic";
const EditorWrapper = dynamic(() => import('../components/Editor'), {ssr: false})

const EditorPage = () => {
    return <>
        <EditorWrapper/>
    </>
}

export default EditorPage
