//* Global CSS
import "./globals.css";
//* Components
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components";

export const metadata = {
  title: "Task Manager",
  description: "Project Task Manager | Generated by Next13",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
