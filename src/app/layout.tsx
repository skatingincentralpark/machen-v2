import "@/styles/global.css";
import { DateController } from "@/context/DateContext";
import { NotesController } from "@/context/NotesContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DateController>
          <NotesController>{children}</NotesController>
        </DateController>
      </body>
    </html>
  );
}
