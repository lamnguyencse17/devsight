import React, {useState} from 'react'
import {EditorState, convertToRaw} from 'draft-js';
import { draftjsToMd } from 'draftjs-md-converter';
import styled from "styled-components";
import 'draft-js/dist/Draft.css'
import EditorPreview from './Editor/EditorPreview';
import EditorWriter from './Editor/EditorWriter';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 0 5px 0 5px;
`;

const ContentLabel = styled.label`
margin-top: 1em
`

const PreviewLabel = styled.label`
margin-top: 3em
`

const EditorWrapper = () => {
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    );
    const [title, setTitle] = useState('')
    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const [markdownContent, setMarkdownContent] = useState('')

    const handleEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState)
        const content = editorState.getCurrentContent()
        const rawObject = convertToRaw(content)
        setMarkdownContent(draftjsToMd(rawObject))
    }
    return <Wrapper>
        <label>Title</label>
        <input value={title} onChange={handleChangeTitle}/>
        <ContentLabel>Content</ContentLabel>
        <EditorWriter editorState={editorState} handleEditorStateChange={handleEditorStateChange}/>
        <PreviewLabel>Preview</PreviewLabel>
        <EditorPreview markdownContent={markdownContent}/>
    </Wrapper>
}

export default EditorWrapper
