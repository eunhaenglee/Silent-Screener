export default function FeedbackCard({ item, index }: any) {
    return (
      <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/30">
        <p className="text-sm text-gray-400">Q{index+1}: {item.question}</p>
        <p className="font-semibold">Logical Flow</p>
        <p className="text-sm text-gray-300">{item.feedback.flow}</p>
        <p className="font-semibold">Use of Examples</p>
        <p className="text-sm text-gray-300">{item.feedback.examples ? '✔️ Used' : '❌ Not used'}</p>
        <p className="font-semibold">Areas for Improvement</p>
        <p className="text-sm text-gray-300">{item.feedback.improvement}</p>
        <p className="font-semibold">Suggested Response</p>
        <p className="text-sm text-gray-300">{item.feedback.suggestion}</p>
      </div>
    );
  }
  