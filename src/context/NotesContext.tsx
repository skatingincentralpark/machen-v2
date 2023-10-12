"use client";

import { assertIsNotes } from "@/lib/data";
import { type NotesData } from "@/types/note";
import { type LexicalEditor, type RootNode } from "lexical";
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
  saveNote: (
    editor: LexicalEditor,
    date: Date,
    $getRoot: () => RootNode
  ) => void;
  deleteNote: (date: Date) => void;
}

const Context = createContext<INotesContext>({
  notes: {},
  setNotes: () => {},
  setDummyNotes: () => {},
  saveNote: () => {},
  deleteNote: () => {},
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

      if (!assertIsNotes(initialValue)) {
        console.error("Something went wrong retreiving notes data.");
        localStorage.removeItem("machen-data");
        return {};
      }

      return initialValue;
    }

    setNotes(getDataFromStorage());
  }, [setNotes]);

  async function setDummyNotes() {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";
    const dummyNotes = await fetch(`${baseUrl}/api/notes`);
    const dummyNotesData: unknown = await dummyNotes.json();

    if (!assertIsNotes(dummyNotesData)) {
      throw new Error("The dummy notes data is not valid.");
    }

    setNotes(dummyNotesData);
    localStorage.setItem("machen-data", JSON.stringify(dummyNotesData));
  }

  function isEditorEmpty(editor: LexicalEditor, $getRoot: () => RootNode) {
    return editor.getEditorState().read(() => {
      const root = $getRoot();
      const rootFirstChild = root.getFirstChild();
      if (!rootFirstChild) return true;

      /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
      const fcEmpty = rootFirstChild.isEmpty() as boolean;
      const isEmpty = fcEmpty && root.getChildrenSize() === 1;
      return isEmpty;
    });
  }

  function saveNote(
    editor: LexicalEditor,
    date: Date,
    $getRoot: () => RootNode
  ) {
    setNotes((prevNotes) => {
      const editorStateJson = JSON.stringify(editor.getEditorState());

      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();

      const newNotes = {
        ...prevNotes,
      };

      if (isEditorEmpty(editor, $getRoot)) {
        delete newNotes[year]?.[month]?.[day];
        deleteMonthIfEmpty(newNotes, year, month);
      } else {
        newNotes[year] = {
          ...newNotes[year],
          [month]: {
            ...newNotes[year]?.[month],
            [day]: { text: editorStateJson },
          },
        };
      }

      localStorage.setItem("machen-data", JSON.stringify(newNotes));

      return newNotes;
    });
  }

  function deleteNote(date: Date) {
    const confirmation = confirm("Are you sure you want to delete this note?");

    if (!confirmation) return;

    setNotes((prevNotes) => {
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();

      const newNotes = {
        ...prevNotes,
      };
      console.log(newNotes);
      console.log(newNotes[year]);
      delete newNotes[year]?.[month]?.[day];

      deleteMonthIfEmpty(newNotes, year, month);

      localStorage.setItem("machen-data", JSON.stringify(newNotes));
      return newNotes;
    });
  }

  const value = { notes, setNotes, setDummyNotes, saveNote, deleteNote };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useNotes = () => useContext(Context);

export { NotesController, useNotes };
