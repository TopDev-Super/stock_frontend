import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Table,
  Info,
  Server
} from 'lucide-react';
import { stockAIApi } from '../services/api';
import toast from 'react-hot-toast';

const DatabaseStatus = () => {
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDatabaseStatus();
  }, []);

  const loadDatabaseStatus = async () => {
    setLoading(true);
    try {
      const response = await stockAIApi.getDatabaseStatus();
      setDbStatus(response);
    } catch (error) {
      console.error('Failed to load database status:', error);
      toast.error('Failed to load database status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'connected') {
      return <CheckCircle className="h-6 w-6 text-success-500" />;
    }
    return <AlertCircle className="h-6 w-6 text-error-500" />;
  };

  const getStatusColor = (status) => {
    return status === 'connected' ? 'text-success-600' : 'text-error-600';
  };

  const getStatusText = (status) => {
    return status === 'connected' ? 'Connected' : 'Disconnected';
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Database Status</h1>
          <p className="mt-2 text-gray-600">
            Monitor database connection and table structure
          </p>
        </div>
        <button
          onClick={loadDatabaseStatus}
          className="btn-secondary flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Connection Status */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Database className="h-8 w-8 text-primary-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Connection Status</h2>
              <p className="text-sm text-gray-600">MySQL Database</p>
            </div>
          </div>
          {getStatusIcon(dbStatus?.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`text-sm font-medium ${getStatusColor(dbStatus?.status)}`}>
                {getStatusText(dbStatus?.status)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Database:</span>
              <span className="text-sm font-medium text-gray-900">
                {dbStatus?.database || 'N/A'}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tables:</span>
              <span className="text-sm font-medium text-gray-900">
                {dbStatus?.tables ? Object.keys(dbStatus.tables).length : 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Check:</span>
              <span className="text-sm font-medium text-gray-900">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {dbStatus?.status === 'error' && (
          <div className="mt-4 p-4 bg-error-50 border border-error-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-error-600" />
              <h3 className="text-sm font-medium text-error-900">Connection Error</h3>
            </div>
            <p className="text-sm text-error-700">{dbStatus.message}</p>
          </div>
        )}
      </div>

      {/* Table Information */}
      {dbStatus?.tables && Object.keys(dbStatus.tables).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Table className="h-6 w-6 text-primary-600" />
            Database Tables
          </h2>
          
          {Object.entries(dbStatus.tables).map(([tableName, columns]) => (
            <div key={tableName} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-success-600" />
                  <h3 className="text-lg font-medium text-gray-900">{tableName}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {columns.length} columns
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Field
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Null
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Key
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Default
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {columns.map((column, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {column.field}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {column.type}
                          </code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            column.null === 'NO' 
                              ? 'bg-error-100 text-error-800' 
                              : 'bg-success-100 text-success-800'
                          }`}>
                            {column.null}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {column.key === 'PRI' && (
                            <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                              Primary Key
                            </span>
                          )}
                          {column.key === 'MUL' && (
                            <span className="px-2 py-1 bg-warning-100 text-warning-800 text-xs rounded-full">
                              Index
                            </span>
                          )}
                          {!column.key && (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {column.default || 'NULL'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Database Info */}
      <div className="card bg-primary-50 border-primary-200">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-medium text-primary-900">Database Information</h3>
        </div>
        <div className="space-y-2 text-sm text-primary-800">
          <p>• This system connects to your MySQL database named <strong>{dbStatus?.database || 'stock'}</strong></p>
          <p>• The database contains stock market data with various fields and metrics</p>
          <p>• Tables are automatically discovered and used for AI query generation</p>
          <p>• Connection status is monitored in real-time</p>
        </div>
      </div>
    </div>
  );
};

export default DatabaseStatus; 