"use client";
import {
  HomeIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner';
const navItems = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Avail Loans", href: "/dashboard", icon: CurrencyDollarIcon },
  { name: "Loan Details", href: "/loandetail", icon: DocumentTextIcon },
  { name: "Profile", href: "/profile", icon: UserCircleIcon },
];

const adminItems = [
  { name: "Admin Dashboard", href: "/admin/dashboard", icon: ShieldCheckIcon },
  { name: "View Users", href: "/admin/ViewUsers", icon: UserCircleIcon },
  { name: "View Applications", href: "/admin/ViewApplications", icon: ClipboardDocumentCheckIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  useEffect(() => {
    setIsAdminRoute(pathname.startsWith("/admin"));
  }, [pathname]);

  const logoutAdmin = async () => {
    await fetch('/api/admin/logout', {
        method: "POST",
        credentials: 'include'
    });
    toast.success('Logout Successfully!');
    router.push('/admin/Login')
  };

 const logoutUser = async () => {
    await fetch('/api/users/logout', {
        method: "POST",
        credentials: 'include'
    });
   toast.success('Logout Successfully!');
    router.push('/')
  };

  const handleLogout = () => {
    isAdminRoute ? logoutAdmin() : logoutUser();
  };

  return (
    <>
     <Toaster position="top-center" richColors closeButton className="fixed z-[100]"/>
    <aside className="w-64 h-screen bg-white shadow-sm flex flex-col border-r border-gray-100 fixed left-0 top-0 z-10">
      <div className="h-16 flex items-center justify-center px-6 border-b border-gray-100 shadow-sm">
        <h1 className="text-2xl font-semibold text-blue-600">LoanEase</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
        {(isAdminRoute ? adminItems : navItems).map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.href
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <item.icon
              className={`w-5 h-5 ${
                pathname === item.href ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors w-full text-left"
          type="button"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
    </>
  );
}
