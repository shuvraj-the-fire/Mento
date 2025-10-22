'use client';

import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Header } from '@/components/layout/header';
import { MainNav } from '@/components/layout/main-nav';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <SidebarProvider>
        <div className="min-h-screen">
          <Sidebar variant="inset">
            <MainNav />
          </Sidebar>
          <SidebarInset>
            <Header />
            <main className="px-4 pb-4 pt-8 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
