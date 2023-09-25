"use client";

import styled from "@emotion/styled";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";

import ToolbarPlugin from "./plugins/ToolbarPlugin";
import defaultTheme from "./themes/default";
import { ListPlugin } from "./plugins/ListPlugin";
import { AutoFocusPlugin } from "./plugins/LexicalAutoFocusPlugin";

import { media } from "@/lib/media-queries";
import { ScrollArea } from "@/components/UI/ScrollArea";

function onError(error: Error) {
  console.error(error);
}

function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    onError,
    theme: defaultTheme,
    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorContainer>
        <ToolbarPlugin />
        <ScrollArea>
          <EditorInner>
            <AutoFocusPlugin />
            <RichTextPlugin
              contentEditable={<SContentEditable className="editor-input" />}
              placeholder={<Placeholder>Enter some text...</Placeholder>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <ListPlugin />
          </EditorInner>
        </ScrollArea>
      </EditorContainer>
    </LexicalComposer>
  );
}

export default Editor;

const EditorContainer = styled.div`
  outline-offset: -0.5px;
  gap: 1rem;
  background: #fff;
  display: flex;
  flex-direction: column;

  width: 100%;
  border-radius: 8px;
  height: 70%;
  position: relative;

  flex-grow: 1;
`;
const EditorInner = styled.div`
  background: #fff;
  position: relative;
  height: 100%;
  width: 100%;
`;
const SContentEditable = styled(ContentEditable)`
  border-radius: 3px;
  min-height: 150px;
  height: 100%;
  width: 100%;
  resize: none;
  font-size: 15px;
  caret-color: rgb(5, 5, 5);
  position: relative;
  tab-size: 1;
  outline: 0;
  padding: 15px 10px;
  caret-color: #444;

  .editor-heading-h1 {
    scroll-margin: 5rem;
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 800;
    letter-spacing: -0.025em;

    ${media.lg} {
      font-size: 2.8rem;
      line-height: 1;
    }
  }

  .editor-heading-h2 {
    scroll-margin: 5rem;
    padding-bottom: 0.5rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 600;
    letter-spacing: -0.025em;
  }

  .editor-quote {
    margin: 0;
    margin-left: 20px;
    font-size: 15px;
    color: rgb(101, 103, 107);
    border-left-color: rgb(206, 208, 212);
    border-left-width: 4px;
    border-left-style: solid;
    padding-left: 16px;
  }

  .editor-list-ol {
    padding: 0;
    margin: 1.5rem 0 1.5rem 1.5rem;
    margin-left: 16px;
  }

  .editor-list-ul {
    padding: 0;
    margin: 1.5rem 0 1.5rem 1.5rem;
    margin-left: 16px;
  }

  .editor-listitem {
    margin: 0.3rem 2rem;
  }

  .editor-nested-listitem {
    list-style-type: none;
  }

  .editor-text-bold {
    font-weight: bold;
  }

  .editor-text-italic {
    font-style: italic;
  }

  .editor-text-underline {
    text-decoration: underline;
  }

  .editor-text-strikethrough {
    text-decoration: line-through;
  }

  .editor-text-underlineStrikethrough {
    text-decoration: underline line-through;
  }

  .editor-text-code {
    background-color: rgb(240, 242, 245);
    padding: 1px 0.25rem;
    font-family: Menlo, Consolas, Monaco, monospace;
    font-size: 94%;
  }

  .editor-link {
    color: rgb(33, 111, 219);
    text-decoration: none;
  }
`;

const Placeholder = styled.p`
  color: #999;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 15px;
  left: 10px;
  font-size: 15px;
  user-select: none;
  display: inline-block;
  pointer-events: none;
  margin: 0 !important;
`;
