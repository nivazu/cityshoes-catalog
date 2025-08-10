import React, { useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';

// This component is for debugging the Supabase connection on Vercel.
const SupabaseConnectionDebugger = () => {
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  const runConnectionTest = useCallback(async () => {
    setIsLoading(true);
    setTestResult(null);

    if (!supabaseUrl || !supabaseAnonKey) {
      setTestResult({
        success: false,
        title: 'Missing Environment Variables',
        message: 'One or both of the REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_ANON_KEY variables are not set in the Vercel environment.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      // Attempt to fetch a single row from the 'store_info' table.
      // This is a lightweight query to test the connection and RLS policies.
      const { data, error } = await supabase
        .from('store_info')
        .select('name')
        .limit(1);

      if (error) {
        // Handle specific Supabase errors
        throw error;
      }

      if (data) {
        setTestResult({
          success: true,
          title: 'Connection Successful!',
          message: `Successfully connected to Supabase and fetched data. Store name: ${data[0]?.name || 'Unknown'}`,
        });
      } else {
         setTestResult({
          success: false,
          title: 'Data Fetch Failed',
          message: 'Connected to Supabase, but failed to fetch data. This might be an RLS (Row Level Security) issue or the table is empty.',
        });
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setTestResult({
        success: false,
        title: `Error: ${error.name || 'Fetch Error'}`,
        message: error.message || 'An unknown error occurred. This is often a CORS issue or incorrect URL/Key. Please double-check your Vercel environment variables and Supabase CORS settings.',
        details: error.stack,
      });
    } finally {
      setIsLoading(false);
    }
  }, [supabaseUrl, supabaseAnonKey]);

  const renderResult = () => {
    if (!testResult) return null;

    if (testResult.success) {
      return (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <div className="flex items-start">
            <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-bold">{testResult.title}</h3>
              <p className="text-sm">{testResult.message}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-bold">{testResult.title}</h3>
            <p className="text-sm">{testResult.message}</p>
            {testResult.details && (
              <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-x-auto">
                {testResult.details}
              </pre>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4" dir="ltr">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Supabase Connection Debugger</h1>
        <p className="text-gray-600 mb-6">This tool checks if the app can connect to your Supabase project using the environment variables provided by Vercel.</p>

        <div className="space-y-4 text-sm">
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="font-semibold text-gray-700 block mb-1">REACT_APP_SUPABASE_URL:</label>
            <div className="w-full bg-gray-200 p-2 rounded break-words font-mono text-xs">
              {supabaseUrl || <span className="text-red-500">Not Set</span>}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="font-semibold text-gray-700 block mb-1">REACT_APP_SUPABASE_ANON_KEY:</label>
            <div className="w-full bg-gray-200 p-2 rounded break-words font-mono text-xs">
              {supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...${supabaseAnonKey.substring(supabaseAnonKey.length - 10)}` : <span className="text-red-500">Not Set</span>}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={runConnectionTest}
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Testing...
              </>
            ) : (
              <>
                <Wifi className="w-5 h-5 mr-2" />
                Run Connection Test
              </>
            )}
          </button>
        </div>

        {renderResult()}
      </div>
    </div>
  );
};

export default SupabaseConnectionDebugger;

