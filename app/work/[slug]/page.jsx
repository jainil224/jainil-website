'use client';

import { useEffect, use } from 'react';
import { gsap } from 'gsap';
import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import Link from 'next/link';
import { PROJECTS_DATA } from '@/lib/projectsData';

export default function ProjectDetailPage({ params }) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;
    const project = PROJECTS_DATA.find((p) => p.slug === slug);

    useEffect(() => {
        if (!project) return;

        // Reset scroll position to top immediately when page loads
        const lenis = window.__lenis;
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }

        // Animate elements on load
        const tl = gsap.timeline();
        tl.fromTo('.project-back-btn', 
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
        )
        .fromTo('.project-header-title',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
        )
        .fromTo('.project-meta-item',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
            '-=0.4'
        )
        .fromTo('.project-showcase-media',
            { scale: 0.95, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
            '-=0.4'
        )
        .fromTo('.animate-slide-up',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
            '-=0.6'
        );

        // Draw underline svg if it exists
        gsap.to('.title-underline-svg path', {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.4
        });
    }, [project]);

    if (!project) {
        return (
            <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'sans-serif' }}>
                <h2>Project not found</h2>
                <Link href="/work" style={{ color: 'var(--color-pink)' }}>Back to work</Link>
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
                    
                    {/* Back to Work Navigation */}
                    <Link href="/work" className="project-back-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        back to projects
                    </Link>

                    {/* Header Title & Meta Grid */}
                    <div className="project-header-grid">
                        <h1 className="project-header-title">
                            {project.title}
                        </h1>
                        <div className="project-meta-block">
                            <div className="project-meta-item">
                                <span className="project-meta-label">client</span>
                                <span className="project-meta-val">{project.client}</span>
                            </div>
                            <div className="project-meta-item">
                                <span className="project-meta-label">role</span>
                                <span className="project-meta-val">{project.role}</span>
                            </div>
                            <div className="project-meta-item">
                                <span className="project-meta-label">year</span>
                                <span className="project-meta-val">{project.year}</span>
                            </div>
                            <div className="project-meta-item">
                                <span className="project-meta-label">category</span>
                                <span className={`work-project-card__badge ${project.badgeClass}`} style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
                                    {project.badge}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Showcase Image */}
                    <div className="project-showcase-media project-showcase-contain">
                        <img 
                            src={project.img} 
                            alt={project.title} 
                            className="project-showcase-img"
                        />
                    </div>

                    {/* Details Column Info Grid */}
                    <div className="project-info-grid">
                        <div className="project-desc-col animate-slide-up">
                            <div>
                                <h2 className="project-section-title">overview</h2>
                                <p className="project-description-text">
                                    {project.description}
                                </p>
                            </div>

                            {project.features && project.features.length > 0 && (
                                <div>
                                    <h2 className="project-section-title" style={{ marginTop: '20px' }}>key features</h2>
                                    <ul className="project-features-list">
                                        {project.features.map((feature, i) => (
                                            <li key={i} className="project-feature-item">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="project-details-col animate-slide-up">
                            <div>
                                <h2 className="project-section-title">technologies used</h2>
                                <div className="project-tech-tags">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="project-tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="project-action-card">
                                <h3 className="project-action-headline">
                                    experience the project
                                </h3>
                                {project.download ? (
                                    <a 
                                        href={project.download} 
                                        download={project.filename || "dashboard.xlsx"} 
                                        className="project-action-btn btn-excel"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '4px' }}>
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                        </svg>
                                        download excel file
                                    </a>
                                ) : (
                                    <a 
                                        href={project.url || "#"} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="project-action-btn"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ marginRight: '4px' }}>
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                        view live demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
