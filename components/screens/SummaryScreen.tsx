'use client';
import React, { useEffect, useState } from 'react';
import { getSessionHistory } from '@/utils/api';

export default function HistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSessionHistory();
      setHistory(result);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Session History</h1>
      {history.length === 0 ? (
        <p className="text-gray-400">No session history found.</p>
      ) : (
        <div className="space-y-4">
          {history.map((session, index) => (
            <div key={index} className="bg-[#2a2a2a] p-4 rounded-md">
              <p className="text-sm text-gray-400">
                Date: {new Date(session.timestamp).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">
                Role: {session.role}
              </p>
              <p className="text-sm text-gray-400">
                Score: {session.feedback?.score ?? 'N/A'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
