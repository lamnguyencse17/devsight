import React, {useEffect, useRef} from 'react'
import {Editor, EditorState} from 'draft-js';
import styled from 'styled-components';

const EditorContainer = styled.div`
  width: 100%;
  height: 200px;

  & .DraftEditor-root {
    background-color: #fffef7;
    margin: auto;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.5);
    overflow-y: auto;
    padding: 1em;
    font-size: 18px;
    font-family: 'calibri', sans-serif;
  }
`

interface EditorWriterProps {
    editorState: EditorState,
    handleEditorStateChange: (editorState: EditorState) => void
}

const EditorWriter = ({editorState, handleEditorStateChange}: EditorWriterProps) => {
    const editor = useRef<Editor | null>(null);
    const focusEditor = () => {
        editor?.current?.focus();
    }

    useEffect(() => {
        focusEditor()
    }, []);

    return <EditorContainer onClick={focusEditor}>
        <Editor
            ref={editor}
            editorState={editorState}
            onChange={editorState => handleEditorStateChange(editorState)}
        />
    </EditorContainer>
}

export default EditorWriter
