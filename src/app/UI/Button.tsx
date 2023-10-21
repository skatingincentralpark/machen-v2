"use client";

import { styleTokens } from "@/lib/style-tokens";
import styled from "@emotion/styled";

export const ButtonBase = styled.button`
  display: flex;
  align-items: center;
  gap: ${styleTokens.space[2]};

  &:active {
    color: ${styleTokens.color.orange};
  }
`;
export const ButtonBaseMonthYear = styled.button`
  color: ${styleTokens.color.gray[400]};
  background-color: ${styleTokens.color.gray[100]};
  font-weight: bold;
  height: 100%;

  &:active {
    background-color: ${styleTokens.color.gray[300]};
  }
`;
