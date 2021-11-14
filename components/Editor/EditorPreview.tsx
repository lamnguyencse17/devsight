import React from 'react'
import MarkdownView from 'react-showdown';
import styled from 'styled-components';

interface EditorPreviewProps {
    markdownContent: string
}

const EditorPreviewContainer = styled.div`
  display: flex;
  min-height: 300px;
  width: 100%;
  border-radius: 0 0 3px 3px;
  background-color: #fff;
  padding: 1em;
  font-size: 16px;
  font-weight: 300;
  box-shadow: 0 0 3px 1px rgba(15, 15, 15, 0.17);
`;

const EditorPreview = ({markdownContent}: EditorPreviewProps) => {
    return <EditorPreviewContainer>
        <MarkdownView markdown={markdownContent}/>
    </EditorPreviewContainer>
}

export default EditorPreview
