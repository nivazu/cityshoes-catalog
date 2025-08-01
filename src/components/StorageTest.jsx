import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Upload } from 'lucide-react';
import ImageService from '../services/imageService';

const StorageTest = () => {
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadTest, setUploadTest] = useState(null);

  const runStorageTest = async () => {
    setLoading(true);
    try {
      const result = await ImageService.testConnection();
      setTestResults(result);
    } catch (error) {
      setTestResults({
        connected: false,
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const testImageUpload = async () => {
    // Create a test image blob
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    // Draw a simple test pattern
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(0, 0, 50, 50);
    ctx.fillStyle = '#4ecdc4';
    ctx.fillRect(50, 0, 50, 50);
    ctx.fillStyle = '#45b7d1';
    ctx.fillRect(0, 50, 50, 50);
    ctx.fillStyle = '#f9ca24';
    ctx.fillRect(50, 50, 50, 50);

    // Convert to blob
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const testFile = new File([blob], 'test-image.png', { type: 'image/png' });
      
      setLoading(true);
      try {
        const result = await ImageService.uploadImage(testFile, 'test');
        setUploadTest({
          success: true,
          url: result.url,
          path: result.path
        });
      } catch (error) {
        setUploadTest({
          success: false,
          error: error.message
        });
      } finally {
        setLoading(false);
      }
    }, 'image/png');
  };

  useEffect(() => {
    runStorageTest();
  }, []);

  const StatusIcon = ({ status }) => {
    if (loading) return <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />;
    if (status === true) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === false) return <XCircle className="w-5 h-5 text-red-500" />;
    return <AlertCircle className="w-5 h-5 text-yellow-500" />;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200">
      <h3 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
        <Upload className="w-6 h-6" />
        בדיקת מערכת העלאת תמונות
      </h3>

      <div className="space-y-4">
        {/* Storage Connection Test */}
        <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
          <div>
            <h4 className="font-semibold text-stone-700">חיבור ל-Supabase Storage</h4>
            <p className="text-sm text-stone-500">
              בדיקת חיבור לשירות האחסון של Supabase
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon status={testResults?.connected} />
            <span className="text-sm font-medium">
              {loading ? 'בודק...' : 
               testResults?.connected ? 'מחובר' : 'שגיאה בחיבור'}
            </span>
          </div>
        </div>

        {/* Bucket Existence Test */}
        {testResults && (
          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
            <div>
              <h4 className="font-semibold text-stone-700">bucket קיים</h4>
              <p className="text-sm text-stone-500">
                בדיקת קיום bucket בשם 'product-images'
              </p>
            </div>
            <div className="flex items-center gap-2">
              <StatusIcon status={testResults.bucketExists} />
              <span className="text-sm font-medium">
                {testResults.bucketExists ? 'קיים' : 'לא קיים'}
              </span>
            </div>
          </div>
        )}

        {/* Available Buckets */}
        {testResults?.buckets && (
          <div className="p-4 bg-stone-50 rounded-lg">
            <h4 className="font-semibold text-stone-700 mb-2">Buckets זמינים:</h4>
            <div className="flex flex-wrap gap-2">
              {testResults.buckets.map((bucket, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    bucket === 'product-images' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {bucket}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Upload Test */}
        <div className="p-4 bg-stone-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-stone-700">בדיקת העלאת תמונה</h4>
              <p className="text-sm text-stone-500">
                יצירה והעלאה של תמונת בדיקה
              </p>
            </div>
            <button
              onClick={testImageUpload}
              disabled={loading || !testResults?.bucketExists}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'מעלה...' : 'בדוק העלאה'}
            </button>
          </div>

          {uploadTest && (
            <div className={`p-3 rounded border ${
              uploadTest.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <StatusIcon status={uploadTest.success} />
                <span className="font-medium">
                  {uploadTest.success ? 'העלאה הצליחה!' : 'העלאה נכשלה'}
                </span>
              </div>
              
              {uploadTest.success ? (
                <div className="space-y-2">
                  <p className="text-sm text-green-700">
                    <strong>URL:</strong> {uploadTest.url}
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Path:</strong> {uploadTest.path}
                  </p>
                  <img 
                    src={uploadTest.url} 
                    alt="Test upload" 
                    className="w-20 h-20 border rounded"
                  />
                </div>
              ) : (
                <p className="text-sm text-red-700">
                  <strong>שגיאה:</strong> {uploadTest.error}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Error Display */}
        {testResults?.error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">שגיאה בחיבור:</h4>
            <p className="text-sm text-red-700">{testResults.error}</p>
          </div>
        )}

        {/* Refresh Button */}
        <button
          onClick={runStorageTest}
          disabled={loading}
          className="w-full px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 inline mr-2 ${loading ? 'animate-spin' : ''}`} />
          רענן בדיקות
        </button>
      </div>
    </div>
  );
};

export default StorageTest;