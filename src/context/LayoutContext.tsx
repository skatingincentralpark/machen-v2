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
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext<INotesContext>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
});

const LayoutController = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Context.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </Context.Provider>
  );
};

const useLayout = () => useContext(Context);

export { LayoutController, useLayout };
