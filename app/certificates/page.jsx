'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import { CERTIFICATES_DATA } from '@/lib/certificatesData';
import Link from 'next/link';

export default function CertificatesPage() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate underline path on mount
        gsap.to('.title-underline-svg path', {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.3
        });

        // Fade in certificate cards on scroll
        gsap.utils.toArray('.cert-card').forEach((card) => {
            gsap.fromTo(card, 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Wiggle badge on card hover
        const cards = document.querySelectorAll('.cert-card');
        const cleanups = [];

        cards.forEach((card) => {
            const badge = card.querySelector('.cert-card__badge');
            if (badge) {
                let wiggleTween;
                const onEnter = () => {
                    gsap.set(badge, { transformOrigin: 'center center' });
                    wiggleTween = gsap.to(badge, {
                        rotation: 4,
                        duration: 0.12,
                        repeat: -1,
                        yoyo: true,
                        ease: 'steps(1)'
                    });
                };
                const onLeave = () => {
                    if (wiggleTween) {
                        wiggleTween.kill();
                    }
                    gsap.to(badge, { rotation: 0, duration: 0.3, ease: 'power2.out' });
                };
                card.addEventListener('mouseenter', onEnter);
                card.addEventListener('mouseleave', onLeave);
                cleanups.push(() => {
                    card.removeEventListener('mouseenter', onEnter);
                    card.removeEventListener('mouseleave', onLeave);
                });
            }
        });

        return () => {
            cleanups.forEach(fn => fn());
        };
    }, []);

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <header className="main-header">
                <Navbar />
            </header>

            <div className="content-wrapper">
                <main className="work-page-wrapper content-section">
                    
                    {/* Header */}
                    <div className="title-container" style={{ margin: '0 auto 60px' }}>
                        <h1 className="main-title" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)', textTransform: 'lowercase' }}>
                            my <span className="italic-text">credentials.</span>
                        </h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="220" viewBox="0 0 159 17" fill="none" className="title-underline-svg" style={{ color: 'var(--color-pink)' }}>
                            <path d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </div>

                    {/* Certificates Grid */}
                    <div className="work-grid">
                        {CERTIFICATES_DATA.map((cert) => {
                            return (
                                <Link href={`/certificates/${cert.slug}`} key={cert.slug} className="work-project-card cert-card">
                                    <div className="work-project-card__img-wrap">
                                        <img 
                                            src={cert.img} 
                                            alt={cert.title} 
                                            className="work-project-card__img" 
                                            loading="lazy" 
                                        />
                                    </div>
                                    <div className="work-project-card__text">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                            <span className={`work-project-card__badge ${cert.badgeClass}`}>
                                                {cert.category}
                                            </span>
                                        </div>
                                        <h3 className="work-project-card__title" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', color: 'var(--color-dark)', margin: '0 0 0.75rem 0', textTransform: 'lowercase' }}>
                                            {cert.title}
                                        </h3>
                                        <p style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#444', lineHeight: '1.6' }}>
                                            {cert.description}
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '1rem', color: '#666', fontFamily: 'Epilogue', fontWeight: '600' }}>
                                                issued by: {cert.issuer}
                                            </span>
                                            <span style={{ fontSize: '1.1rem', color: 'var(--color-dark)', fontFamily: 'Epilogue', fontWeight: '700' }}>
                                                {cert.year}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </main>
                <footer className="main-footer">
                    <Footer />
                </footer>
            </div>
        </>
    );
}
