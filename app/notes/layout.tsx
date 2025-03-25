import "./globals.css"
import ClientLayout from "./client-layout"

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <ClientLayout>{children}</ClientLayout>
    </div>
  )
}
