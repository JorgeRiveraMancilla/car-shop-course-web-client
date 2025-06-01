import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/navbar';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import { ReactNode } from 'react';
import { Session } from 'next-auth';
import {
  ErrorBoundaryProvider,
  AuthProvider,
  QueryProvider,
} from '@/providers';

export const metadata: Metadata = {
  title: 'Car Auction - Subastas de Autos',
  description: 'Plataforma de subastas de vehículos en línea',
  keywords: ['subastas', 'autos', 'vehículos', 'carros'],
};

interface RootLayoutProps {
  children: ReactNode;
  session?: Session | null;
}

const RootLayout = ({ children, session }: RootLayoutProps) => {
  return (
    <html lang="es">
      <body>
        <ErrorBoundaryProvider>
          <AuthProvider session={session}>
            <QueryProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />

                <main className="flex-1 container mx-auto px-5 py-10">
                  {children}
                </main>

                <Footer />
              </div>

              <Toaster />
            </QueryProvider>
          </AuthProvider>
        </ErrorBoundaryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
