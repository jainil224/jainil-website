'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import Link from 'next/link';

import { PROJECTS_DATA } from '@/lib/projectsData';

export default function WorkPage() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate underline path on mount
        gsap.to('.title-underline-svg path', {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.3
        });

        // Fade in project cards on scroll
        gsap.utils.toArray('.work-project-card').forEach((card) => {
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
        const cards = document.querySelectorAll('.work-project-card');
        const cleanups = [];

        cards.forEach((card) => {
            const badge = card.querySelector('.work-project-card__badge');
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
                            selected <span className="italic-text">projects.</span>
                        </h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="220" viewBox="0 0 159 17" fill="none" className="title-underline-svg" style={{ color: 'var(--color-pink)' }}>
                            <path d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </div>

                    {/* Project Grid */}
                    <div className="work-grid">
                        {PROJECTS_DATA.map((project, i) => {
                            return (
                                <Link href={`/work/${project.slug}`} key={i} className="work-project-card">
                                    <>
                                        <div className="work-project-card__img-wrap">
                                            <img 
                                                src={project.img} 
                                                alt={project.title} 
                                                className="work-project-card__img" 
                                                loading="lazy" 
                                            />
                                        </div>
                                        <div className="work-project-card__text">
                                            <span className={`work-project-card__badge ${project.badgeClass}`}>
                                                {project.badge}
                                            </span>
                                            <h2 className="work-project-card__title">
                                                {project.title}
                                            </h2>
                                            {project.download && (
                                                <div className="work-project-card__download-btn">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                                    </svg>
                                                    download excel
                                                </div>
                                            )}
                                        </div>
                                    </>
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
