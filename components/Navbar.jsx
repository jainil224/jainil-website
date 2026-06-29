'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { WIGGLE_CONFIG } from '@/lib/data';
import Link from 'next/link';
import { PROJECTS_DATA } from '@/lib/projectsData';
import { CERTIFICATES_DATA } from '@/lib/certificatesData';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); }
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

export default function Navbar() {
    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const contentSection = document.querySelector('.content-section');
        const footerEl = document.querySelector('.main-footer');

        // Route-based initial color: white text (on-dark) for home, dark text (on-light) for others
        const isHome = window.location.pathname === '/';
        if (navbar) {
            if (isHome) {
                navbar.classList.add('on-dark');
                navbar.classList.remove('on-light');
            } else {
                navbar.classList.add('on-light');
                navbar.classList.remove('on-dark');
            }
        }

        const updateNavbarColor = () => {
            if (!navbar || !contentSection || !footerEl) return;
            const scrollPos = window.scrollY + navbar.offsetHeight / 2;
            const contentTop = contentSection.getBoundingClientRect().top + window.scrollY;

            const showreelSection = document.querySelector('#showreel-section');
            const showreelTop = showreelSection ? showreelSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const serviceCardsSection = document.querySelector('.service-cards-wrapper');
            const serviceCardsTop = serviceCardsSection ? serviceCardsSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const doubleMarquee = document.querySelector('.Double-marquee');
            const doubleMarqueeTop = doubleMarquee ? doubleMarquee.getBoundingClientRect().top + window.scrollY : Infinity;
            const footerTop = footerEl.getBoundingClientRect().top + window.scrollY;

            if (scrollPos >= footerTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= doubleMarqueeTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= serviceCardsTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= showreelTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= contentTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            }
        };

        window.addEventListener('scroll', updateNavbarColor);
        updateNavbarColor();

        // Wiggle on logo and whatsapp
        const cleanups = [];
        const logoTruus = document.querySelector('.logo-truus');
        if (logoTruus) cleanups.push(initWiggle(logoTruus, WIGGLE_CONFIG.logoTruus));

        const overlay = document.querySelector('.nav-overlay');
        if (overlay) {
            gsap.set(overlay, { opacity: 0, visibility: 'hidden' });
        }
        const showOverlay = () => {
            if (overlay) {
                gsap.set(overlay, { visibility: 'visible' });
                gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
            }
        };
        const hideOverlay = () => {
            if (overlay) {
                gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => gsap.set(overlay, { visibility: 'hidden' }) });
            }
        };

        // ─── Navbar Left (Work) Hover ───
        const navLeft = document.querySelector('.nav-left');
        const workBox = document.querySelector('.nav-work-box');
        const workBlob = document.querySelector('.nav-bar__work-blob-svg');

        if (navLeft && workBox && workBlob) {
            const workInner = workBox.querySelector('.nav-popout-inner');
            const workItems = workInner ? Array.from(workInner.children) : [];

            // Temporarily show to measure both the box AND the blob icon center
            gsap.set(workBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const boxRect = workBox.getBoundingClientRect();
            const blobRect = workBlob.getBoundingClientRect();
            // Icon center relative to the box's own top-left
            const originX = (blobRect.left + blobRect.width / 2) - boxRect.left;
            const originY = (blobRect.top + blobRect.height / 2) - boxRect.top;
            const workOrigin = `${originX}px ${originY}px`;

            // Start collapsed, scaling FROM the icon center
            gsap.set(workBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: workOrigin
            });
            gsap.set(workItems, { y: 10, opacity: 0 });
            gsap.set(workBlob, { transformOrigin: 'center center' });

            const onEnterLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                showOverlay();

                // Fast 360 blob spin — like it's spinning then releasing the box
                gsap.to(workBlob, { rotation: '+=360', duration: 0.7, ease: 'power3.inOut' });

                gsap.set(workBox, { visibility: 'visible' });
                // Box grows out smoothly from the icon center
                gsap.fromTo(workBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(workItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                hideOverlay();

                gsap.to(workBlob, { rotation: 0, duration: 0.5, ease: 'power2.out' });

                // Items fade quickly
                gsap.to(workItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into icon smoothly
                gsap.to(workBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(workBox, { visibility: 'hidden' })
                });
            };

            navLeft.addEventListener('mouseenter', onEnterLeft);
            navLeft.addEventListener('mouseleave', onLeaveLeft);
            cleanups.push(() => {
                navLeft.removeEventListener('mouseenter', onEnterLeft);
                navLeft.removeEventListener('mouseleave', onLeaveLeft);
            });
        }

        // ─── Navbar Right (Certificates) Hover ───
        const navRight = document.querySelector('.nav-right');
        const certBox = document.querySelector('.nav-cert-box');
        const certBlob = navRight?.querySelector('.nav-bar__work-blob-svg');

        if (navRight && certBox && certBlob) {
            const certInner = certBox.querySelector('.nav-popout-inner');
            const certItems = certInner ? Array.from(certInner.children) : [];

            // Temporarily show to measure both the box AND the blob icon center
            gsap.set(certBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const boxRect = certBox.getBoundingClientRect();
            const blobRect = certBlob.getBoundingClientRect();
            // Icon center relative to the box's own top-left
            const originX = (blobRect.left + blobRect.width / 2) - boxRect.left;
            const originY = (blobRect.top + blobRect.height / 2) - boxRect.top;
            const certOrigin = `${originX}px ${originY}px`;

            // Start collapsed, scaling FROM the icon center
            gsap.set(certBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: certOrigin
            });
            gsap.set(certItems, { y: 10, opacity: 0 });
            gsap.set(certBlob, { transformOrigin: 'center center' });

            const onEnterRight = () => {
                gsap.killTweensOf(certBox);
                gsap.killTweensOf(certItems);
                gsap.killTweensOf(certBlob);
                showOverlay();

                // Fast 360 blob spin
                gsap.to(certBlob, { rotation: '+=360', duration: 0.7, ease: 'power3.inOut' });

                gsap.set(certBox, { visibility: 'visible' });
                // Box grows out smoothly from the icon center
                gsap.fromTo(certBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(certItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveRight = () => {
                gsap.killTweensOf(certBox);
                gsap.killTweensOf(certItems);
                gsap.killTweensOf(certBlob);
                hideOverlay();

                gsap.to(certBlob, { rotation: 0, duration: 0.5, ease: 'power2.out' });

                // Items fade quickly
                gsap.to(certItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into icon smoothly
                gsap.to(certBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(certBox, { visibility: 'hidden' })
                });
            };

            navRight.addEventListener('mouseenter', onEnterRight);
            navRight.addEventListener('mouseleave', onLeaveRight);
            cleanups.push(() => {
                navRight.removeEventListener('mouseenter', onEnterRight);
                navRight.removeEventListener('mouseleave', onLeaveRight);
            });
        }

        // ─── Work / Cert Item: badge wiggle + image tilt on hover ───
        const hoverItems = document.querySelectorAll('.nav-work-item, .nav-cert-item');
        hoverItems.forEach(item => {
            const badge = item.querySelector('.nav-work-badge');
            const img = item.querySelector('.nav-work-item__img');
            let wiggleTween;

            const onItemEnter = () => {
                // Wiggle badge intensity 2
                if (badge) {
                    gsap.set(badge, { transformOrigin: 'center center' });
                    wiggleTween = gsap.to(badge, { rotation: 5, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
                // Tilt image slightly right
                if (img) gsap.to(img, { rotation: 16, scale: 1.15, duration: 0.25, ease: 'power2.out' });
            };
            const onItemLeave = () => {
                if (wiggleTween) { wiggleTween.kill(); }
                if (badge) gsap.to(badge, { rotation: 0, duration: 0.3, ease: 'power2.out' });
                if (img) gsap.to(img, { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
            };
            item.addEventListener('mouseenter', onItemEnter);
            item.addEventListener('mouseleave', onItemLeave);
            cleanups.push(() => {
                item.removeEventListener('mouseenter', onItemEnter);
                item.removeEventListener('mouseleave', onItemLeave);
            });
        });

        // ─── All Our Work / Credentials btn: wiggle intensity 4 ───
        const workBtns = document.querySelectorAll('.nav-work-btn');
        workBtns.forEach((btn) => {
            let btnWiggle;
            const onBtnEnter = () => {
                const btnText = btn.querySelector('.nav-work-btn__text');
                if (btnText) {
                    gsap.set(btnText, { transformOrigin: 'center center', display: 'inline-block' });
                    btnWiggle = gsap.to(btnText, { rotation: 4, duration: 0.12, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
            };
            const onBtnLeave = () => {
                const btnText = btn.querySelector('.nav-work-btn__text');
                if (btnWiggle) { btnWiggle.kill(); }
                if (btnText) gsap.to(btnText, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            };
            btn.addEventListener('mouseenter', onBtnEnter);
            btn.addEventListener('mouseleave', onBtnLeave);
            cleanups.push(() => {
                btn.removeEventListener('mouseenter', onBtnEnter);
                btn.removeEventListener('mouseleave', onBtnLeave);
            });
        });

        return () => {
            window.removeEventListener('scroll', updateNavbarColor);
            cleanups.forEach(fn => fn && fn());
        };
    }, []);

    return (
        <>
            <div className="nav-overlay"></div>
            <nav className="navbar">
                <div className="nav-left" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <Link href="/work" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="logo-work-container">
                                <img src="/assets/Navbar SVG/nav-work-blob.svg" width="60" height="55" className="nav-bar__work-blob-svg" alt="" aria-hidden="true" />
                                <span className="logo-work-text">project</span>
                            </div>
                        </Link>

                        {/* Pop-out Box for Left Side */}
                        <div className="nav-popout nav-work-box">
                            <div className="nav-popout-inner">
                                {PROJECTS_DATA.slice(0, 5).map((project, idx) => (
                                    <Link href={`/work/${project.slug}`} key={idx} className="nav-work-item">
                                        <div className="nav-work-item__img-wrap">
                                            <img src={project.img} loading="eager" alt={project.title} className="nav-work-item__img" />
                                        </div>
                                        <div className="nav-work-item__text">
                                            <span className={`nav-work-badge ${project.badgeClass}`}>{project.badge}</span>
                                            <h4 className="nav-work-title">{project.title}</h4>
                                        </div>
                                    </Link>
                                ))}
                                <Link href="/work" className="nav-work-btn"><span className="nav-work-btn__text">All our projects</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Link href="/" className="logo-truus nav-center" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer", fontFamily: 'Epilogue', fontWeight: '900', letterSpacing: '-1.5px', textTransform: 'lowercase', color: 'currentColor', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: 'auto', textDecoration: 'none' }}>
                    jainil.
                </Link>
                 <div className="nav-right" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <Link href="/certificates" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="logo-work-container nav-cert-container">
                                <img src="/assets/Navbar SVG/nav-work-blob.svg" width="60" height="55" className="nav-bar__work-blob-svg" alt="" aria-hidden="true" style={{ filter: 'hue-rotate(120deg)' }} />
                                <span className="logo-work-text">certificate</span>
                            </div>
                        </Link>

                        {/* Pop-out Box for Right Side (Certificates) */}
                        <div className="nav-popout nav-cert-box">
                            <div className="nav-popout-inner">
                                {CERTIFICATES_DATA.slice(0, 5).map((cert, idx) => (
                                    <Link href={`/certificates/${cert.slug}`} key={idx} className="nav-cert-item">
                                        <div className="nav-work-item__img-wrap">
                                            <img src={cert.img} loading="eager" alt={cert.title} className="nav-work-item__img" />
                                        </div>
                                        <div className="nav-work-item__text">
                                            <span className={`nav-work-badge ${cert.badgeClass}`}>{cert.category}</span>
                                            <h4 className="nav-work-title">{cert.title}</h4>
                                        </div>
                                    </Link>
                                ))}
                                <Link href="/certificates" className="nav-work-btn"><span className="nav-work-btn__text">All our credentials</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
