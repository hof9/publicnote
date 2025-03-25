"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1">
          <SidebarTrigger className="ml-3 mt-3" />
          <div className="flex-1 overflow-auto p-8 pt-16">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
} 