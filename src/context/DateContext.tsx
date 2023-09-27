"use client";

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface INotesContext {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
}

const Context = createContext<INotesContext>({
  currentDate: new Date(),
  setCurrentDate: () => {},
});

const DateController = ({ children }: { children: ReactNode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <Context.Provider value={{ currentDate, setCurrentDate }}>
      {children}
    </Context.Provider>
  );
};

const useDate = () => useContext(Context);

export { DateController, useDate };
