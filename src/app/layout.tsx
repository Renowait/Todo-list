import type { Metadata } from "next";
import {Noto_Sans_Thai} from "next/font/google";
import "./globals.css";
//ใส่ฟอนต์
const Noto = Noto_Sans_Thai({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Todo-List",
  description: "สร้างเพื่อทำการทดสอบเฉยๆ",
  keywords: "NextJs,Thai,Todo-list"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Noto.className}>
        {children}
      </body>
    </html>
  );
}
