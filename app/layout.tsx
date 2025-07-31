'use client';
import { usePathname } from 'next/navigation';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const authPages = ['/Login', '/Login/verifyOTP', '/admin/Login'];
const isAuthPage = authPages.includes(pathname);

  return (
    <html lang="en">
      <body>
        {isAuthPage ? (
          <div className="min-h-screen">{children}</div>
        ) : (
          <div className="flex min-h-screen bg-blue-100 text-black">
            <div className="fixed left-0 top-0 h-full z-10">
              <Sidebar />
            </div>

            <div className="flex flex-col flex-1 pl-64">
              <div className="fixed top-0 right-0 left-64 z-10">
                <Navbar />
              </div>

              <main className="flex-1 pt-16 overflow-y-auto text-black">
                {children}
              </main>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
