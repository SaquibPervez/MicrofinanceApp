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
      <body className={isAuthPage ? '' : 'bg-gray-50 '}>
        {isAuthPage ? (
          <div className="min-h-screen ">{children}</div>
        ) : (
          <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-gray-100">
            <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-gradient-to-br from-blue-50 to-gray-100">
              <Navbar />
            </div>

            <div className="hidden md:block fixed left-0 top-0 h-full z-10 w-64 bg-gradient-to-br from-blue-50 to-gray-100">
              <Sidebar />
            </div>

            <div className="flex-1 md:ml-64 pt-16 md:pt-0">
              <div className="hidden md:block fixed top-0 right-0 left-64 z-10 bg-gradient-to-br from-blue-50 to-gray-100">
                <Navbar />
              </div>

              <main className="min-h-[calc(100vh-64px)] mt-15 text-black bg-gradient-to-br from-blue-50 to-gray-100">
                {children}
              </main>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}