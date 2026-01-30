import { cn } from "@/lib/utils";

interface SharpBorderBeamProps {
    className?: string;
    size?: number;
    duration?: number;
    borderWidth?: number;
    anchor?: number;
    color?: string;
    delay?: number;
    reverse?: boolean;
}

export const SharpBorderBeam = ({
    className,
    size = 200,
    duration = 15,
    anchor = 90,
    borderWidth = 1.5,
    color = "#ffffff",
    delay = 0,
    reverse = false,
}: SharpBorderBeamProps) => {
    return (
        <div
            style={
                {
                    "--size": size,
                    "--duration": duration,
                    "--anchor": anchor,
                    "--border-width": borderWidth,
                    "--color-from": color,
                    "--color-to": color,
                    "--delay": delay,
                } as React.CSSProperties
            }
            className={cn(
                "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",

                // mask styles
                "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",

                // pseudo styles
                "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:calc(var(--delay)*1s)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",

                // FORCE SHARPNESS OVERRIDES
                // Overriding the gradient background with a solid color stop to prevent fade
                "after:[background:linear-gradient(to_left,var(--color-from)_100%,var(--color-from)_100%)]",

                // Ensure no blur
                "after:[filter:none] after:[box-shadow:none]",

                reverse && "after:[animation-direction:reverse]",
                className,
            )}
        />
    );
};
