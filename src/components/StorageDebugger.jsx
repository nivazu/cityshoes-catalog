import React, { useState } from 'react';
import StorageTestService from '../services/storageTest';
import { AlertCircle, CheckCircle, X, Loader } from 'lucide-react';

const StorageDebugger = ({ onClose }) => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState(null);
  
  const runTests = async () => {
    setTesting(true);
    try {
      const testResults = await StorageTestService.runAllTests();
      setResults(testResults);
    } catch (error) {
      console.error('Test error:', error);
      setResults({ error: error.message });
    } finally {
      setTesting(false);
    }
  };
  
  const TestResult = ({ name, result }) => {
    if (!result) return null;
    
    const success = result.success;
    const Icon = success ? CheckCircle : AlertCircle;
    const color = success ? 'text-green-600' : 'text-red-600';
    
    return (
      <div className={`p-4 rounded-lg border ${success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 ${color} mt-0.5`} />
          <div className="flex-1">
            <h4 className={`font-medium ${color}`}>{name}</h4>
            {result.error && (
              <p className="text-sm text-red-600 mt-1">שגיאה: {result.error}</p>
            )}
            {result.buckets && (
              <p className="text-sm text-gray-600 mt-1">
                Buckets נמצאו: {result.buckets.map(b => b.name).join(', ') || 'אין'}
              </p>
            )}
            {result.exists !== undefined && (
              <p className="text-sm text-gray-600 mt-1">
                Bucket קיים: {result.exists ? 'כן' : 'לא'}
              </p>
            )}
            {result.publicUrl && (
              <p className="text-sm text-gray-600 mt-1 break-all">
                URL ציבורי: {result.publicUrl}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">בדיקת Supabase Storage</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {!results && !testing && (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">לחץ כדי להריץ בדיקות אבחון מקיפות</p>
            <button
              onClick={runTests}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              הרץ בדיקות
            </button>
          </div>
        )}
        
        {testing && (
          <div className="text-center py-8">
            <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">מריץ בדיקות...</p>
          </div>
        )}
        
        {results && (
          <div className="space-y-4">
            <TestResult name="חיבור ל-Supabase" result={results.connection} />
            <TestResult name="קיום Bucket" result={results.bucketExists} />
            <TestResult name="הרשאות" result={results.permissions} />
            <TestResult name="העלאת קבצים" result={results.upload} />
            <TestResult name="גישה ציבורית" result={results.publicAccess} />
            
            {results.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">שגיאה כללית: {results.error}</p>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">פתרונות אפשריים:</h4>
              <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                <li>וודא שה-bucket 'product-images' קיים ב-Supabase</li>
                <li>בדוק שההרשאות מוגדרות נכון (public bucket)</li>
                <li>הרץ את הסקריפט create-storage-bucket.sql ב-SQL Editor</li>
                <li>וודא שמשתני הסביבה מוגדרים נכון</li>
              </ol>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={runTests}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                הרץ שוב
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                סגור
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorageDebugger;