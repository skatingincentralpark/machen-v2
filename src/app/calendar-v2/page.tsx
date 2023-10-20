"use client";
import { styleTokens } from "@/lib/style-tokens";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("./Calendar"), {
  ssr: false,
  loading: () => <Placeholder>Machen</Placeholder>,
});

const Placeholder = styled.h2`
  font-size: ${styleTokens.size["3xl"]};
  color: ${styleTokens.color.orange};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Page() {
  return <Calendar />;
}
