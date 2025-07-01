// components/screens/SelectQuestionScreen.tsx
import { useState } from 'react';
import { questions } from '../../data/questions';
import Button from '../ui/Button';

type SelectQuestionScreenProps = {
  role: string;
  lang: 'en' | 'jp';
  setSelectedQuestion: (q: string) => void;
  setMode: (m: 'practice' | 'select') => void;
  setStep: (s: 'start' | 'practice' | 'summary') => void;
};

export default function SelectQuestionScreen({
  role,
  lang,
  setSelectedQuestion,
  setMode,
  setStep,
}: SelectQuestionScreenProps) {
  const list = questions[role][lang];

  const choose = (q: string) => {
    setSelectedQuestion(q);
    setMode('practice');
    setStep('practice');
  };

  return (
    <div className="space-y-4 w-full max-w-md">
      <h2 className="text-2xl font-semibold">Select a Question</h2>
      {list.map((q, i) => (
        <Button key={i} onClick={() => choose(q)}>
          {q}
        </Button>
      ))}

      <Button onClick={() => setStep('start')}>Back to Start</Button>
    </div>
  );
}
