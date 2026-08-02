import type { Metadata } from "next";

import "./tailwind.css";

export const metadata: Metadata = {
  title: "Harborlight Care | Support at home",
  description:
    "Thoughtful in-home support for older adults and the families who care for them.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth motion-reduce:scroll-auto">
      <body className="m-0 bg-[#f7f3ea] text-base leading-[1.6] text-[#173b34] [font-family:Arial,Helvetica,sans-serif] [&_:focus-visible]:outline-[3px] [&_:focus-visible]:outline-offset-[3px] [&_:focus-visible]:outline-[#28685b]">
        {children}
      </body>
    </html>
  );
}
