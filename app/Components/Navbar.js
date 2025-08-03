'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Bars3Icon,
  HomeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Avail Loans', href: '/dashboard', icon: CurrencyDollarIcon },
  { name: 'Loan Details', href: '/loandetail', icon: DocumentTextIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
];

const adminItems = [
  { name: 'Admin Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'View Users', href: '/admin/ViewUsers', icon: UserCircleIcon },
  { name: 'View Applications', href: '/admin/ViewApplications', icon: DocumentTextIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsAdminRoute(pathname.startsWith('/admin'));
  }, [pathname]);

  const titleMap = {
    '/profile': 'My Profile',
    '/dashboard': 'Loan Dashboard',
    '/loandetail': 'Loan Details',
    '/admin/ViewApplications': 'All Applications',
    '/admin/ViewUsers': 'All Users',
  };

  const title = titleMap[pathname] || 'Dashboard';

  const logoutAdmin = async () => {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include',
    });
    router.push('/admin/Login');
  };

  const logoutUser = async () => {
   await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include',
    });
    router.push('/dashboard');
  };

  const handleLogout = () => {
    setMenuOpen(false);
    isAdminRoute ? logoutAdmin() : logoutUser();
  };

  const menuItems = isAdminRoute ? adminItems : navItems;

  return (
    <header className="w-full h-16 bg-blue-100 border-b border-gray-200 px-4 sticky top-0 shadow-sm">
      <div className="flex items-center justify-between h-full">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        <div className="relative md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
              <nav className="flex flex-col py-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
                  >
                    <item.icon className="h-4 w-4 text-gray-500" />
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Logout
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
