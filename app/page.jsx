'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import VimeoHero from '@/components/VimeoHero';
import ServiceCards from '@/components/ServiceCards';
import Showreel from '@/components/Showreel';
import DoubleMarquee from '@/components/DoubleMarquee';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import HorizontalWords from '@/components/HorizontalWords';
import CertificatesSection from '@/components/CertificatesSection';

export default function Home() {
    const resumeStickerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (resumeStickerRef.current) {
            // Animating the custom cartoon sticker to pop up with springy feel on scroll
            gsap.fromTo(resumeStickerRef.current,
                { scale: 0, opacity: 0, rotation: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    rotation: 15,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.resume-section',
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    }, []);

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <header className="main-header">
                <Navbar />
                <VimeoHero />
            </header>
            <div className="content-wrapper">
                <HorizontalWords />
                <main>
                    <Showreel />
                    <div className="content-section service-cards-wrapper">
                        <ServiceCards />
                    </div>

                    {/* ─── Resume Viewer Section ─── */}
                    <section className="content-section resume-section" style={{ padding: '120px 20px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="title-container" style={{ marginBottom: '50px', position: 'relative' }}>
                            <h2 className="main-title" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', textAlign: 'center' }}>
                                my <span className="italic-text" style={{ position: 'relative' }}>
                                    resume:
                                    {/* Cute custom cartoon-style document sticker overlay */}
                                    <span ref={resumeStickerRef} style={{
                                        position: 'absolute',
                                        right: '-65px',
                                        top: '-45px',
                                        width: '75px',
                                        height: '75px',
                                        zIndex: 3,
                                        transformOrigin: 'center center',
                                        pointerEvents: 'none',
                                        display: 'block'
                                    }}>
                                        <img src="/assets/sticker-resume.svg" width="100%" height="100%" alt="" />
                                    </span>
                                </span>
                            </h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="160" viewBox="0 0 159 17" fill="none" className="title-underline-svg" style={{ margin: '0 auto', display: 'block' }}>
                                <path d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>

                        <div className="resume-viewer-container" style={{ width: '100%', maxWidth: '1000px', background: '#ffffff', borderRadius: '24px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-green)' }}></span>
                                    <span style={{ fontFamily: 'Epilogue', fontWeight: '700', color: 'var(--color-dark)', fontSize: '1rem', textTransform: 'lowercase' }}>resume_jainil.pdf</span>
                                </div>
                                <a href="/resume_jainil.pdf" download="Jainil_Patel_Resume.pdf" className="nav-work-btn" style={{ margin: 0, padding: '12px 24px', fontSize: '1.1rem', borderRadius: '100px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                    </svg>
                                    <span className="nav-work-btn__text">download copy</span>
                                </a>
                            </div>
                            <div className="resume-iframe-wrap" style={{ width: '100%', height: '800px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                                <iframe src="/resume_jainil.pdf#toolbar=0" width="100%" height="100%" style={{ border: 'none', pointerEvents: 'none' }}></iframe>
                            </div>
                        </div>
                    </section>
                </main>
                <CertificatesSection />
                <section className="Double-marquee">
                    <DoubleMarquee />
                </section>
                <footer className="main-footer">
                    <Footer />
                </footer>
            </div>
        </>
    );
}
