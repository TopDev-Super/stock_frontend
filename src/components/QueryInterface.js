import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Brain, 
  Database, 
  FileText, 
  TrendingUp,
  Copy,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { stockAIApi } from '../services/api';
import toast from 'react-hot-toast';

const QueryInterface = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [examples, setExamples] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    loadExamples();
    loadSuggestions();
  }, []);

  const loadExamples = async () => {
    try {
      const response = await stockAIApi.getExamples();
      setExamples(response.examples || []);
    } catch (error) {
      console.error('Failed to load examples:', error);
    }
  };

  const loadSuggestions = async () => {
    try {
      const response = await stockAIApi.getSuggestions();
      if (response.status === 'success') {
        setSuggestions(response.suggestions || []);
      }
    } catch (error) {
      console.error('Failed to load suggestions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }

    setLoading(true);
    try {
      const response = await stockAIApi.processQuery(question);
      
      if (response.status === 'success') {
        setResults(response);
        toast.success('Query processed successfully!');
      } else {
        toast.error(response.error_message || 'Failed to process query');
      }
    } catch (error) {
      console.error('Query error:', error);
      toast.error('Failed to process query. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example) => {
    setQuestion(example);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuestion(suggestion);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const formatResults = (data) => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map((row, index) => {
      const formattedRow = {};
      Object.entries(row).forEach(([key, value]) => {
        // Format numbers
        if (typeof value === 'number') {
          if (key.toLowerCase().includes('price')) {
            formattedRow[key] = `$${value.toFixed(2)}`;
          } else if (key.toLowerCase().includes('percent') || key.toLowerCase().includes('change')) {
            formattedRow[key] = `${value.toFixed(2)}%`;
          } else {
            formattedRow[key] = value.toLocaleString();
          }
        } else if (value === null || value === undefined) {
          formattedRow[key] = 'N/A';
        } else {
          formattedRow[key] = value;
        }
      });
      return { id: index, ...formattedRow };
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Query Interface</h1>
        <p className="mt-2 text-gray-600">
          Ask questions about your stock data using natural language
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Query Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                  Ask your question
                </label>
                <div className="relative">
                  <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g., Which stocks have a price above the moving average 50?"
                    className="input-field min-h-[120px] resize-none"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !question.trim()}
                    className="absolute bottom-3 right-3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Results */}
          {results && (
            <div className="space-y-4">
              {/* Explanation */}
              {results.explanation && (
                <div className="card">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="h-5 w-5 text-primary-600" />
                    <h3 className="text-lg font-medium text-gray-900">AI Explanation</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{results.explanation}</p>
                </div>
              )}

              {/* SQL Query */}
              {results.sql_query && (
                <div className="card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-success-600" />
                      <h3 className="text-lg font-medium text-gray-900">Generated SQL</h3>
                    </div>
                    <button
                      onClick={() => copyToClipboard(results.sql_query)}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </button>
                  </div>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    {results.sql_query}
                  </div>
                </div>
              )}

              {/* Results Table */}
              {results.results && results.results.length > 0 && (
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-warning-600" />
                      <h3 className="text-lg font-medium text-gray-900">
                        Results ({results.row_count} rows)
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4" />
                      Query successful
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {Object.keys(results.results[0] || {}).map((header) => (
                            <th
                              key={header}
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {header.replace(/_/g, ' ')}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formatResults(results.results).map((row) => (
                          <tr key={row.id} className="hover:bg-gray-50">
                            {Object.values(row).map((value, index) => (
                              <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Error State */}
              {results.status === 'error' && (
                <div className="card border-error-200 bg-error-50">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-5 w-5 text-error-600" />
                    <h3 className="text-lg font-medium text-error-900">Error</h3>
                  </div>
                  <p className="text-error-700">{results.error_message}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Examples */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-medium text-gray-900">Example Questions</h3>
            </div>
            <div className="space-y-2">
              {examples.slice(0, 5).map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200 text-sm text-gray-700"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-warning-600" />
              <h3 className="text-lg font-medium text-gray-900">AI Suggestions</h3>
            </div>
            <div className="space-y-2">
              {suggestions.slice(0, 5).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-warning-300 hover:bg-warning-50 transition-colors duration-200 text-sm text-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="card bg-primary-50 border-primary-200">
            <h3 className="text-lg font-medium text-primary-900 mb-2">💡 Tips</h3>
            <ul className="space-y-2 text-sm text-primary-800">
              <li>• Be specific with your questions</li>
              <li>• Include time periods when relevant</li>
              <li>• Use natural language like "show me" or "find"</li>
              <li>• Mention specific stock names or criteria</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryInterface; 