"use client";
import { media } from "@/lib/media-queries";
import styled from "@emotion/styled";

interface Props {
  currentDate: Date;
}

const Notes = ({ currentDate }: Props) => {
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

  ${media.md} {
    display: block;
  }
`;
