import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import QueryInterface from './components/QueryInterface';
import DatabaseStatus from './components/DatabaseStatus';
import Suggestions from './components/Suggestions';
import Analytics from './components/Analytics';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/query" element={<QueryInterface />} />
        <Route path="/database" element={<DatabaseStatus />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Layout>
  );
}

export default App; 