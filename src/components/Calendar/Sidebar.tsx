"use client";
import { styleTokens } from "@/lib/style-tokens";
import styled from "@emotion/styled";
import { type NotesData } from "@/types/note";
import { format } from "date-fns";
import { Cookie, HelpCircle } from "lucide-react";
import { ButtonBase } from "../UI/Button";
import { useLayout } from "@/context/LayoutContext";
import { useNotes } from "@/context/NotesContext";
import SidebarRow from "./SidebarRow";
export interface NoteForSidebar {
  date: Date;
  dateShort: string;
  content: string;
  title: string;
}

export default function Sidebar() {
  const { notes } = useNotes();

  /** Move this into context I guess */
  function convertNotesDataToArray(data: NotesData): NoteForSidebar[] {
    const notesArray: NoteForSidebar[] = [];

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
            content: note.content,
            title: note.title,
          });
        }
      }
    }

    return notesArray;
  }

  const notesArray = convertNotesDataToArray(notes);
  const { sidebarOpen } = useLayout();

  if (!sidebarOpen) return null;

  return (
    <Wrapper>
      <SidebarHeader>
        <Title>All Notes</Title>
      </SidebarHeader>
      <SidebarContent>
        {notesArray.map((note) => (
          <SidebarRow note={note} key={`sidebar-${note.date.getTime()}`} />
        ))}
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
