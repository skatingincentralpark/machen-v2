import React, { useState } from "react";
import styled from "@emotion/styled";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  type LexicalEditor,
} from "lexical";
import { $wrapNodes } from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";

const blockTypeToBlockName: Record<string, string> = {
  code: "Code Block",
  h1: "Large Heading",
  h2: "Small Heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  ul: "Bulleted List",
};

interface Props {
  editor: LexicalEditor;
  blockType: string;
}

function BlockOptionsDropdownList({ editor, blockType }: Props) {
  const [open, setOpen] = useState(false);

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
    setOpen(false);
    editor.focus();
  };

  const formatLargeHeading = () => {
    if (blockType !== "h1") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h1"));
        }
      });
    }
    setOpen(false);
    editor.focus();
  };

  const formatSmallHeading = () => {
    if (blockType !== "h2") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h2"));
        }
      });
    }
    setOpen(false);
    editor.focus();
  };

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setOpen(false);
    editor.focus();
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setOpen(false);
    editor.focus();
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
    setOpen(false);
    editor.focus();
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button aria-label="Formatting Options">
          <span className={"icon block-type " + blockType} />
          <span className="text">{blockTypeToBlockName[blockType]}</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenuContent
          onCloseAutoFocus={(e) => e.preventDefault()}
          sideOffset={0}
          align="start"
        >
          <DropdownMenu.Item asChild>
            <button className="item" onClick={formatParagraph}>
              <span className="icon paragraph" />
              <span className="text">Normal</span>
              {blockType === "paragraph" && <span className="active" />}
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <button className="item" onClick={formatLargeHeading}>
              <span className="icon large-heading" />
              <span className="text">Large Heading</span>
              {blockType === "h1" && <span className="active" />}
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <button className="item" onClick={formatSmallHeading}>
              <span className="icon small-heading" />
              <span className="text">Small Heading</span>
              {blockType === "h2" && <span className="active" />}
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <button className="item" onClick={formatBulletList}>
              <span className="icon bullet-list" />
              <span className="text">Bullet List</span>
              {blockType === "ul" && <span className="active" />}
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <button className="item" onClick={formatNumberedList}>
              <span className="icon numbered-list" />
              <span className="text">Numbered List</span>
              {blockType === "ol" && <span className="active" />}
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <button className="item" onClick={formatQuote}>
              <span className="icon quote" />
              <span className="text">Quote</span>
              {blockType === "quote" && <span className="active" />}
            </button>
          </DropdownMenu.Item>
        </DropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default BlockOptionsDropdownList;

const DropdownMenuContent = styled(DropdownMenu.Content)`
  background-color: #fff;
  position: absolute;
  z-index: 1;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  border: 1px solid #ccc;

  & > button {
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 0.25rem 0.5rem;
  }
`;
