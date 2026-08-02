import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead workspace | Harborlight Care",
  description: "Internal demonstration workspace for Harborlight Care consultation leads.",
};

export default function LeadsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
