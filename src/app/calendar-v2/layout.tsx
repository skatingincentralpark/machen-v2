"use client";
import WeekdayCells from "./Calendar/WeekdayCells";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header>
        <WeekdayCells />
      </Header>
      {children}
    </>
  );
}
