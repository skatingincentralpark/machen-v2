"use client";

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
}

const Context = createContext<INotesContext>({
  notes: {},
  setNotes: () => {},
  setDummyNotes: () => {},
});

const NotesController = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<NotesData>({});

  const assertIsNotes = (value: unknown): value is NotesData => {
    if (typeof value !== "object" || value === null) return false;
    return true;
  };

  useEffect(() => {
    function getDataFromStorage() {
      // getting stored value
      const machenData = localStorage.getItem("machen-data");
      if (machenData === null) return {};

      const initialValue: unknown = JSON.parse(machenData);

      if (!assertIsNotes(initialValue)) {
        throw new Error("Something went wrong retreiving notes data.");
      }

      return initialValue;
    }

    setNotes(getDataFromStorage());
  }, [setNotes]);

  async function setDummyNotes() {
    const confirmation = confirm(
      "This will overwrite any saved data with dummy data, are you sure?"
    );

    const dummyNotes = await fetch("http://localhost:3000/api/notes");
    const dummyNotesData: unknown = await dummyNotes.json();

    if (!assertIsNotes(dummyNotesData)) {
      throw new Error("The dummy notes data is not valid.");
    }

    if (!!confirmation) {
      setNotes(dummyNotesData);
      localStorage.setItem("machen-data", JSON.stringify(dummyNotesData));
    }
  }

  const value = { notes, setNotes, setDummyNotes };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useNotes = () => useContext(Context);

export { NotesController, useNotes };
