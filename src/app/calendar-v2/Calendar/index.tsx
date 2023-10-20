"use client";
import styled from "@emotion/styled";
import DayCells from "./DayCells";
import { styleTokens } from "@/lib/style-tokens";

export default function Calendar() {
  return (
    <Wrapper>
      <DayCells />
    </Wrapper>
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
