import Header from "@/components/Header";
import "@/styles/global.css";
import { Abel } from "next/font/google";
import { NotesController } from "@/context/NotesContext";
import { DateController } from "@/context/DateContext";

const abel = Abel({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={abel.className}>
        <DateController>
          <NotesController>
            <Header />
            {children}
          </NotesController>
        </DateController>
      </body>
    </html>
  );
}
