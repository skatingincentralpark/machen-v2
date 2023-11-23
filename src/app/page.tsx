"use client";
import styled from "@emotion/styled";
import Calendar from "@/components/Calendar";
import { media } from "@/lib/media-queries";

export default function Home() {
  return (
    <Main>
      <Calendar />
    </Main>
  );
}

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 1rem 1rem 5rem 1rem;

  ${media.sm} {
    padding: 2rem;
  }
`;
