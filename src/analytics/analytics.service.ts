import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  getAnalyticsData() {
    return {
      topStats: {
        grossRevenue: {
          value: '৳ 1,245,231',
          trend: '+15.3% from last period',
          isPositive: true,
        },
        totalOrders: {
          value: '3,450',
          trend: '+8.2% from last period',
          isPositive: true,
        },
        conversionRate: {
          value: '3.24%',
          trend: '-0.4% from last period',
          isPositive: false,
        },
        newCustomers: {
          value: '892',
          trend: '+12.5% from last period',
          isPositive: true,
        },
      },
      revenueOverTime: [45, 60, 30, 80, 55, 90, 70, 100, 65, 85, 40, 75],
      salesByCategory: {
        subtitle: 'Custom orders are driving 45% of total revenue this month.',
        categories: [
          { name: 'Custom Apparel', percentage: 45 },
          { name: 'Corporate Packages', percentage: 30 },
          { name: 'Mugs & Bottles', percentage: 15 },
          { name: 'Standard Retail', percentage: 10 },
        ],
      },
    };
  }
}
