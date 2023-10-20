"use client";

import { styleTokens } from "@/lib/style-tokens";
import styled from "@emotion/styled";
import { AlignLeft, Plus, Cookie, Sun } from "lucide-react";

export default function Header({ children }: { children?: React.ReactNode }) {
  const date = new Date("2014-01-01");
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return (
    <StyledHeader>
      <div>
        <Left justify="flex-start">
          <IconButton aria-label="Open Sidebar">
            <AlignLeft />
          </IconButton>
          <DateHeading
            aria-label="Currently selected month and year"
            title="Currently selected month and year"
          >
            {month} <span>{year}</span>
          </DateHeading>
        </Left>

        <FlexBase>
          <Logo />
        </FlexBase>

        <Right justify="flex-end">
          <TextButton
            aria-label="Toggle fortune cookies"
            title="Toggle fortune cookies"
          >
            <span>Fortune Cookies?</span> <Cookie />
          </TextButton>
          <TextButton
            aria-label="Open note for today"
            title="Open note for today"
          >
            <span>Today</span> <Sun />
          </TextButton>
          <IconButton>
            <Plus />
          </IconButton>
        </Right>
      </div>
      {children}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background: ${styleTokens.gradient["white-to-gray"]};
  width: 100%;
  height: fit-content;
  color: ${styleTokens.color.gray["400"]};
  font-weight: bold;

  & > div:first-of-type {
    padding: ${styleTokens.space[3]} ${styleTokens.space[4]};
    display: grid;
    grid-template-columns: 1fr 4rem 1fr;
    align-items: center;
  }
`;
const Logo = styled.div`
  aspect-ratio: 1;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  background-color: ${styleTokens.color["orange"]};
`;
const DateHeading = styled.h3`
  & > span {
    font-weight: normal;
  }
`;

interface FlexProps {
  justify?: string;
}
const FlexBase = styled.div<FlexProps>`
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  gap: 1rem;
  overflow: hidden;
  white-space: nowrap;
`;
const Left = styled(FlexBase)`
  font-size: ${styleTokens.size["lg"]};

  ${styleTokens.media["md"]} {
    font-size: ${styleTokens.size["xl"]};
  }
`;
const Right = styled(FlexBase)`
  font-size: ${styleTokens.size["base"]};
  color: ${styleTokens.color.slate["200"]};

  ${styleTokens.media["md"]} {
    font-size: ${styleTokens.size["lg"]};
  }
`;

const ButtonBase = styled.button`
  display: flex;
  align-items: center;
  gap: ${styleTokens.space[2]};

  &:active {
    color: ${styleTokens.color.orange};
  }
`;
const IconButton = styled(ButtonBase)``;
const TextButton = styled(ButtonBase)`
  overflow: hidden;
  text-overflow: ellipsis;

  & > span {
    display: none;
  }
  & > svg {
    display: block;
  }

  ${styleTokens.media["md"]} {
    & > span {
      display: block;
    }
    & > svg {
      display: none;
    }
  }
`;
