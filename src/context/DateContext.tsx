"use client";

import { format } from "date-fns";
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
  currentlocaleDateString: string;
  shortDateString: string;
  medDateString: string;
}

const Context = createContext<INotesContext>({
  currentDate: new Date(),
  setCurrentDate: () => {},
  currentlocaleDateString: "",
  shortDateString: "",
  medDateString: "",
});

const DateController = ({ children }: { children: ReactNode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const shortDateString = format(currentDate, "MMMM yyyy");
  const medDateString = format(currentDate, "d MMMM yyyy");
  const currentlocaleDateString = currentDate.toLocaleDateString(undefined, {
    dateStyle: "long",
  });

  return (
    <Context.Provider
      value={{
        currentDate,
        setCurrentDate,
        currentlocaleDateString,
        shortDateString,
        medDateString,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useDate = () => useContext(Context);

export { DateController, useDate };
