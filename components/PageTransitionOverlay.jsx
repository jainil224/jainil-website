'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';

const TRANSITION_COLORS = [
    { p1: '#16151f', p2: '#6366f1', text: '#ffffff' }, // Slate & Indigo
    { p1: '#16151f', p2: '#206c54', text: '#ffffff' }, // Slate & Teal
    { p1: '#16151f', p2: '#ff7539', text: '#ffffff' }, // Slate & Orange
    { p1: '#16151f', p2: '#8b263e', text: '#ffffff' }, // Slate & Maroon
    { p1: '#16151f', p2: '#ff9db7', text: '#ffffff' }, // Slate & Rose Pink
    { p1: '#1C75BC', p2: '#FFD700', text: '#000000' }, // 1st: Blue & Yellow/Gold
    { p1: '#C77DFF', p2: '#FF784F', text: '#ffffff' }, // 2nd: Purple & Coral/Orange
    { p1: '#ff4500', p2: '#ff6347', text: '#ffffff' }  // 3rd: Orangered & Tomato
];

export default function PageTransitionOverlay() {
    const router = useRouter();
    const pathname = usePathname();
    const overlayRef = useRef(null);
    const textRef = useRef(null);
    const path1Ref = useRef(null);
    const path2Ref = useRef(null);
    const isTransitioning = useRef(false);
    const [colorConfig, setColorConfig] = useState(TRANSITION_COLORS[0]);
    const lastColorIndexRef = useRef(-1);

    // Initialize SVG stroke dasharray and dashoffset
    useEffect(() => {
        const p1 = path1Ref.current;
        const p2 = path2Ref.current;

        if (p1 && p2) {
            const len1 = p1.getTotalLength();
            const len2 = p2.getTotalLength();

            // Setup initial styles
            gsap.set(p1, {
                strokeDasharray: len1,
                strokeDashoffset: len1,
                attr: { 'stroke-width': 200 }
            });

            gsap.set(p2, {
                strokeDasharray: len2,
                strokeDashoffset: len2,
                attr: { 'stroke-width': 200 }
            });
        }
    }, []);

    useEffect(() => {
        const setupClickListeners = () => {
            const links = document.querySelectorAll('.logo-truus, .nav-left a[href="/work"], .nav-right a[href="/certificates"]');
            links.forEach(link => {
                link.removeEventListener('click', handleLinkClick);
                link.addEventListener('click', handleLinkClick);
            });
        };

        const handleLinkClick = (e) => {
            const href = e.currentTarget.getAttribute('href');
            if (!href || href === pathname || isTransitioning.current) {
                return;
            }
            e.preventDefault();
            startTransition(href);
        };

        setupClickListeners();

        return () => {
            const links = document.querySelectorAll('.logo-truus, .nav-left a[href="/work"], .nav-right a[href="/certificates"]');
            links.forEach(link => {
                link.removeEventListener('click', handleLinkClick);
            });
        };
    }, [pathname]);

    // Handle entering a new page (drawing out the paths to reveal content)
    useEffect(() => {
        const p1 = path1Ref.current;
        const p2 = path2Ref.current;
        const text = textRef.current;
        const overlay = overlayRef.current;
        if (p1 && p2 && overlay) {
            gsap.killTweensOf(p1);
            gsap.killTweensOf(p2);
            gsap.killTweensOf(text);
            gsap.killTweensOf(overlay);

            // Scroll to the top immediately on route change
            const lenis = window.__lenis;
            if (lenis) {
                lenis.scrollTo(0, { immediate: true });
            } else {
                window.scrollTo(0, 0);
            }

            const len1 = p1.getTotalLength();
            const len2 = p2.getTotalLength();

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(overlay, { display: 'none' });
                    isTransitioning.current = false;
                }
            });

            // Fade out center text logo first
            tl.to(text, {
                opacity: 0,
                y: -30,
                duration: 0.35,
                ease: 'power2.in'
            }, 0);

            // Animate paths drawing out
            tl.to(p1, {
                strokeDashoffset: -len1,
                attr: { 'stroke-width': 200 },
                duration: 0.85,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set(p1, { strokeDashoffset: len1 });
                }
            }, 0.1);

            tl.to(p2, {
                strokeDashoffset: -len2,
                attr: { 'stroke-width': 200 },
                duration: 0.85,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set(p2, { strokeDashoffset: len2 });
                }
            }, 0.18);
        }
    }, [pathname]);

    const startTransition = (targetHref) => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;

        // Choose a unique random color config that does not repeat consecutively
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * TRANSITION_COLORS.length);
        } while (randomIndex === lastColorIndexRef.current);

        lastColorIndexRef.current = randomIndex;
        const randomConfig = TRANSITION_COLORS[randomIndex];
        setColorConfig(randomConfig);

        const p1 = path1Ref.current;
        const p2 = path2Ref.current;
        const text = textRef.current;
        const overlay = overlayRef.current;

        if (p1 && p2 && overlay && text) {
            gsap.killTweensOf(p1);
            gsap.killTweensOf(p2);
            gsap.killTweensOf(text);
            gsap.killTweensOf(overlay);

            // Set colors immediately before starting animations
            p1.setAttribute('stroke', randomConfig.p1);
            p2.setAttribute('stroke', randomConfig.p2);
            text.style.color = randomConfig.text;

            const len1 = p1.getTotalLength();
            const len2 = p2.getTotalLength();

            // Set initial state before draw-in starts
            gsap.set(overlay, { display: 'block' });
            gsap.set(p1, { strokeDashoffset: len1, attr: { 'stroke-width': 200 } });
            gsap.set(p2, { strokeDashoffset: len2, attr: { 'stroke-width': 200 } });
            gsap.set(text, { opacity: 0, y: 30 });

            const tl = gsap.timeline({
                onComplete: () => {
                    router.push(targetHref);
                }
            });

            // Animating paths drawing in (leave current page)
            tl.to(p1, {
                strokeDashoffset: 0,
                attr: { 'stroke-width': 700 },
                duration: 0.85,
                ease: 'power2.inOut'
            }, 0);

            tl.to(p2, {
                strokeDashoffset: 0,
                attr: { 'stroke-width': 700 },
                duration: 0.85,
                ease: 'power2.inOut'
            }, 0.08);

            // Pop in text in the absolute center
            tl.to(text, {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: 'power2.out'
            }, 0.4);
        }
    };

    return (
        <div
            ref={overlayRef}
            className="page-transition-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 99999,
                display: 'none',
                pointerEvents: 'none'
            }}
        >
            {/* SVG Wipe Vector Layer */}
            <div
                style={{
                    position: 'absolute',
                    top: '-30%',
                    left: '-30%',
                    right: '-30%',
                    bottom: '-30%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'all'
                }}
            >
                <svg
                    viewBox="0 0 2453 2535"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <path
                        ref={path1Ref}
                        d="M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049 2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644 455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463 2209.55 381.262 2209.55 381.262"
                        stroke={colorConfig.p1}
                        strokeWidth="200"
                        strokeLinecap="round"
                        shapeRendering="geometricPrecision"
                    />
                    <path
                        ref={path2Ref}
                        d="M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969 1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198 427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 1708.78 252.012C1437.81 -314.29 369.471 909.169 132.281 566.512C18.1772 401.672 244.781 193.012 244.781 193.012"
                        stroke={colorConfig.p2}
                        strokeWidth="200"
                        strokeLinecap="round"
                        shapeRendering="geometricPrecision"
                    />
                </svg>
            </div>

            {/* Brand Logo Overlay Text in Center */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    pointerEvents: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <span
                    ref={textRef}
                    style={{
                        fontFamily: 'Epilogue, sans-serif',
                        fontWeight: 900,
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        letterSpacing: '-2.5px',
                        textTransform: 'lowercase',
                        color: colorConfig.text,
                        userSelect: 'none',
                        opacity: 0
                    }}
                >
                    jainil.
                </span>
            </div>
        </div>
    );
}
