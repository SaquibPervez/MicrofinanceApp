import { getDashboardStats } from '../../lib/getDashboardStats';
import {
  UserIcon,
  ClipboardIcon,
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
      icon: <UserIcon className="h-8 w-8 text-white" />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      trend: null,
    },
    {
      label: 'Loan Applications',
      value: loanRequestCount,
      icon: <ClipboardIcon className="h-8 w-8 text-white" />,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      trend: null,
    },
    {
      label: 'Total Loan Amount',
      value: `PKR ${totalLoanAmount.toLocaleString()}`,
      icon: <CurrencyDollarIcon className="h-8 w-8 text-white" />,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      trend: null,
    },
    {
      label: 'Approved',
      value: statusCounts.approved,
      icon: <CheckCircleIcon className="h-8 w-8 text-white" />,
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      trend: 'positive',
    },
    {
      label: 'Pending',
      value: statusCounts.pending,
      icon: <ClockIcon className="h-8 w-8 text-white" />,
      color: 'bg-gradient-to-br from-amber-500 to-amber-600',
      trend: 'neutral',
    },
    {
      label: 'Rejected',
      value: statusCounts.rejected,
      icon: <XCircleIcon className="h-8 w-8 text-white" />,
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      trend: 'negative',
    },
  ];

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Key metrics and statistics at a glance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, trend }) {
  return (
    <div className={`rounded-xl shadow-sm overflow-hidden ${color} text-white`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/90">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`rounded-lg p-3 ${color} bg-white/10`}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center">
            {trend === 'positive' && (
              <>
                <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  12%
                </span>
                <span className="text-xs ml-2">vs last month</span>
              </>
            )}
            {trend === 'negative' && (
              <>
                <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  5%
                </span>
                <span className="text-xs ml-2">vs last month</span>
              </>
            )}
            {trend === 'neutral' && (
              <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                No change
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}