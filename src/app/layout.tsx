import Header from "@/components/Old/Header";
import "@/styles/global.css";
// import { Inter } from "next/font/google";
import { NotesController } from "@/context/NotesContext";
import { DateController } from "@/context/DateContext";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
      // className={inter.className}
      >
        <DateController>
          <NotesController>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
              }}
            >
              {children}
            </div>
          </NotesController>
        </DateController>
      </body>
    </html>
  );
}
