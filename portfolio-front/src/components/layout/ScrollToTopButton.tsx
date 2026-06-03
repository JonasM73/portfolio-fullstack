import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener(
      "scroll",
      toggleVisibility
    );

    return () =>
      window.removeEventListener(
        "scroll",
        toggleVisibility
      );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`
        fixed bottom-6 left-6 z-50
        transition-all duration-500
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-10 opacity-0"
        }
      `}
    >
      {/* Glow derrière */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/30 via-cyan-300/20 to-orange-300/20 blur-2xl" />

      <button
        onClick={scrollToTop}
        aria-label="Retour en haut"
        className="
          group relative flex h-16 w-16 items-center justify-center
          rounded-[1.8rem]
          border border-white/30
          bg-white/70
          shadow-[0_10px_40px_rgba(0,0,0,0.12)]
          backdrop-blur-xl
          transition-all duration-300
          hover:-translate-y-1
          hover:scale-105
          hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          dark:border-white/10
          dark:bg-zinc-900/70
        "
      >
        {/* dégradé intérieur */}
        <div className="absolute inset-[2px] rounded-[1.6rem] bg-gradient-to-br from-teal-50 via-white to-orange-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900" />

        {/* cercle icon */}
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <ChevronUp className="h-5 w-5 text-white" />
        </div>
      </button>
    </div>
  );
}