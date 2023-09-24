"use client";
import styled from "@emotion/styled";

export const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.25rem;

  & > button {
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 0.25rem 0.5rem;

    &.active {
      background-color: var(--highlight);
    }
  }
`;
