'use client';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

export default function Navbar() {
  const pathname = usePathname();

  const title =
    {
      '/profile': 'My Profile',
      '/dashboard': 'Loan Dashboard',
      '/loandetail': 'Loan Details',
      '/admin/ViewApplications': 'All Applications',
      '/admin/ViewUsers': 'All Users',
    }[pathname] || 'Dashboard';

  return (
    <>
    <header className="w-full h-16 bg-white border-b border-gray-200 px-6 sticky top-0 z-50">
      <div className="flex items-center justify-between h-full mx-auto">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <div className='flex gap-10'>
        {/* <Link href = '/Login'>
        <button className='bg-teal-600 text-white py-1 px-3 rounded-md flex gap-2 cursor-pointer'>
          Register
        </button>
        </Link> */}
        </div>
      </div>
    </header>
    </>
  );
}
