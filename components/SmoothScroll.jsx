'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
            touchMultiplier: 1.5,
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        // Dynamic Tab Title Change
        let lastActiveTitle = document.title;
        const handleVisibility = () => {
            if (document.hidden) {
                if (!document.title.startsWith("Hey, over here!")) {
                    lastActiveTitle = document.title;
                }
                document.title = "Hey, over here! 👋 - Data Analyst & Full Stack Developer";
            } else {
                document.title = lastActiveTitle;
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);

        // Store lenis on window so other components can access it
        window.__lenis = lenis;

        return () => {
            lenis.destroy();
            document.removeEventListener('visibilitychange', handleVisibility);
            delete window.__lenis;
        };
    }, []);

    return null;
}
