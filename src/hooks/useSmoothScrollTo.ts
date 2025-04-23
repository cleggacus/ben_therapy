import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export const useSmoothScrollTo = (sectionIds: string[], offset = 66) => {
  const params = useSearchParams();
  const pathname = usePathname();

  const isHashFromScrollRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;

    if (!hash || isHashFromScrollRef.current) {
      isHashFromScrollRef.current = false;
      return;
    }

    const target = document.querySelector(hash) as HTMLElement;
    if (!target) return;

    const style = window.getComputedStyle(target);
    const marginTop = parseInt(style.marginTop.slice(0, -2)) ?? 0;
    const offsetPosition = target.offsetTop - marginTop - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, [params, offset]);

  useEffect(() => {
    const handleScroll = () => {
      let currentId = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= offset + 5 && rect.bottom >= offset) {
          currentId = id;
        }
      }

      if (currentId && window.location.hash !== `#${currentId}`) {
        isHashFromScrollRef.current = true;
        history.replaceState(null, "", `${pathname}#${currentId}`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial run

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, pathname, offset]);
};
