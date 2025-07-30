import dbConnect from '@/server/lib/mongoose';
import User from '@/server/models/user';
import LoanRequest from '@/server/models/loanRequest';

export async function getDashboardStats() {
  await dbConnect();

  const userCount = await User.countDocuments({isAdmin:false});

  const loanRequestCount = await LoanRequest.countDocuments();

  const totalLoanAmountAgg = await LoanRequest.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$loanAmount' },
      },
    },
  ]);

  const totalLoanAmount = totalLoanAmountAgg[0]?.total || 0;

 const statusCountsAgg = await LoanRequest.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const showStatus = statusCountsAgg.reduce((acc, item)=>{
    acc[item._id] = item.count;
    return acc;
  },
  {
    pending:0, approved:0, rejected: 0
  }
)

  return {
    userCount,
    loanRequestCount,
    totalLoanAmount,
    statusCounts: showStatus,
  };
}
