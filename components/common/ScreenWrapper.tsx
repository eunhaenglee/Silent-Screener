export default function ScreenWrapper({ children }: { children: React.ReactNode }) {
    return (
      <div className="bg-main rounded-2xl p-8 flex flex-col items-center w-full max-w-3xl mx-auto">
        {children}
      </div>
    );
  }
  