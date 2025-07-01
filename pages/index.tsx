// pages/index.tsx
import { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import MobileFAB from '../components/common/MobileFAB';

import StartScreen from '../components/screens/StartScreen';
import SelectQuestionScreen from '../components/screens/SelectQuestionScreen';
import PracticeScreen from '../components/screens/PracticeScreen';
import SummaryScreen from '../components/screens/SummaryScreen';
import HistoryScreen from '../components/screens/HistoryScreen';

import { questions } from '../data/questions';

export default function Home() {
  const [step, setStep] = useState<'start' | 'practice' | 'summary'>('start');
  const [mode, setMode] = useState<'practice' | 'select'>('practice');
  const [role, setRole] = useState<'ProductManager'>('ProductManager');
  const [lang, setLang] = useState<'en' | 'jp'>('en');
  const [selectedQuestion, setSelectedQuestion] = useState<string>(
    questions[role][lang][0]
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [allFeedbacks, setAllFeedbacks] = useState<any[]>([]);
  const [summaryFeedback, setSummaryFeedback] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const handleReset = () => {
    setStep('start');
    setAnswer('');
    setCurrentQuestionIndex(0);
    setSelectedQuestion(questions[role][lang][0]);
    setAllFeedbacks([]);
    setSummaryFeedback(null);
    setShowHistory(false);
  };

  const handleStartPractice = () => {
    setMode('practice');
    setStep('practice');
  };
  const handleSelectPractice = () => {
    setMode('select');
    setStep('practice');
  };
  const handleViewHistory = () => {
    const saved = JSON.parse(
      localStorage.getItem('silent-screener-history') || '[]'
    );
    setHistory(saved);
    setShowHistory(true);
  };
  const handleClearHistory = () => {
    localStorage.removeItem('silent-screener-history');
    setHistory([]);
  };

  useEffect(() => {
    if (step === 'summary' && summaryFeedback) {
      const newSession = {
        timestamp: new Date().toISOString(),
        role,
        lang,
        allFeedbacks,
        summaryFeedback,
      };
      const prev = JSON.parse(
        localStorage.getItem('silent-screener-history') || '[]'
      );
      localStorage.setItem(
        'silent-screener-history',
        JSON.stringify([newSession, ...prev])
      );
    }
  }, [summaryFeedback, step]);

  const handleSummarySubmit = async () => {
    const combinedAnswers = allFeedbacks
      .map(
        (item, idx) =>
          `Q${idx + 1}: ${item.question}\nA: ${item.answer}`
      )
      .join('\n\n');

    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answer: combinedAnswers,
        lang,
        mode: 'summary',
      }),
    });
    const data = await res.json();
    setSummaryFeedback(data);
  };

  return (
    <Layout>
      {step === 'start' && !showHistory && (
        <StartScreen
          role={role}
          setRole={setRole}
          lang={lang}
          setLang={setLang}
          setSelectedQuestion={setSelectedQuestion}
          setMode={setMode}
          setStep={setStep}
          handleViewHistory={handleViewHistory}
        />
      )}

      {showHistory && (
        <HistoryScreen
          history={history}
          onBack={handleReset}
          onClear={handleClearHistory}
        />
      )}

      {step === 'practice' && mode === 'select' && (
        <SelectQuestionScreen
          role={role}
          lang={lang}
          setSelectedQuestion={setSelectedQuestion}
          setMode={setMode}
          setStep={setStep}
        />
      )}

      {step === 'practice' && mode === 'practice' && (
        <PracticeScreen
          role={role}
          lang={lang}
          currentQuestionIndex={currentQuestionIndex}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          answer={answer}
          setAnswer={setAnswer}
          allFeedbacks={allFeedbacks}
          setAllFeedbacks={setAllFeedbacks}
          setStep={setStep}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
        />
      )}

      {step === 'summary' && (
        <SummaryScreen
          summaryFeedback={summaryFeedback}
          handleSummarySubmit={handleSummarySubmit}
          onBack={handleReset}
        />
      )}

      {step !== 'start' && <MobileFAB onClick={handleReset} />}
    </Layout>
  );
}
