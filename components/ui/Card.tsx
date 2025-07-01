export default function Card({ children }: { children: React.ReactNode }) {
    return (
      <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/30">
        {children}
      </div>
    );
  }
  