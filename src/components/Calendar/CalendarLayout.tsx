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
    <>
      <LayoutController>
        <MonthYearSelector />
        <Wrapper>
          <Header>
            <WeekdayCells />
          </Header>
          {children}
        </Wrapper>
        <Sidebar />
      </LayoutController>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
