// components/screens/PracticeScreen.tsx
import { questions } from '../../data/questions';
import FeedbackCard from '../ui/FeedbackCard';
import Button from '../ui/Button';
import TextArea from '../ui/TextArea';
import GlassCard from '../ui/GlassCard';

type PracticeScreenProps = {
  role: string;
  lang: 'en' | 'jp';
  currentQuestionIndex: number;
  selectedQuestion: string;
  setSelectedQuestion: (q: string) => void;
  answer: string;
  setAnswer: (a: string) => void;
  allFeedbacks: any[];
  setAllFeedbacks: (f: any[]) => void;
  setStep: (s: 'start' | 'practice' | 'summary') => void;
  setCurrentQuestionIndex: (i: number) => void;
};

export default function PracticeScreen({
  role,
  lang,
  currentQuestionIndex,
  selectedQuestion,
  setSelectedQuestion,
  answer,
  setAnswer,
  allFeedbacks,
  setAllFeedbacks,
  setStep,
  setCurrentQuestionIndex,
}: PracticeScreenProps) {
  const handleNext = async () => {
    const question = questions[role][lang][currentQuestionIndex];

    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: `${question}\n\n${answer}`, lang, mode: 'single' }),
    });
    const data = await res.json();

    setAllFeedbacks([
      ...allFeedbacks,
      { question, answer, feedback: data },
    ]);
    setAnswer('');

    const next = currentQuestionIndex + 1;
    const list = questions[role][lang];
    if (next < list.length) {
      setCurrentQuestionIndex(next);
      setSelectedQuestion(list[next]);
    } else {
      setStep('summary');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <GlassCard>
        <div className="flex flex-col space-y-6 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">{selectedQuestion}</h2>
          <TextArea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your response here..."
            className="h-40 mb-2"
          />
          <button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg w-full"
            onClick={handleNext}
          >
            {currentQuestionIndex + 1 === questions[role][lang].length
              ? 'Finish & See Summary'
              : 'Next Question'}
          </button>
          {allFeedbacks.length > 0 && (
            <div className="space-y-4 pt-8">
              <h3 className="text-xl font-semibold text-gray-900">Previous Feedback</h3>
              {allFeedbacks.map((item, idx) => (
                <FeedbackCard key={idx} item={item} index={idx} />
              ))}
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
