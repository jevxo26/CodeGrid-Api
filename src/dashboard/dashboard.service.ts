import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getDashboardData() {
    return {
      totalRevenue: {
        value: '$45,231.89',
        percentageChange: '+20.1% from last month',
      },
      subscriptions: {
        value: '+2350',
        percentageChange: '+180.1% from last month',
      },
      sales: {
        value: '+12,234',
        percentageChange: '+19% from last month',
      },
      activeNow: {
        value: '+573',
        percentageChange: '+201 since last hour',
      },
      chartData: [
        { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
        { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
        { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
        { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
        { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
        { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
        { name: 'Jul', total: Math.floor(Math.random() * 5000) + 1000 },
        { name: 'Aug', total: Math.floor(Math.random() * 5000) + 1000 },
        { name: 'Sep', total: Math.floor(Math.random() * 5000) + 1000 },
        { name: 'Oct', total: Math.floor(Math.random() * 5000) + 1000 },
        { name: 'Nov', total: Math.floor(Math.random() * 5000) + 1000 },
        { name: 'Dec', total: Math.floor(Math.random() * 5000) + 1000 },
      ],
      recentSales: [
        {
          id: 1,
          name: 'User 1',
          email: 'user1@example.com',
          amount: '+$1,999.00',
        },
        {
          id: 2,
          name: 'User 2',
          email: 'user2@example.com',
          amount: '+$1,999.00',
        },
        {
          id: 3,
          name: 'User 3',
          email: 'user3@example.com',
          amount: '+$1,999.00',
        },
        {
          id: 4,
          name: 'User 4',
          email: 'user4@example.com',
          amount: '+$1,999.00',
        },
        {
          id: 5,
          name: 'User 5',
          email: 'user5@example.com',
          amount: '+$1,999.00',
        },
      ],
    };
  }
}
