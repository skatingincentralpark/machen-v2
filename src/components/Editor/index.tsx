"use client";

import styled from "@emotion/styled";
import { useEffect } from "react";

import { $getRoot, type LexicalEditor } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import ToolbarPlugin from "./plugins/ToolbarPlugin";
import defaultTheme from "./themes/default";
import { ListPlugin } from "./plugins/ListPlugin";
import { AutoFocusPlugin } from "./plugins/LexicalAutoFocusPlugin";

import { media } from "@/lib/media-queries";
import { SheetClose } from "@/components/UI/Sheet";
import { ScrollArea } from "@/components/UI/ScrollArea";
import { Button } from "@/components/UI/Button";

function onError(error: Error) {
  console.error(error);
}

interface Props {
  editorStateString: string | undefined;
  save: (editor: LexicalEditor, isEmpty: () => boolean) => void;
  deleteText: () => void;
}

function Editor(props: Props) {
  const initialConfig = {
    namespace: "MyEditor",
    onError,
    theme: defaultTheme,
    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorContainer>
        <EditorComponents {...props} />
      </EditorContainer>
    </LexicalComposer>
  );
}

function EditorComponents({ editorStateString, save, deleteText }: Props) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editorStateString) return;
    editor.update(() => {
      const editorState = editor.parseEditorState(editorStateString);
      editor.setEditorState(editorState);
    });
  }, [editorStateString, editor]);

  const isEditorEmpty = () =>
    editor.getEditorState().read(() => {
      const root = $getRoot();
      const rootFirstChild = root.getFirstChild();
      if (!rootFirstChild) return true;

      const fcEmptyFunc = rootFirstChild.isEmpty as () => boolean;
      const fcEmpty = fcEmptyFunc && fcEmptyFunc();
      const isEmpty = fcEmpty && root.getChildrenSize() === 1;
      return isEmpty;
    });

  return (
    <>
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
      <ButtonWrapper>
        <SheetClose asChild>
          <Button aria-label="Close editor">Close</Button>
        </SheetClose>
        <SheetClose asChild>
          <Button onClick={() => save(editor, isEditorEmpty)}>Save</Button>
        </SheetClose>
        <SheetClose asChild>
          <Button onClick={deleteText} variant="destructive">
            Delete Note
          </Button>
        </SheetClose>
      </ButtonWrapper>
    </>
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
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
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
