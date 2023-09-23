"use client";
import { media } from "@/lib/media-queries";
import styled from "@emotion/styled";

const Notes = () => {
  return <Wrapper>Hello Bebe...</Wrapper>;
};

export default Notes;

const Wrapper = styled.div`
  outline: 1px solid black;
  outline-offset: -0.5px;
  width: 200px;
  grid-column: 9 / 10;
  grid-row: 2 / 3;
  padding: 0.2rem;
  display: none;

  ${media.md} {
    display: block;
  }
`;
