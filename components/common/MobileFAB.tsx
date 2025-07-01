export default function MobileFAB({ onClick }: { onClick: () => void }) {
    return (
      <button
        onClick={onClick}
        className="fixed bottom-8 right-8 bg-[var(--color-primary)] text-white rounded-full px-6 py-3 shadow-lg hover:bg-[var(--color-accent)] transition-all z-50"
      >
        Home
      </button>
    );
  }
  