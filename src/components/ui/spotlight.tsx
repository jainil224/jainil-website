"use client";

import { cn } from "@/lib/utils";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";

interface SpotlightContextType {
    mouseX: number;
    mouseY: number;
    setMousePosition: (x: number, y: number) => void;
}

const SpotlightContext = createContext<SpotlightContextType | undefined>(undefined);

export const useSpotlight = () => {
    const context = useContext(SpotlightContext);
    if (!context) {
        throw new Error("useSpotlight must be used within a Spotlight");
    }
    return context;
};

export const Spotlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <SpotlightContext.Provider
            value={{
                mouseX: position.x,
                mouseY: position.y,
                setMousePosition: (x, y) => setPosition({ x, y }),
            }}
        >
            <div
                onMouseMove={handleMouseMove}
                className={cn("relative z-10 w-full overflow-hidden", className)}
            >
                {children}
            </div>
        </SpotlightContext.Provider>
    );
};

export const SpotLightItem = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const { mouseX, mouseY } = useSpotlight();
    const itemRef = useRef<HTMLDivElement>(null);
    const [localCoords, setLocalCoords] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            setLocalCoords({
                x: mouseX - rect.left,
                y: mouseY - rect.top,
            });
        }
    }, [mouseX, mouseY]);

    // You can adjust the logic here to make the spotlight effect relative to the item position
    // or relative to the parent container. 
    // Based on "SpotLightItem", it likely renders a card that reacts to the parent's mouse position.

    // However, often "Spotlight" in this context refers to a spotlight that moves across the grid borders.
    // Let's implement a standard spotlight card effect where the "light" is revealed by the mouse position.

    return (
        <div
            ref={itemRef}
            className={cn(
                "group relative border-neutral-800 bg-neutral-900 overflow-hidden",
                className
            )}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${localCoords.x}px ${localCoords.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                }}
            />
            {children}
        </div>
    );
};
