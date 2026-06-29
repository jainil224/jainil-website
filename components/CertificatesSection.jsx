'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { CERTIFICATES_DATA } from '@/lib/certificatesData';

export default function CertificatesSection() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Fade in section heading
        gsap.fromTo('.certs-sec-title',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.certs-sec-title',
                    start: 'top 85%'
                }
            }
        );

        // Fade in cards
        gsap.utils.toArray('.certs-sec-card').forEach((card) => {
            gsap.fromTo(card,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    }
                }
            );
        });

        // Badge wiggles on card hover
        const cards = document.querySelectorAll('.certs-sec-card');
        const cleanups = [];

        cards.forEach((card) => {
            const badge = card.querySelector('.certs-sec-card__badge');
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
                    if (wiggleTween) wiggleTween.kill();
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
        <section className="content-section certs-sec-wrapper" style={{ background: 'var(--bg-color)', width: '100%' }}>
            {/* Title */}
            <div className="title-container certs-sec-title" style={{ margin: '0 auto 60px', textAlign: 'center' }}>
                <h2 className="main-title" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', textTransform: 'lowercase', margin: '0 0 10px 0' }}>
                    my <span className="italic-text">credentials.</span>
                </h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="220" viewBox="0 0 159 17" fill="none" className="title-underline-svg" style={{ color: 'var(--color-pink)' }}>
                    <path d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </div>

            {/* Grid */}
            <div className="work-grid" style={{ marginBottom: '60px' }}>
                {CERTIFICATES_DATA.filter(cert => 
                    cert.slug === "nptel-certificate" || cert.slug === "tata-data-visualization"
                ).map((cert) => (
                    <Link href={`/certificates/${cert.slug}`} key={cert.slug} className="work-project-card certs-sec-card">
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
                                <span className={`work-project-card__badge certs-sec-card__badge ${cert.badgeClass}`}>
                                    {cert.category}
                                </span>
                            </div>
                            <h3 className="work-project-card__title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--color-dark)', margin: '0 0 0.75rem 0', textTransform: 'lowercase' }}>
                                {cert.title}
                            </h3>
                            <p style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#444', lineHeight: '1.6' }}>
                                {cert.description}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.95rem', color: '#666', fontFamily: 'Epilogue', fontWeight: '600' }}>
                                    issued by: {cert.issuer}
                                </span>
                                <span style={{ fontSize: '1.1rem', color: 'var(--color-dark)', fontFamily: 'Epilogue', fontWeight: '700' }}>
                                    {cert.year}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link href="/certificates" className="nav-work-btn" style={{ marginTop: '0', textDecoration: 'none' }}>
                    <span className="nav-work-btn__text" style={{ fontSize: '1.3rem', padding: '12px 30px' }}>
                        view all credentials
                    </span>
                </Link>
            </div>
        </section>
    );
}
