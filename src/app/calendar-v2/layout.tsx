"use client";
import MonthYearSelector from "./Calendar/MonthYearBar";
import WeekdayCells from "./Calendar/WeekdayCells";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
