import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const poppins = Poppins({
  variable: "--font-sans-raw",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Rafael Palacios López — Diseñador gráfico",
  description:
    "Portfolio de Rafael Palacios López, diseñador gráfico en Zaragoza. Branding, diseño editorial, fotografía e inteligencia artificial.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
