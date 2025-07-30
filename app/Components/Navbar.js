'use client';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const DynamicVerificationStatus = dynamic(() => import('./VerificationStatus'), {
  ssr: false, 
});

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
    <header className="w-full h-16 bg-white border-b border-gray-200 px-6 sticky top-0 z-50">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>

        <DynamicVerificationStatus />
      </div>
    </header>
  );
}
