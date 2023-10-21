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
