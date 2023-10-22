"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
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
  toggleSidebar: () => void;
}

const Context = createContext<INotesContext>({
  sidebarOpen: false,
  toggleSidebar: () => {},
});

const LayoutController = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mobile = useMediaQuery("(max-width: 740px)");

  const toggleSidebar = () => {
    if (mobile) setSidebarOpen(false);
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (mobile) setSidebarOpen(false);
  }, [mobile]);

  return (
    <Context.Provider value={{ sidebarOpen, toggleSidebar }}>
      {children}
    </Context.Provider>
  );
};

const useLayout = () => useContext(Context);

export { LayoutController, useLayout };
