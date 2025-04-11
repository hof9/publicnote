import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Numbers",
  description: "Learn about numbers and their properties",
}

export default function NumbersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 