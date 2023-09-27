"use client";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import HeaderMenu from "@/components/HeaderMenu";
import { media } from "@/lib/media-queries";

const Header = () => {
  const [localeDateTime, setLocaleDateTime] = useState<string>("");

  useEffect(() => {
    const date = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setLocaleDateTime(`${date.toLocaleString()}, ${timezone}`);
  }, []);

  return (
    <>
      <HeaderMain>
        <Logo>
          <div>Machen</div> <TimeWrapper>{localeDateTime}</TimeWrapper>
        </Logo>
        <HeaderMenu />
      </HeaderMain>
    </>
  );
};

export default Header;

const HeaderMain = styled.header`
  position: fixed;
  font-weight: bold;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;

  & > div {
    display: flex;
    gap: 1rem;
  }

  & > button {
    font-weight: 400;
  }
`;
const Logo = styled.div`
  padding: 2rem 0 2rem 2rem;
`;

const TimeWrapper = styled.div`
  font-weight: 400;
  color: #a0a0a0;

  animation: fadeIn 2s ease-in-out;

  max-width: 9rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  ${media.sm} {
    max-width: 100%;
  }
`;
