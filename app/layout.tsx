import Sidebar from "./Components/Sidebar";
import "./globals.css";
import Navbar from "./Components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-blue-100">
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
      </body>
    </html>
  );
}