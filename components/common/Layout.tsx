// components/common/Layout.tsx
import React, { ReactNode } from 'react';
import { ChatIcon, TargetIcon, SparkleIcon, ClockIcon } from '../ui/FeatureIcons';

type Props = { children: ReactNode };

const features = [
  {
    icon: <ChatIcon />,
    title: '음성 없이 글로 연습',
    desc: '조용한 환경에서도 효과적인 면접 준비가 가능합니다.'
  },
  {
    icon: <TargetIcon />,
    title: '직무별 맞춤 질문',
    desc: '각 직무에 특화된 실전 면접 질문을 제공합니다.'
  },
  {
    icon: <SparkleIcon />,
    title: 'AI 피드백',
    desc: '논리성과 구조를 분석한 상세한 개선 피드백을 받아보세요.'
  },
  {
    icon: <ClockIcon />,
    title: '언제 어디서나',
    desc: '점심시간, 출퇴근길에도 간편하게 면접 연습하세요.'
  },
];

export default function Layout({ children }: Props) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 font-sans overflow-hidden">
      {/* 배경 이미지 */}
      <img src="/assets/bg-abstract.png" alt="background" className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none z-0" />
      {/* Header with Ghost Logo */}
      <header className="relative z-10 w-full flex items-center justify-center py-8">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="logo" className="w-12 h-12" />
          <span className="text-5xl font-extrabold text-gray-900 tracking-tight">Silent Screener</span>
        </div>
      </header>
      {/* Hero Section - 타이틀/설명만, 영어로 통일 */}
      <section className="w-full flex flex-col items-center justify-center pt-32 pb-10">
        <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1 rounded-full mb-6 text-xs font-semibold tracking-wide">
          <SparkleIcon />
          Beta Version Available
        </span>
        <h1 className="font-sans font-extrabold text-[56px] md:text-6xl text-gray-900 mb-4 text-center tracking-tight">Silent Screener</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-purple-600 mb-2 text-center">No mic. No camera. Just you and your story.</h2>
        <p className="text-lg md:text-xl text-gray-500 mb-0 text-center max-w-2xl leading-relaxed">
          Practice interviews efficiently in a quiet environment with an AI-powered text interview simulator.
        </p>
      </section>
      {/* Features Grid - 레퍼런스와 완전히 동일하게 카드형 grid로 구현 */}
      <section className="w-full py-12 bg-[#f9f5ff]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-xl mb-4">
              <svg width="32" height="32" fill="none">
                <rect x="4" y="6" width="24" height="16" rx="4" stroke="#A259FF" strokeWidth="2"/>
                <rect x="10" y="22" width="12" height="4" rx="2" fill="#A259FF"/>
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Text-based Practice</h3>
            <p className="text-sm text-gray-500">Practice efficiently for interviews in a quiet environment without speaking out loud.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-xl mb-4">
              <svg width="32" height="32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#A259FF" strokeWidth="2"/>
                <circle cx="16" cy="16" r="6" stroke="#A259FF" strokeWidth="2"/>
                <circle cx="16" cy="16" r="2" fill="#A259FF"/>
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Role-specific Questions</h3>
            <p className="text-sm text-gray-500">Get tailored, real interview questions for your target job role.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-xl mb-4">
              <svg width="32" height="32" fill="none">
                <path d="M16 4l2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7z" fill="#A259FF"/>
                <circle cx="26" cy="26" r="3" fill="#A259FF"/>
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">AI Feedback</h3>
            <p className="text-sm text-gray-500">Get detailed, actionable feedback on your answers, analyzing logic and structure.</p>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-xl mb-4">
              <svg width="32" height="32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#A259FF" strokeWidth="2"/>
                <path d="M16 10v6l4 2" stroke="#A259FF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Anytime, Anywhere</h3>
            <p className="text-sm text-gray-500">Practice conveniently during lunch breaks or commutes.</p>
          </div>
        </div>
      </section>
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] px-4">
        {children}
      </div>
    </div>
  );
}
