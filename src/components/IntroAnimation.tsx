import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroAnimationProps {
    onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
    useEffect(() => {
        // Updated total duration to 3s
        const timer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="relative flex items-center font-bold text-4xl md:text-6xl tracking-tight">
                {/* Jainil - enters from left */}
                <motion.span
                    initial={{ x: -250, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        duration: 1.0,
                        ease: "easeOut", // Smooth ease out, no bounce
                    }}
                    className="mr-3 inline-block"
                >
                    Jainil
                </motion.span>

                {/* Patel - enters from right */}
                <motion.span
                    initial={{ x: 250, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        duration: 1.0,
                        ease: "easeOut", // Smooth ease out, no bounce
                    }}
                    className="inline-block"
                >
                    Patel
                </motion.span>
            </div>
        </motion.div>
    );
};
