import { questions } from '../../data/questions';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

export default function StartScreen({
  role,
  setRole,
  lang,
  setLang,
  setSelectedQuestion,
  setMode,
  setStep,
  handleViewHistory
}: any) {
  const roles = [
    'ProductManager',
    'Designer',
    'DataScientist',
    'SoftwareEngineer',
    'DigitalMarketer',
  ];
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff] text-[#1e1e1e]">
      <div className="w-full max-w-[480px] mx-auto mt-[60px] px-[28px] py-[40px] bg-[#fcfbff] rounded-[24px] shadow-[0_4px_32px_rgba(80,63,205,0.08)] flex flex-col items-center">
        {/* 상단 아이콘 */}
        <div className="w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#a18aff] to-[#6c63ff] flex items-center justify-center shadow-[0_2px_8px_rgba(80,63,205,0.10)] mb-[24px]">
          <ChatBubbleLeftRightIcon className="w-7 h-7 text-white" />
        </div>
        {/* 타이틀 */}
        <div className="text-center text-[22px] leading-[28px] font-bold text-[#1e1e1e] mt-[8px] mb-[32px] w-full">Silent Screener</div>
        {/* Role 선택 */}
        <div className="w-full mb-[20px]">
          <div className="text-[13px] font-medium text-[#444468] mb-[8px] w-full text-left">Select Role</div>
          <div className="flex flex-wrap justify-center gap-[8px]">
            {roles.map(r => (
              <button
                key={r}
                className={`px-[18px] py-[10px] rounded-full text-[14px] font-semibold transition
                  ${role === r
                    ? 'bg-[#7b3fe4] text-white'
                    : 'bg-[#f3f4f6] text-[#4b4b57] hover:bg-[#ede9fe]'}
                `}
                style={{minWidth:110}}
                onClick={() => {
                  setRole(r);
                  setSelectedQuestion(questions[r][lang as 'en' | 'jp'][0]);
                }}
              >
                {r.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()}
              </button>
            ))}
          </div>
        </div>
        {/* Language 선택 */}
        <div className="w-full mb-[32px]">
          <div className="text-[13px] font-medium text-[#444468] mb-[8px] w-full text-left">Select Language</div>
          <div className="flex flex-wrap justify-center gap-[8px]">
            {['en', 'jp'].map(l => (
              <button
                key={l}
                className={`px-[18px] py-[10px] rounded-full text-[14px] font-semibold transition
                  ${lang === l
                    ? 'bg-[#7b3fe4] text-white'
                    : 'bg-[#f3f4f6] text-[#4b4b57] hover:bg-[#ede9fe]'}
                `}
                style={{minWidth:90}}
                onClick={() => {
                  setLang(l as 'en' | 'jp');
                  setSelectedQuestion(questions[role][l as 'en' | 'jp'][0]);
                }}
              >
                {l === 'en' ? 'English' : '日本語'}
              </button>
            ))}
          </div>
        </div>
        {/* 메인 버튼 */}
        <button
          className="w-full bg-gradient-to-r from-[#7b3fe4] to-[#5b8df6] text-white py-[14px] rounded-[14px] font-semibold text-[16px] shadow-[0_2px_8px_rgba(80,63,205,0.10)] mt-[8px] mb-[10px] flex items-center justify-center gap-2"
          onClick={() => { setMode('practice'); setStep('practice'); }}
        >
          Start Interview Practice <span className="text-[18px]">→</span>
        </button>
        {/* 서브 버튼 2개 */}
        <button
          className="w-full bg-[#f5f3ff] border border-[#d1cfff] text-[#7b3fe4] py-[14px] rounded-[14px] font-semibold text-[16px] hover:bg-[#ede9fe] mb-[10px]"
          onClick={() => { setMode('select'); setStep('practice'); }}
        >
          Select Question & Practice
        </button>
        <button
          className="w-full bg-[#f5f3ff] border border-[#d1cfff] text-[#7b3fe4] py-[14px] rounded-[14px] font-semibold text-[16px] hover:bg-[#ede9fe]"
          onClick={handleViewHistory}
        >
          View Past Sessions
        </button>
      </div>
    </div>
  );
}
