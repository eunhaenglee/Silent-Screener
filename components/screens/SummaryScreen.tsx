// components/screens/SummaryScreen.tsx
import React from 'react';

type Props = {
  summaryFeedback: {
    score: number;
    flow: string;
    examples: boolean;
    improvement: string;
    suggestion: string;
  } | null;
  handleSummarySubmit: () => Promise<void>;
  onBack: () => void;
};

export default function SummaryScreen({
  summaryFeedback,
  handleSummarySubmit,
  onBack,
}: Props) {
  return (
    <div className="space-y-6 w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center">Summary Feedback</h2>

      { !summaryFeedback ? (
        <button
          onClick={handleSummarySubmit}
          className="w-full bg-white text-black rounded-md py-2 font-semibold"
        >
          Generate Summary Feedback
        </button>
      ) : (
        <>
          <h2 className="text-2xl font-semibold">Score: {summaryFeedback.score} / 100</h2>
          <div className="bg-[#2a2a2a] p-4 rounded-md">
            <p className="font-semibold">Logical Flow</p>
            <p className="text-sm text-gray-300">{summaryFeedback.flow}</p>
          </div>
          <div className="bg-[#2a2a2a] p-4 rounded-md">
            <p className="font-semibold">Use of Examples</p>
            <p className="text-sm text-gray-300">
              {summaryFeedback.examples ? '✔️ Used' : '❌ Not used'}
            </p>
          </div>
          <div className="bg-[#2a2a2a] p-4 rounded-md">
            <p className="font-semibold">Areas for Improvement</p>
            <p className="text-sm text-gray-300">{summaryFeedback.improvement}</p>
          </div>
          <div className="bg-[#2a2a2a] p-4 rounded-md">
            <p className="font-semibold">Suggested Response</p>
            <p className="text-sm text-gray-300">{summaryFeedback.suggestion}</p>
          </div>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 text-white rounded-md py-2 font-semibold mt-4"
          >
            Back to Start
          </button>
        </>
      )}
    </div>
  );
}
