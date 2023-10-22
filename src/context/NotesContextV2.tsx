"use client";

import { NotesDataV2Schema } from "@/lib/data-v2";
import { type NotesDataV2 } from "@/types/note";
import React, {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface INotesContext {
  notes: NotesDataV2;
  setNotes: React.Dispatch<React.SetStateAction<NotesDataV2>>;
  setDummyNotes: () => void;
  saveNote: (title: string, content: string, date: Date) => void;
  deleteNote: (date: Date) => void;
}

const Context = createContext<INotesContext>({
  notes: {},
  setNotes: () => {},
  setDummyNotes: () => {},
  saveNote: () => {},
  deleteNote: () => {},
});

function deleteMonthIfEmpty(
  newNotes: NotesDataV2,
  year: number,
  month: number
) {
  const monthIsEmpty = Object.keys(newNotes[year]?.[month] ?? {}).length === 0;

  if (monthIsEmpty) {
    delete newNotes[year]?.[month];
    deleteYearIfEmpty(newNotes, year);
  }
}

function deleteYearIfEmpty(newNotes: NotesDataV2, year: number) {
  const yearIsEmpty = Object.keys(newNotes[year] ?? {}).length === 0;

  if (yearIsEmpty) {
    delete newNotes[year];
  }
}

const NotesControllerV2 = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<NotesDataV2>({});

  useEffect(() => {
    function getDataFromStorage() {
      const machenData = localStorage.getItem("machen-data");
      if (machenData === null) return {};

      const initialValue: unknown = JSON.parse(machenData);

      const val = NotesDataV2Schema.safeParse(initialValue);

      if (!val.success) {
        console.error("Something went wrong retreiving notes data.");
        localStorage.removeItem("machen-data");
        return {};
      }

      return val.data;
    }

    setNotes(getDataFromStorage());
  }, [setNotes]);

  async function setDummyNotes() {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";
    const dummyNotes = await fetch(`${baseUrl}/api/notes`);
    const dummyNotesData: unknown = await dummyNotes.json();

    const data = NotesDataV2Schema.safeParse(dummyNotesData);
    if (!data.success) throw new Error("The dummy notes data is not valid.");

    setNotes(data);
    localStorage.setItem("machen-data", JSON.stringify(data));
  }

  function isEditorEmpty(title: string, content: string) {
    return title === "" && content === "";
  }

  function saveNote(title: string, content: string, date: Date) {
    setNotes((prevNotes) => {
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();

      const newNotes = {
        ...prevNotes,
      };

      if (isEditorEmpty(title, content)) {
        delete newNotes[year]?.[month]?.[day];
        deleteMonthIfEmpty(newNotes, year, month);
      } else {
        newNotes[year] = {
          ...newNotes[year],
          [month]: {
            ...newNotes[year]?.[month],
            [day]: {
              title,
              content,
            },
          },
        };
      }

      localStorage.setItem("machen-data", JSON.stringify(newNotes));

      return newNotes;
    });
  }

  function deleteNote(date: Date) {
    setNotes((prevNotes) => {
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();

      const newNotes = {
        ...prevNotes,
      };

      delete newNotes[year]?.[month]?.[day];

      deleteMonthIfEmpty(newNotes, year, month);

      localStorage.setItem("machen-data", JSON.stringify(newNotes));
      return newNotes;
    });
  }

  const value = { notes, setNotes, setDummyNotes, saveNote, deleteNote };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useNotesV2 = () => useContext(Context);

export { NotesControllerV2, useNotesV2 };
