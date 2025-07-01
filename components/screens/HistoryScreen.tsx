// components/screens/HistoryScreen.tsx
import React, { useState } from 'react';
import FeedbackCard from '../ui/FeedbackCard'; // 질문별 카드
import SummaryCard from '../ui/Card';           // 전체 요약 카드 (간단한 스타일링용)

type HistoryItem = {
  timestamp: string;
  role: string;
  lang: 'en' | 'jp';
  allFeedbacks: {
    question: string;
    answer: string;
    feedback: {
      score?: number;
      flow: string;
      examples: boolean;
      improvement: string;
      suggestion: string;
    };
  }[];
  summaryFeedback?: {
    score: number;
    flow: string;
    examples: boolean;
    improvement: string;
    suggestion: string;
  };
};

type Props = {
  history: HistoryItem[];
  onBack: () => void;       // “Back to Start”
  onClear: () => void;      // “Clear History”
};

export default function HistoryScreen({ history, onBack, onClear }: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // 목록 뷰
  if (selectedIdx === null) {
    return (
      <div className="space-y-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">Past Sessions</h2>
        {history.length === 0 ? (
          <p className="text-center text-gray-400">No past sessions.</p>
        ) : (
          history.map((session, idx) => (
            <div
              key={idx}
              className="bg-[#2a2a2a] p-4 rounded-md cursor-pointer hover:bg-[#333]"
              onClick={() => setSelectedIdx(idx)}
            >
              <p className="text-sm text-gray-400">
                Date: {new Date(session.timestamp).toLocaleString()}
              </p>
              <p className="font-semibold">
                Role: {session.role} / Lang: {session.lang}
              </p>
              <p className="mt-1">
                Score:{' '}
                {session.summaryFeedback
                  ? session.summaryFeedback.score
                  : '-'}
              </p>
            </div>
          ))
        )}

        <div className="flex justify-between">
          <button
            onClick={onClear}
            className="w-1/2 mr-2 bg-white text-black rounded-md py-2 font-semibold"
          >
            Clear History
          </button>
          <button
            onClick={onBack}
            className="w-1/2 ml-2 bg-gray-500 text-white rounded-md py-2 font-semibold"
          >
            Back to Start
          </button>
        </div>
      </div>
    );
  }

  // 상세 뷰
  const session = history[selectedIdx];

  return (
    <div className="space-y-6 w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center">Session Details</h2>

      {/* 세션 메타 */}
      <SummaryCard className="bg-[#2a2a2a] p-4 rounded-md">
        <p className="text-sm text-gray-400">
          Date: {new Date(session.timestamp).toLocaleString()}
        </p>
        <p className="font-semibold">
          Role: {session.role} / Lang: {session.lang}
        </p>
        <p className="mt-1">
          Score:{' '}
          {session.summaryFeedback
            ? session.summaryFeedback.score
            : '-'}
        </p>
      </SummaryCard>

      {/* 전체 요약 피드백 */}
      {session.summaryFeedback && (
        <div className="space-y-4">
          <div className="bg-[#2a2a2a] p-4 rounded-md">
            <p className="font-semibold">Logical Flow</p>
            <p className="text-sm text-gray-300">
              {session.summaryFeedback.flow}
            </p>
          </div>
          <div className="bg-[#2a2a2a] p-4 rounded-md">
            <p className="font-semibold">Use of Examples</p>
            <p className="text-sm text-gray-300">
              {session.summaryFeedback.examples
                ? '✔️ Used'
                : '❌ Not used'}
            </p>
          </div>
          <div className="bg-[#2a2a2a] p-4 rounded-md">
            <p className="font-semibold">Areas for Improvement</p>
            <p className="text-sm text-gray-300">
              {session.summaryFeedback.improvement}
            </p>
          </div>
          <div className="bg-[#2a2a2a] p-4 rounded-md">
            <p className="font-semibold">Suggested Response</p>
            <p className="text-sm text-gray-300">
              {session.summaryFeedback.suggestion}
            </p>
          </div>
        </div>
      )}

      {/* 질문별 피드백 */}
      <div className="space-y-6">
        {session.allFeedbacks.map((item, idx) => (
          <FeedbackCard key={idx} item={item} index={idx} />
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setSelectedIdx(null)}
          className="w-1/2 mr-2 bg-white text-black rounded-md py-2 font-semibold"
        >
          Back to List
        </button>
        <button
          onClick={onClear}
          className="w-1/2 ml-2 bg-white text-black rounded-md py-2 font-semibold"
        >
          Clear History
        </button>
      </div>
    </div>
  );
}
