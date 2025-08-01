import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  RefreshCw, 
  Copy, 
  ArrowRight,
  Brain,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { stockAIApi } from '../services/api';
import toast from 'react-hot-toast';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const response = await stockAIApi.getSuggestions();
      if (response.status === 'success') {
        setSuggestions(response.suggestions || []);
        toast.success('Suggestions loaded successfully!');
      } else {
        toast.error(response.error_message || 'Failed to load suggestions');
      }
    } catch (error) {
      console.error('Failed to load suggestions:', error);
      toast.error('Failed to load suggestions');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
  };

  const getSuggestionCategory = (suggestion) => {
    const lowerSuggestion = suggestion.toLowerCase();
    
    if (lowerSuggestion.includes('price') || lowerSuggestion.includes('moving average')) {
      return { name: 'Price Analysis', color: 'bg-primary-100 text-primary-800', icon: TrendingUp };
    }
    if (lowerSuggestion.includes('volume') || lowerSuggestion.includes('turnover')) {
      return { name: 'Volume Analysis', color: 'bg-success-100 text-success-800', icon: TrendingUp };
    }
    if (lowerSuggestion.includes('earnings') || lowerSuggestion.includes('financial')) {
      return { name: 'Financial Events', color: 'bg-warning-100 text-warning-800', icon: Sparkles };
    }
    if (lowerSuggestion.includes('trend') || lowerSuggestion.includes('increase')) {
      return { name: 'Trend Analysis', color: 'bg-purple-100 text-purple-800', icon: TrendingUp };
    }
    
    return { name: 'General', color: 'bg-gray-100 text-gray-800', icon: Brain };
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
          <h1 className="text-3xl font-bold text-gray-900">AI Suggestions</h1>
          <p className="mt-2 text-gray-600">
            Discover AI-generated questions based on your database schema
          </p>
        </div>
        <button
          onClick={loadSuggestions}
          className="btn-secondary flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Suggestions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion, index) => {
          const category = getSuggestionCategory(suggestion);
          const Icon = category.icon;
          
          return (
            <div
              key={index}
              className="card hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary-600" />
                  <span className={`px-2 py-1 text-xs rounded-full ${category.color}`}>
                    {category.name}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(suggestion);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 btn-secondary p-1"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                {suggestion}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Suggestion #{index + 1}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors duration-200" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Suggestion Detail */}
      {selectedSuggestion && (
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary-600" />
              <h3 className="text-lg font-medium text-primary-900">Selected Suggestion</h3>
            </div>
            <button
              onClick={() => copyToClipboard(selectedSuggestion)}
              className="btn-secondary flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
          </div>
          
          <p className="text-primary-800 mb-4">{selectedSuggestion}</p>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                window.location.href = `/query?question=${encodeURIComponent(selectedSuggestion)}`;
              }}
              className="btn-primary flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              Use This Question
            </button>
            <button
              onClick={() => setSelectedSuggestion(null)}
              className="btn-secondary"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="card bg-warning-50 border-warning-200">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-5 w-5 text-warning-600" />
          <h3 className="text-lg font-medium text-warning-900">How AI Suggestions Work</h3>
        </div>
        <div className="space-y-2 text-sm text-warning-800">
          <p>• Suggestions are generated based on your database schema</p>
          <p>• The AI analyzes your table structure and field names</p>
          <p>• Questions are tailored to your specific stock data</p>
          <p>• Click any suggestion to use it in the query interface</p>
          <p>• Suggestions are refreshed automatically when database changes</p>
        </div>
      </div>
    </div>
  );
};

export default Suggestions; 