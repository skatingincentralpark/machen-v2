"use client";

import styled from "@emotion/styled";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
} from "lexical";
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";

import BlockOptionsDropdownList from "./BlockOptionsDropdownList";
import { Button } from "@/components/UI/Button";

const LowPriority = 1;

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol",
]);

export default function ToolbarPlugin() {
  return (
    <Toolbar className="toolbar">
      <Inner>
        <ToolbarButtons />
      </Inner>
    </Toolbar>
  );
}

export const Toolbar = styled.div`
  width: 100%;
  outline-offset: -0.5px;
  border-right: none;
`;
const Inner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ToolbarButtons = () => {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState("paragraph");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();

      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload) => {
          updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  return (
    <>
      {supportedBlockTypes.has(blockType) && (
        <BlockOptionsDropdownList editor={editor} blockType={blockType} />
      )}
      <>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
          className={"toolbar-item spaced " + (isBold ? "active" : "")}
          aria-label="Format Bold"
        >
          <span>Bold</span>
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
          className={"toolbar-item spaced " + (isItalic ? "active" : "")}
          aria-label="Format Italics"
        >
          <span>Italic</span>
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
          className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
          aria-label="Format Underline"
        >
          <span>Underline</span>
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
          }}
          className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
          aria-label="Format Strikethrough"
        >
          <span>Strikethrough</span>
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
          }}
          className={"toolbar-item spaced " + (isCode ? "active" : "")}
          aria-label="Insert Code"
        >
          <span>Code</span>
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
          }}
          className="toolbar-item spaced"
          aria-label="Left Align"
        >
          <span>Left Align</span>
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          }}
          className="toolbar-item spaced"
          aria-label="Center Align"
        >
          <span>Center Align</span>
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
          }}
          className="toolbar-item spaced"
          aria-label="Right Align"
        >
          <span>Right Align</span>
        </Button>
        <Button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
          }}
          className="toolbar-item"
          aria-label="Justify Align"
        >
          <span>Justify Align</span>
        </Button>{" "}
      </>
    </>
  );
};
