import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const useSmoothScrollTo = () => {
    const params = useSearchParams ()

    useEffect(() => {
        console.log(params)
        if (typeof window === "undefined") return;
        const hash = window.location.hash;

        if (!hash) return;

        const headerOffset = 66;

        const target = document.querySelectorAll(`${hash}`)[0] as HTMLElement;

        if (!target) return;

        const style = window.getComputedStyle(target);
        const marginTop = parseInt(style.marginTop.slice(0, -2)) ?? 0;

        const offsetPosition = target.offsetTop - marginTop - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    }, [params]);
};
