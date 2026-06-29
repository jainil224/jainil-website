'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hls from 'hls.js';

export default function ScrollVideo({ src, className = '' }) {
    const videoRef = useRef(null);
    const wrapperRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Normalize the URL: support both HLS/MP4 directly and Cloudinary embed players
    const getStreamUrl = (inputUrl) => {
        if (!inputUrl) return '';
        if (inputUrl.includes('player.cloudinary.com/embed')) {
            try {
                const urlObj = new URL(inputUrl);
                const cloudName = urlObj.searchParams.get('cloud_name');
                const publicId = urlObj.searchParams.get('public_id');
                if (cloudName && publicId) {
                    // Use direct high-quality MP4 for sharp, blur-free scroll seeking
                    return `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`;
                }
            } catch (e) {
                console.error('Error parsing Cloudinary embed URL:', e);
            }
        }
        return inputUrl;
    };

    const resolvedSrc = getStreamUrl(src);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const video = videoRef.current;
        const wrapper = wrapperRef.current;
        if (!video || !wrapper || !resolvedSrc) return;

        let hls = null;

        const updateBufferProgress = () => {
            if (video.duration) {
                const buffered = video.buffered;
                let bufferedEnd = 0;
                if (buffered.length > 0) {
                    bufferedEnd = buffered.end(buffered.length - 1);
                }
                const percent = Math.min((bufferedEnd / video.duration) * 100, 100);
                setProgress(Math.round(percent));
            }
        };

        // 1. Initialize HLS or native playback
        const isHls = resolvedSrc.endsWith('.m3u8') || resolvedSrc.includes('.m3u8');
        if (isHls && Hls.isSupported() && !video.canPlayType('application/vnd.apple.mpegurl')) {
            hls = new Hls({
                maxBufferLength: 120,
                maxMaxBufferLength: 600,
                maxBufferSize: 200 * 1024 * 1024,
                startPosition: 0,
                capLevelToPlayerSize: false,
                startLevel: -1,
                autoStartLoad: true,
            });

            // Register events before loading to avoid race conditions
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (hls.levels && hls.levels.length > 0) {
                    const maxLevel = hls.levels.length - 1;
                    hls.currentLevel = maxLevel;
                    hls.startLevel = maxLevel;
                    hls.nextLevel = maxLevel;
                    hls.loadLevel = maxLevel;
                }
            });

            hls.on(Hls.Events.FRAG_BUFFERED, () => {
                updateBufferProgress();
            });

            hls.loadSource(resolvedSrc);
            hls.attachMedia(video);
        } else {
            // Safari (native HLS) or direct MP4/WebM video
            video.src = resolvedSrc;

            const onProgress = () => {
                updateBufferProgress();
            };
            video.addEventListener('progress', onProgress);

            // Clean up listener later
            video._onProgress = onProgress;
        }

        // 2. Hide loading overlay once canplay fires
        const onCanPlay = () => {
            setIsLoading(false);
        };
        video.addEventListener('canplay', onCanPlay);

        // 3. Scroll seek logic with GSAP ScrollTrigger
        let currentTarget = 0;
        let seekPending = false;

        const doSeek = () => {
            if (!video.seeking) {
                video.currentTime = currentTarget;
                seekPending = false;
            } else {
                seekPending = true;
            }
        };

        const onSeeked = () => {
            if (seekPending) {
                doSeek();
            }
        };
        video.addEventListener('seeked', onSeeked);

        const scrollTriggerInstance = ScrollTrigger.create({
            trigger: '.vimeo-hero',
            start: 'top top',
            end: '+=150%',
            pin: '.vimeo-hero',
            pinSpacing: true,
            scrub: true,
            onUpdate: (self) => {
                if (video.duration) {
                    currentTarget = self.progress * video.duration;
                    doSeek();
                }
            },
        });

        return () => {
            if (hls) {
                hls.destroy();
            }
            if (video._onProgress) {
                video.removeEventListener('progress', video._onProgress);
            }
            video.removeEventListener('canplay', onCanPlay);
            video.removeEventListener('seeked', onSeeked);
            scrollTriggerInstance.kill();
        };
    }, [resolvedSrc]);

    return (
        <>
            {isLoading && (
                <div
                    className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black text-white text-2xl font-sans"
                    id="loading-overlay"
                >
                    Loading... {progress}%
                </div>
            )}
            <div
                ref={wrapperRef}
                className={`fixed top-0 left-0 w-full h-full z-0 ${className}`}
            >
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    crossOrigin="anonymous"
                />
            </div>
        </>
    );
}
