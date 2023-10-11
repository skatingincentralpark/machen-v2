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
  type ElementFormatType,
  $isElementNode,
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
import { getSelectedNode } from "../../utilts/getSelectedNode";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";

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
  const [elementFormat, setElementFormat] = useState<ElementFormatType>("left");

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

      const node = getSelectedNode(selection);
      const parent = node.getParent();

      setElementFormat(
        ($isElementNode(node)
          ? node.getFormatType()
          : parent?.getFormatType()) || "left"
      );
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
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
          aria-label="Format Bold"
          variant={isBold ? "active" : "primary"}
        >
          <Bold size={15} strokeWidth={isBold ? 3 : 2} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
          aria-label="Format Italics"
          variant={isItalic ? "active" : "primary"}
        >
          <Italic size={15} strokeWidth={isItalic ? 3 : 2} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
          aria-label="Format Underline"
          variant={isUnderline ? "active" : "primary"}
        >
          <Underline size={15} strokeWidth={isUnderline ? 3 : 2} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
          }}
          aria-label="Format Strikethrough"
          variant={isStrikethrough ? "active" : "primary"}
        >
          <Strikethrough size={15} strokeWidth={isStrikethrough ? 3 : 2} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
          }}
          aria-label="Insert Code"
          variant={isCode ? "active" : "primary"}
        >
          <Code size={15} strokeWidth={isCode ? 3 : 2} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
          }}
          aria-label="Left Align"
          variant={elementFormat === "left" ? "active" : "primary"}
        >
          <AlignLeft size={15} strokeWidth={elementFormat === "left" ? 3 : 2} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          }}
          aria-label="Center Align"
          variant={elementFormat === "center" ? "active" : "primary"}
        >
          <AlignCenter
            size={15}
            strokeWidth={elementFormat === "center" ? 3 : 2}
          />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
          }}
          aria-label="Right Align"
          variant={elementFormat === "right" ? "active" : "primary"}
        >
          <AlignRight
            size={15}
            strokeWidth={elementFormat === "right" ? 3 : 2}
          />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
          }}
          aria-label="Justify Align"
          variant={elementFormat === "justify" ? "active" : "primary"}
        >
          <AlignJustify
            size={15}
            strokeWidth={elementFormat === "justify" ? 3 : 2}
          />
        </ToolbarButton>{" "}
      </>
    </>
  );
};

export const ToolbarButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
