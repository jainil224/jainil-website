"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface MeteorsProps {
    number?: number;
}

export const Meteors = ({ number = 20 }: MeteorsProps) => {
    const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
        [],
    );

    useEffect(() => {
        const styles = [...new Array(number)].map(() => ({
            top: Math.floor(Math.random() * -100) - 10 + "px",
            left: Math.floor(Math.random() * 140) - 20 + "%",
            animationDelay: Math.random() * 1 + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
        }));
        setMeteorStyles(styles);
    }, [number]);

    return (
        <>
            {[...meteorStyles].map((style, idx) => (
                // Meteor Head
                <span
                    key={idx}
                    className={cn(
                        "pointer-events-none absolute h-0.5 w-0.5 animate-meteor-effect rounded-[9999px] bg-purple-500 shadow-[0_0_0_1px_#ffffff10]",
                    )}
                    style={style}
                >
                    {/* Meteor Tail */}
                    <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-purple-500 to-transparent" />
                </span>
            ))}
        </>
    );
};
