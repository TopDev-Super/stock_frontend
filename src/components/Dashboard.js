import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Database, 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Activity
} from 'lucide-react';
import { stockAIApi } from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [systemStatus, setSystemStatus] = useState({
    database: false,
    llm: false,
    overall: 'loading'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSystemStatus();
  }, []);

  const checkSystemStatus = async () => {
    try {
      const health = await stockAIApi.getHealth();
      setSystemStatus({
        database: health.database_connected,
        llm: health.llm_available,
        overall: health.status
      });
    } catch (error) {
      console.error('Failed to check system status:', error);
      setSystemStatus({
        database: false,
        llm: false,
        overall: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status) {
      return <CheckCircle className="h-5 w-5 text-success-500" />;
    }
    return <AlertCircle className="h-5 w-5 text-error-500" />;
  };

  const getStatusText = (status) => {
    return status ? 'Connected' : 'Disconnected';
  };

  const getStatusColor = (status) => {
    return status ? 'text-success-600' : 'text-error-600';
  };

  const quickActions = [
    {
      title: 'Ask AI Question',
      description: 'Query your stock data using natural language',
      icon: Brain,
      href: '/query',
      color: 'bg-primary-500',
      hoverColor: 'hover:bg-primary-600'
    },
    {
      title: 'View Database',
      description: 'Check database connection and table structure',
      icon: Database,
      href: '/database',
      color: 'bg-success-500',
      hoverColor: 'hover:bg-success-600'
    },
    {
      title: 'Get Suggestions',
      description: 'Discover AI-generated question suggestions',
      icon: TrendingUp,
      href: '/suggestions',
      color: 'bg-warning-500',
      hoverColor: 'hover:bg-warning-600'
    },
    {
      title: 'Analytics',
      description: 'View detailed analytics and insights',
      icon: Activity,
      href: '/analytics',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome to the Stock AI Analysis System
          </p>
        </div>
        <button
          onClick={checkSystemStatus}
          className="btn-secondary flex items-center gap-2"
        >
          <Zap className="h-4 w-4" />
          Refresh Status
        </button>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Database</h3>
              <p className={`text-sm font-medium ${getStatusColor(systemStatus.database)}`}>
                {getStatusText(systemStatus.database)}
              </p>
            </div>
            {getStatusIcon(systemStatus.database)}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">AI Service</h3>
              <p className={`text-sm font-medium ${getStatusColor(systemStatus.llm)}`}>
                {getStatusText(systemStatus.llm)}
              </p>
            </div>
            {getStatusIcon(systemStatus.llm)}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Overall Status</h3>
              <p className={`text-sm font-medium ${
                systemStatus.overall === 'healthy' ? 'text-success-600' : 
                systemStatus.overall === 'degraded' ? 'text-warning-600' : 'text-error-600'
              }`}>
                {systemStatus.overall === 'healthy' ? 'Healthy' :
                 systemStatus.overall === 'degraded' ? 'Degraded' : 'Error'}
              </p>
            </div>
            <div className={`h-2 w-2 rounded-full ${
              systemStatus.overall === 'healthy' ? 'bg-success-500' :
              systemStatus.overall === 'degraded' ? 'bg-warning-500' : 'bg-error-500'
            }`}></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.href}
                className="card hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${action.color} ${action.hoverColor} transition-colors duration-200`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors duration-200" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Features Overview */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Brain className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Natural Language Querying</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Ask questions about your stock data in plain English
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Database className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Real-time Database</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Direct connection to your MySQL stock database
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-warning-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">AI-Powered Insights</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Get intelligent explanations of query results
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Advanced Analytics</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Comprehensive analytics and visualization tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 