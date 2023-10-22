"use client";

import { NotesDataSchema } from "@/lib/data";
import { type NotesData } from "@/types/note";
import React, {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface INotesContext {
  notes: NotesData;
  setNotes: React.Dispatch<React.SetStateAction<NotesData>>;
  setDummyNotes: () => void;
  saveNote: (title: string, content: string, date: Date) => void;
  deleteNote: (date: Date) => void;
  todaysNote: { title: string; content: string } | undefined;
}

const Context = createContext<INotesContext>({
  notes: {},
  setNotes: () => {},
  setDummyNotes: () => {},
  saveNote: () => {},
  deleteNote: () => {},
  todaysNote: { title: "", content: "" },
});

function deleteMonthIfEmpty(newNotes: NotesData, year: number, month: number) {
  const monthIsEmpty = Object.keys(newNotes[year]?.[month] ?? {}).length === 0;

  if (monthIsEmpty) {
    delete newNotes[year]?.[month];
    deleteYearIfEmpty(newNotes, year);
  }
}

function deleteYearIfEmpty(newNotes: NotesData, year: number) {
  const yearIsEmpty = Object.keys(newNotes[year] ?? {}).length === 0;

  if (yearIsEmpty) {
    delete newNotes[year];
  }
}

const NotesController = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<NotesData>({});

  useEffect(() => {
    function getDataFromStorage() {
      const machenData = localStorage.getItem("machen-data");
      if (machenData === null) return {};

      const initialValue: unknown = JSON.parse(machenData);

      const val = NotesDataSchema.safeParse(initialValue);

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

    const data = NotesDataSchema.safeParse(dummyNotesData);
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

  function getTodaysNote() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    return notes[year]?.[month]?.[day];
  }

  const value = {
    notes,
    setNotes,
    setDummyNotes,
    saveNote,
    deleteNote,
    todaysNote: getTodaysNote(),
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useNotes = () => useContext(Context);

export { NotesController, useNotes };
