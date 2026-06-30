'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
const Dither = dynamic(() => import('./Dither'), { ssr: false });

export default function VimeoHero() {
    const titleRef = useRef(null);
    const [leftLoaded, setLeftLoaded] = useState(false);
    const [rightLoaded, setRightLoaded] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        const leftImg = new Image();
        const rightImg = new Image();

        // Register handlers BEFORE setting src to handle cached images correctly
        leftImg.onload = () => setLeftLoaded(true);
        leftImg.onerror = () => setLeftLoaded(true); // Fallback immediately if image fails to load
        rightImg.onload = () => setRightLoaded(true);
        rightImg.onerror = () => setRightLoaded(true); // Fallback immediately if image fails to load

        if (window.innerWidth <= 768) {
            leftImg.src = "https://res.cloudinary.com/dgqd54pbl/image/upload/v1782724985/ChatGPT_Image_Jun_29_2026_02_36_56_PM-split_xvykmv.png";
            rightImg.src = "https://res.cloudinary.com/dgqd54pbl/image/upload/v1782724986/ChatGPT_Image_Jun_29_2026_02_36_56_PM-split_2_xkchwa.png";
        } else {
            leftImg.src = "https://res.cloudinary.com/dgqd54pbl/image/upload/v1782711635/hero_section-right_zcps4k.png";
            rightImg.src = "https://res.cloudinary.com/dgqd54pbl/image/upload/v1782711635/hero_section-left_slwnwf.png";
        }

        // Fallback timer: start animation anyway after 800ms if images take too long to load
        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (leftLoaded && rightLoaded) {
            setStartAnimation(true);
        }
    }, [leftLoaded, rightLoaded]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!startAnimation) {
            // Keep elements in their initial states
            gsap.set('.vimeo-hero__word', { y: 60, opacity: 0 });
            gsap.set('.navbar', { y: -60, opacity: 0 });
            gsap.set('.home-header__title-line-svg', { scale: 0.8, opacity: 0 });
            return;
        }

        // Reset scroll position and pin states
        const lenis = window.__lenis;
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }

        const tl = gsap.timeline();

        // 1. Curtains split animation
        tl.to('.curtain-left', {
            xPercent: -100,
            duration: 1.0,
            ease: 'power3.inOut'
        }, 0.2)
        .to('.curtain-right', {
            xPercent: 100,
            duration: 1.0,
            ease: 'power3.inOut'
        }, 0.2);

        // 2. Navbar slide down
        tl.to('.navbar', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        }, 0.7);

        // 3. Hero headline words slide/fade in
        tl.to('.vimeo-hero__word', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.04,
            ease: 'power3.out'
        }, 0.8);

        // 4. Fade/Pop the oval underline
        tl.to('.home-header__title-line-svg', {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.5)'
        }, '-=0.3');

        // 5. Hide the curtains entirely to release page hit-testing / clicks
        tl.set('.hero-curtain-overlay', { display: 'none' });

        // 6. Scroll-linked parallax & fade out animation for title elements
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.vimeo-hero',
                start: 'top top',
                end: '+=100%',
                scrub: true,
            }
        });

        scrollTl.to('.vimeo-hero__word', {
            y: -100,
            opacity: 0,
            stagger: 0.02,
            ease: 'none'
        }, 0)
        .to('.home-header__title-line-svg', {
            scaleX: 0,
            opacity: 0,
            transformOrigin: 'left center',
            ease: 'none'
        }, 0)
        .to('.home-header__smiley-svg', {
            rotation: 180,
            x: -60,
            y: -60,
            opacity: 0,
            ease: 'none'
        }, 0)
        .to('.home-header__star-svg', {
            rotation: 360,
            x: 60,
            y: -60,
            opacity: 0,
            ease: 'none'
        }, 0);

        return () => {
            tl.kill();
            scrollTl.kill();
            // Safety measure: ensure overlay is hidden if component updates or unmounts during animation
            gsap.set('.hero-curtain-overlay', { display: 'none' });
        };
    }, [startAnimation]);
    return (
        <>
            {/* ── Main hero container ── */}
            <div className="vimeo-hero">
                {/* Dither background */}
                <div className="vimeo-hero__background-dither">
                    <Dither
                        waveColor={[0.16, 0.45, 0.37]}
                        disableAnimation={false}
                        enableMouseInteraction={true}
                        mouseRadius={0.8}
                        colorNum={4.0}
                        pixelSize={2.0}
                        waveAmplitude={0.3}
                        waveFrequency={3.0}
                        waveSpeed={0.05}
                    />
                </div>

                {/* Gradient fade */}
                <div className="vimeo-hero__fade" />

                {/* ① Headline — bottom left, word-by-word layout */}
                <div className="home-header__title">
                    <h1 className="vimeo-hero__title" ref={titleRef}>

                        {/* "I" */}
                        <span className="vimeo-hero__word">I </span>

                        {/* "build" + ⑤ smiley (no animation) */}
                        <span className="vimeo-hero__word is--relative">
                            <span>build </span>
                            <div className="home-header__smiley">
                                <img
                                    src="/assets/VimeoHero SVG/smiley-face.svg"
                                    alt=""
                                    className="home-header__smiley-svg"
                                />
                            </div>
                        </span>

                        {/* "modern" */}
                        <span className="vimeo-hero__word">modern </span>

                        {/* "websites" italic */}
                        <span className="vimeo-hero__word"><em>websites </em></span>

                        <div style={{ flexBasis: '100%', height: 0 }} />

                        {/* "for" */}
                        <span className="vimeo-hero__word">for </span>

                        {/* "the" */}
                        <span className="vimeo-hero__word">the </span>

                        {/* "future." + ⑤ pink star (no spin) + oval underline */}
                        <span className="vimeo-hero__word is--relative">
                            <div className="home-header__star">
                                <div className="home-header__star-inner">
                                    <img
                                        src="/assets/VimeoHero SVG/pink-star.svg"
                                        alt=""
                                        className="home-header__star-svg"
                                    />
                                </div>
                            </div>
                            {/* Oval underline */}
                            <img
                                src="/assets/VimeoHero SVG/oval-underline.svg"
                                alt=""
                                className="home-header__title-line-svg"
                            />
                            <span>future.</span>
                        </span>

                    </h1>
                </div>
            </div>

            {/* Curtain Overlay */}
            <div className="hero-curtain-overlay">
                <div className="curtain-panel curtain-left" />
                <div className="curtain-panel curtain-right" />
            </div>
        </>
    );
}
