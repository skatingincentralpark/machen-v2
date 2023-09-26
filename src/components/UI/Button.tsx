"use client";
import styled from "@emotion/styled";

type Variant = "primary" | "secondary" | "destructive" | "outline" | "active";

const variants = {
  primary: {
    backgroundColor: "#303030",
    color: "#fff",
    border: "none",
  },
  secondary: {
    backgroundColor: "lightgray",
    color: "#000",
    border: "none",
  },
  destructive: {
    backgroundColor: "var(--destructive)",
    color: "#fff",
    border: "none",
  },
  outline: {
    backgroundColor: "none",
    color: "#000",
    border: "1px solid #ccc",
  },
  active: {
    backgroundColor: "var(--highlight)",
    color: "#000",
    border: "none",
  },
};

interface ButtonProps {
  variant?: Variant;
  active?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  white-space: nowrap;
  background-color: ${({ variant }) =>
    variants[variant || "primary"].backgroundColor};
  color: ${({ variant }) => variants[variant || "primary"].color};
  border: ${({ variant }) => variants[variant || "primary"].border};
`;
