"use client";
import styled from "@emotion/styled";
import MonthYearSelector from "./MonthYearBar";
import Sidebar from "./Sidebar";
import Header from "../Header";
import WeekdayCells from "./WeekdayCells";
import { LayoutController } from "@/context/LayoutContext";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutController>
      <Main>
        <MonthYearSelector />
        <Wrapper>
          <Header>
            <WeekdayCells />
          </Header>
          {children}
        </Wrapper>
        <Sidebar />
      </Main>
    </LayoutController>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: row;
  height: 100%;
`;
const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
