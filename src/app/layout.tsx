import Header from "@/components/Old/Header";
import "@/styles/global.css";
// import { Inter } from "next/font/google";
import { NotesController } from "@/context/NotesContext";
import { DateController } from "@/context/DateContext";
import { NotesControllerV2 } from "@/context/NotesContextV2";

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
          <NotesControllerV2>
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
          </NotesControllerV2>
        </DateController>
      </body>
    </html>
  );
}
