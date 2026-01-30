import { cn } from "@/lib/utils";


type Color = string | string[];

export interface ShineBorderProps {
    borderRadius?: number;
    borderWidth?: number;
    duration?: number;
    color?: Color;
    className?: string;
    children: React.ReactNode;
}

export const ShineBorder: React.FC<ShineBorderProps> = ({
    borderRadius = 8,
    borderWidth = 2,
    duration = 14,
    color = "#000000",
    className,
    children,
}) => {
    return (
        <div
            style={
                {
                    "--border-radius": `${borderRadius}px`,
                } as React.CSSProperties
            }
            className={cn(
                "relative grid w-full place-items-center rounded-[--border-radius] bg-white p-[1px] text-black dark:bg-neutral-900 dark:text-white overflow-hidden",
                className,
            )}
        >
            <div
                style={
                    {
                        "--border-width": `${borderWidth}px`,
                        "--border-radius": `${borderRadius}px`,
                        "--shine-pulse-duration": `${duration}s`,
                        "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                        "--background-radial-gradient": `radial-gradient(transparent,transparent, ${color instanceof Array ? color.join(",") : color},transparent,transparent)`,
                    } as React.CSSProperties
                }
                className={`before:bg-shine-size before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] motion-safe:before:animate-[shine-pulse_var(--shine-pulse-duration)_infinite_linear]`}
            ></div>
            <div className="w-full h-full rounded-[--border-radius] bg-card text-card-foreground">
                {children}
            </div>
        </div>
    );
}
