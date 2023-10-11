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
import { Button } from "@/components/UI/Button";
import {
  Heading1,
  Heading2,
  List,
  ListOrdered,
  LucideTextQuote,
  Text,
} from "lucide-react";
import { ToolbarButton } from "./index";

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

  const blockTypeMap = [
    {
      name: "Normal",
      icon: <Text size={15} />,
      type: "paragraph",
      onClick: formatParagraph,
    },
    {
      name: "Large Heading",
      icon: <Heading1 size={15} />,
      type: "h1",
      onClick: formatLargeHeading,
    },
    {
      name: "Small Heading",
      icon: <Heading2 size={15} />,
      type: "h2",
      onClick: formatSmallHeading,
    },
    {
      name: "Bulleted List",
      icon: <List size={15} />,
      type: "ul",
      onClick: formatBulletList,
    },
    {
      name: "Numbered List",
      icon: <ListOrdered size={15} />,
      type: "ol",
      onClick: formatNumberedList,
    },
    {
      name: "Quote",
      icon: <LucideTextQuote size={15} />,
      type: "quote",
      onClick: formatQuote,
    },
  ];

  const selected = blockTypeMap.find((block) => block.type === blockType);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <ToolbarButton aria-label="Formatting Options">
          {selected?.icon} {selected?.name}
        </ToolbarButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenuContent
          onCloseAutoFocus={(e) => e.preventDefault()}
          sideOffset={0}
          align="start"
        >
          {blockTypeMap.map((block) => {
            return (
              <DropdownMenu.Item asChild key={block.type}>
                <DropdownButton
                  onClick={block.onClick}
                  variant={blockType === block.type ? "active" : "primary"}
                >
                  {block.icon} {block.name}
                </DropdownButton>
              </DropdownMenu.Item>
            );
          })}
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
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const DropdownButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 2rem;
  justify-content: start;
`;
