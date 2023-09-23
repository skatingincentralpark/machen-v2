"use client";
import styled from "@emotion/styled";
import Calendar from "@/components/Calendar";
import { useEffect, useState } from "react";

export default function Home() {
  const [localeDateTime, setLocaleDateTime] = useState<string>("");

  useEffect(() => {
    const date = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setLocaleDateTime(`${date.toLocaleString()}, ${timezone}`);
  }, []);

  return (
    <Main>
      <Header>
        Machen <TimeWrapper>{localeDateTime}</TimeWrapper>
      </Header>
      <Calendar />
    </Main>
  );
}

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 2rem;
`;

const Header = styled.header`
  position: fixed;
  top: 2rem;
  left: 2rem;
  font-weight: bold;
  display: flex;
  gap: 1rem;
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
