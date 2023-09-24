"use client";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Header = () => {
  const [localeDateTime, setLocaleDateTime] = useState<string>("");

  useEffect(() => {
    const date = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setLocaleDateTime(`${date.toLocaleString()}, ${timezone}`);
  }, []);

  return (
    <HeaderEle>
      Machen <TimeWrapper>{localeDateTime}</TimeWrapper>
    </HeaderEle>
  );
};

export default Header;

const HeaderEle = styled.header`
  position: fixed;
  top: 2rem;
  left: 2rem;
  font-weight: bold;
  display: flex;
  gap: 1rem;
  z-index: 10;
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
