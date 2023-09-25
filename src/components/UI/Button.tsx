"use client";
import styled from "@emotion/styled";

export const Button = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: #fff;
  white-space: nowrap;

  &.active {
    background-color: var(--highlight);
  }
`;
