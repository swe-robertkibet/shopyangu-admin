import { Inter } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShopYangu Admin",
  description: "Admin panel for ShopYangu e-commerce platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
