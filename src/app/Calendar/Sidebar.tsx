"use client";
import { styleTokens } from "@/lib/style-tokens";
import styled from "@emotion/styled";
import { NOTES_DATA_V2 } from "@/lib/data-calendar-v2";
import { type NotesDataV2 } from "@/types/note";
import { format } from "date-fns";
import { Cookie, HelpCircle } from "lucide-react";
import { ButtonBase } from "../UI/Button";
import { useLayout } from "@/context/LayoutContext";

export default function Sidebar() {
  interface Note {
    date: Date;
    dateShort: string;
    text: string;
    title: string;
  }

  /** Move this into context I guess */
  function convertNotesDataToArray(data: NotesDataV2): Note[] {
    const notesArray: Note[] = [];

    for (const year in data) {
      for (const month in data[Number(year)]) {
        for (const day in data[Number(year)]?.[Number(month)]) {
          const note = data[Number(year)]?.[Number(month)]?.[Number(day)];
          const date = new Date(+year, +month, +day);
          const dateShort = format(date, "do MMM");

          if (!note) continue;
          notesArray.push({
            date,
            dateShort,
            text: note.text,
            title: note.title,
          });
        }
      }
    }

    return notesArray;
  }

  const notesArray = convertNotesDataToArray(NOTES_DATA_V2);

  const { sidebarOpen } = useLayout();

  if (!sidebarOpen) return null;

  return (
    <Wrapper>
      <SidebarHeader>
        <Title>All Notes</Title>
      </SidebarHeader>
      <SidebarContent>
        {notesArray.map((note) => {
          const splitDate = note.dateShort.split(" ");
          return (
            <Row key={note.date.getTime()}>
              <RowInner>
                <span>
                  <strong>{splitDate[0]} </strong>
                  {splitDate[1]}
                </span>

                <span>{note.text}</span>
              </RowInner>
            </Row>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <ButtonBase
          aria-label="Toggle fortune cookies"
          title="Toggle fortune cookies"
        >
          <Cookie /> Fortune Cookies?
        </ButtonBase>
        <ButtonBase>
          <HelpCircle /> Help?
        </ButtonBase>
      </SidebarFooter>
    </Wrapper>
  );
}

const Title = styled.h3`
  color: ${styleTokens.color.orange};
  padding: ${styleTokens.space[4]} ${styleTokens.space[8]};
`;
const Wrapper = styled.div`
  font-size: ${styleTokens.size.sm};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  width: 17rem;
  position: relative;
  border-left: 1px solid ${styleTokens.color.gray[300]};
  max-height: 100vh;
  padding: ${styleTokens.space[4]} 0;
  color: ${styleTokens.color.gray[400]};

  & > div {
    overflow-y: auto;
  }
`;
const Row = styled.button`
  border-top: 1px solid ${styleTokens.color.gray[200]};
  width: 100%;
`;
const RowInner = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: ${styleTokens.space[4]} ${styleTokens.space[8]};
  display: block;

  & > span:first-of-type {
    margin-right: ${styleTokens.space[4]};
    color: ${styleTokens.color.slate[300]};
  }
`;
const SidebarHeader = styled.div`
  flex-shrink: 0;
`;
const SidebarContent = styled.div`
  flex-grow: 1;
`;
const SidebarFooter = styled.div`
  padding: ${styleTokens.space[4]} ${styleTokens.space[8]};
  display: flex;
  flex-direction: column;
  gap: ${styleTokens.space[4]};
  align-items: flex-start;
  flex-shrink: 0;
  font-weight: bold;
`;
