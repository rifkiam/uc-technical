import type { Metadata } from "next";
// import "./globals.css";

export const metadata: Metadata = {
  title: "CKC Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0f0f17] text-gray-100 antialiased">{children}</div>
  );
}