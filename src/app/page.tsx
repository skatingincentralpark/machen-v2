"use client";
import styled from "@emotion/styled";
import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <Main>
      <Header>Machen</Header>
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
`;
