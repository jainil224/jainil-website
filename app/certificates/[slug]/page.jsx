'use client';

import { useEffect, use } from 'react';
import { gsap } from 'gsap';
import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import Link from 'next/link';
import { CERTIFICATES_DATA } from '@/lib/certificatesData';

export default function CertificateDetailPage({ params }) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;
    const cert = CERTIFICATES_DATA.find((c) => c.slug === slug);

    useEffect(() => {
        if (!cert) return;

        // Reset scroll position to top immediately when page loads
        const lenis = window.__lenis;
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }

        // Entry Animations
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        
        tl.fromTo('.project-back-btn', 
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6 }
        );

        tl.fromTo('.project-header-title', 
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            '-=0.4'
        );

        tl.fromTo('.project-meta-item', 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
            '-=0.5'
        );

        tl.fromTo('.project-hero-image-wrap', 
            { scale: 0.95, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.0, ease: 'expo.out' },
            '-=0.4'
        );

        tl.fromTo('.project-details-content-col', 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
            '-=0.6'
        );

        // Back link wiggler
        const backBtn = document.querySelector('.project-back-btn');
        if (backBtn) {
            let backWiggle;
            const onEnter = () => {
                const backText = backBtn.querySelector('span') || backBtn;
                gsap.set(backText, { transformOrigin: 'center center' });
                backWiggle = gsap.to(backText, { rotation: 3, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)' });
            };
            const onLeave = () => {
                const backText = backBtn.querySelector('span') || backBtn;
                if (backWiggle) backWiggle.kill();
                gsap.to(backText, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            };
            backBtn.addEventListener('mouseenter', onEnter);
            backBtn.addEventListener('mouseleave', onLeave);
            return () => {
                backBtn.removeEventListener('mouseenter', onEnter);
                backBtn.removeEventListener('mouseleave', onLeave);
            };
        }
    }, [cert]);

    if (!cert) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Epilogue', background: 'var(--bg-color)', color: 'var(--color-dark)' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '20px' }}>credential not found</h1>
                <Link href="/certificates" style={{ fontSize: '1.2rem', color: 'var(--color-dark)', textDecoration: 'underline' }}>
                    back to credentials
                </Link>
            </div>
        );
    }

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            
            <header className="main-header">
                <Navbar />
            </header>

            <div className="content-wrapper">
                <main className="project-details-wrapper content-section">
                    
                    {/* Back Navigation */}
                    <Link href="/certificates" className="project-back-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        <span>back to credentials</span>
                    </Link>

                    {/* Header Title & Meta Grid */}
                    <div className="project-header-grid">
                        <h1 className="project-header-title">
                            {cert.title}
                        </h1>
                        <div className="project-meta-block">
                            <div className="project-meta-item">
                                <span className="project-meta-label">issuer</span>
                                <span className="project-meta-val">{cert.issuer}</span>
                            </div>
                            <div className="project-meta-item">
                                <span className="project-meta-label">year</span>
                                <span className="project-meta-val">{cert.year}</span>
                            </div>
                            <div className="project-meta-item">
                                <span className="project-meta-label">category</span>
                                <span className={`project-meta-val project-badge-pill ${cert.badgeClass}`}>
                                    {cert.category}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Certificate Image Section */}
                    <div className="project-hero-image-wrap cert-hero-image-wrap">
                        <img 
                            src={cert.img} 
                            alt={cert.title} 
                            className="project-hero-image cert-hero-image"
                        />
                    </div>

                    {/* Details columns */}
                    <div className="project-info-grid">
                        
                        {/* Description Column */}
                        <div className="project-desc-col">
                            <div>
                                <h2 className="project-section-title">overview</h2>
                                <p className="project-description-text">
                                    {cert.description}
                                </p>
                                <p className="project-description-text" style={{ marginTop: '20px' }}>
                                    This credential signifies rigorous assessment and verification of practical application skills in the field of {cert.category}. Designed to evaluate core architectural, programming, or analytical principles, it confirms readiness for solving complex business problems using state-of-the-art technologies.
                                </p>
                            </div>
                        </div>

                        {/* Validated Skills & Verify Button Column */}
                        <div className="project-details-col">
                            <div>
                                <h2 className="project-section-title">skills verified</h2>
                                <div className="project-tech-tags">
                                    {cert.skills.map((skill, index) => (
                                        <span key={index} className="project-tech-tag">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action CTA Block */}
                            <div className="project-action-card">
                                <h3 className="project-action-headline">verify credential</h3>
                                <p className="project-description-text" style={{ fontSize: '1.05rem', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                                    Click below to view the official online verification certificate, credentials register, or metadata record for this qualification.
                                </p>
                                <a 
                                    href={cert.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="project-action-btn"
                                    style={{ background: 'var(--color-green)', borderColor: 'var(--color-green)' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ marginRight: '4px' }}>
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                    verify online
                                </a>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}
