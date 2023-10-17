"use client";

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface INotesContext {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  currentlocaleDateString: string;
}

const Context = createContext<INotesContext>({
  currentDate: new Date(),
  setCurrentDate: () => {},
  currentlocaleDateString: "",
});

const DateController = ({ children }: { children: ReactNode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentlocaleDateString, setCurrentlocaleDateString] = useState("");

  // Put in useEffect due to toLocaleDateString returning different values depending on region
  useEffect(() => {
    setCurrentlocaleDateString(
      currentDate.toLocaleDateString(undefined, {
        dateStyle: "long",
      })
    );
  }, [currentDate]);

  return (
    <Context.Provider
      value={{ currentDate, setCurrentDate, currentlocaleDateString }}
    >
      {children}
    </Context.Provider>
  );
};

const useDate = () => useContext(Context);

export { DateController, useDate };
