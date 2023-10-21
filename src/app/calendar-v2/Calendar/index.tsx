"use client";
import styled from "@emotion/styled";
import DayCells from "./DayCells";
import { styleTokens } from "@/lib/style-tokens";
import Header from "../Header";
import WeekdayCells from "./WeekdayCells";
import MonthYearSelector from "./MonthYearBar";
import Sidebar from "./Sidebar";

export default function Calendar() {
  return (
    <>
      <MonthYearSelector />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <Header>
          <WeekdayCells />
        </Header>
        <Wrapper>
          <DayCells />
        </Wrapper>
      </div>
      <Sidebar />
    </>
  );
}

const Wrapper = styled.div`
  height: initial;
  display: flex;
  flex-direction: column;

  ${styleTokens.media.sm} {
    height: 100%;
  }
`;
