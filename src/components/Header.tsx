"use client";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import HeaderMenu from "@/components/HeaderMenu";

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
          Machen <TimeWrapper>{localeDateTime}</TimeWrapper>{" "}
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
  z-index: 10;
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
  padding: 2rem;
`;

const TimeWrapper = styled.div`
  font-weight: 400;
  color: #a0a0a0;

  animation: fadeIn 2s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
