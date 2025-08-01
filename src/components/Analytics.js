import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Activity,
  Calendar,
  Target,
  PieChart
} from 'lucide-react';

const Analytics = () => {
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const mockData = {
    totalStocks: 1250,
    activeQueries: 45,
    avgResponseTime: 2.3,
    successRate: 98.5,
    topQueries: [
      { question: "Which stocks have price above moving average?", count: 15 },
      { question: "Show stocks with highest volume", count: 12 },
      { question: "Find stocks with positive price change", count: 10 },
      { question: "Which stocks have earnings announcements?", count: 8 },
      { question: "Show top performing stocks", count: 6 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Monitor system performance and query analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Stocks</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.totalStocks.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Target className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Queries</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.activeQueries}</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <Activity className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.avgResponseTime}s</p>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.successRate}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <PieChart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Queries Chart */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-medium text-gray-900">Top Queries</h3>
          </div>
          <div className="space-y-3">
            {mockData.topQueries.map((query, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{query.question}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${(query.count / 15) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">
                    {query.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Performance */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-success-600" />
            <h3 className="text-lg font-medium text-gray-900">System Performance</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Database Connection</span>
                <span className="text-success-600 font-medium">Connected</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success-600 h-2 rounded-full w-full"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">AI Service</span>
                <span className="text-success-600 font-medium">Available</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success-600 h-2 rounded-full w-full"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Query Processing</span>
                <span className="text-warning-600 font-medium">2.3s avg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-warning-600 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Query processed successfully</p>
              <p className="text-xs text-gray-500">"Which stocks have price above moving average 50?"</p>
            </div>
            <span className="text-xs text-gray-500">2 min ago</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Database connection refreshed</p>
              <p className="text-xs text-gray-500">All tables accessible</p>
            </div>
            <span className="text-xs text-gray-500">5 min ago</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">AI suggestions updated</p>
              <p className="text-xs text-gray-500">5 new suggestions generated</p>
            </div>
            <span className="text-xs text-gray-500">10 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 