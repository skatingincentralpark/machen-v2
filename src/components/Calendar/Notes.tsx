"use client";
import { useDate } from "@/context/DateContext";
import { media } from "@/lib/media-queries";
import styled from "@emotion/styled";

const Notes = () => {
  const { currentDate } = useDate();

  return (
    <Wrapper>
      <div>
        {currentDate.toLocaleDateString(undefined, {
          dateStyle: "long",
        })}
      </div>
    </Wrapper>
  );
};

export default Notes;

const Wrapper = styled.div`
  outline: 1px solid black;
  outline-offset: -0.5px;
  grid-row: 2 / 3;
  padding: 0.2rem;
  display: none;

  border-radius: 0 0 var(--border-radius) 0;

  ${media.md} {
    display: block;
  }
`;
