import { getDashboardStats } from '../../lib/getDashboardStats';
import {
  UserIcon,
  ClipboardIcon ,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

export default async function AdminDashboardPage() {
  const {
    userCount,
    loanRequestCount,
    totalLoanAmount,
    statusCounts,
  } = await getDashboardStats();

  const stats = [
    {
      label: 'Total Users',
      value: userCount,
      icon: <UserIcon className="h-6 w-6 text-blue-600" />,
      color: 'bg-blue-50',
    },
    {
      label: 'Loan Applications',
      value: loanRequestCount,
      icon: <ClipboardIcon className="h-6 w-6 text-indigo-600" />,
      color: 'bg-indigo-50',
    },
    {
      label: 'Total Loan Amount',
      value: `PKR ${totalLoanAmount.toLocaleString()}`,
      icon: <CurrencyDollarIcon className="h-6 w-6 text-green-600" />,
      color: 'bg-green-50',
    },
    {
      label: 'Approved Applications',
      value: statusCounts.approved,
      icon: <CheckCircleIcon className="h-6 w-6 text-emerald-600" />,
      color: 'bg-emerald-50',
    },
    {
      label: 'Pending Applications',
      value: statusCounts.pending,
      icon: <ClockIcon className="h-6 w-6 text-yellow-600" />,
      color: 'bg-yellow-50',
    },
    {
      label: 'Rejected Applications',
      value: statusCounts.rejected,
      icon: <XCircleIcon className="h-6 w-6 text-red-600" />,
      color: 'bg-red-50',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div
      className={`p-5 rounded-lg shadow border border-gray-200 flex items-center gap-4 transition hover:shadow-md ${color}`}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
