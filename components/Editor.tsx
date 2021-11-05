import React, {useState, useRef, useEffect} from 'react'
import { draftToMarkdown } from 'markdown-draft-js';
import {EditorState, convertToRaw, Editor} from 'draft-js';
import remarkGfm from 'remark-gfm'
import MarkdownView from 'react-showdown';
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin-top: 3em;
`;

const EditorContainer = styled.div`
  display: flex;
  min-height: 9em;
  width: 50%;
  border-radius: 0 0 3px 3px;
  background-color: #fff;
  padding: 5px;
  font-size: 17px;
  font-weight: 300;
  box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
`;

const EditorWrapper = () => {
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    );
    const [markdownContent, setMarkdownContent] = useState('')
    const editor = useRef<Editor | null>(null);

    const focusEditor = () => {
        editor?.current?.focus();
    }

    useEffect(() => {
        focusEditor()
    }, []);

    useEffect(() => {
        console.log(markdownContent)
    }, [markdownContent]);

    const handleEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState)
        const content = editorState.getCurrentContent()
        const rawObject = convertToRaw(content)
        setMarkdownContent(draftToMarkdown(rawObject, {preserveNewlines: true}))
    }
    return <Wrapper>
        <EditorContainer onClick={focusEditor}>
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={editorState => handleEditorStateChange(editorState)}
            />
        </EditorContainer>
        <EditorContainer>
            <MarkdownView markdown={markdownContent}/>
        </EditorContainer>
    </Wrapper>
}

export default EditorWrapper
