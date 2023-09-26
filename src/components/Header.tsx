"use client";
import { useNotes } from "@/context/NotesContext";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Header = () => {
  const [localeDateTime, setLocaleDateTime] = useState<string>("");

  useEffect(() => {
    const date = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setLocaleDateTime(`${date.toLocaleString()}, ${timezone}`);
  }, []);

  const { setDummyNotes } = useNotes();

  return (
    <>
      <HeaderEle>
        <div>
          Machen <TimeWrapper>{localeDateTime}</TimeWrapper>{" "}
        </div>
        <button onClick={setDummyNotes}>Set dummy notes for testing</button>
      </HeaderEle>
    </>
  );
};

export default Header;

const HeaderEle = styled.header`
  position: fixed;
  padding: 2rem;
  font-weight: bold;
  display: flex;
  gap: 1rem;
  z-index: 10;
  justify-content: space-between;
  width: 100%;

  & > div {
    display: flex;
    gap: 1rem;
  }

  & > button {
    font-weight: 400;
  }
`;

const TimeWrapper = styled.div`
  font-weight: 400;
  color: #a0a0a0;

  animation: fadeIn 2s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
