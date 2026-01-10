import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
    orientation = "horizontal",
}: {
    items: { title: string; icon: React.ReactNode; href?: string; onClick?: () => void }[];
    desktopClassName?: string;
    mobileClassName?: string;
    orientation?: "horizontal" | "vertical";
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} orientation={orientation} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href?: string; onClick?: () => void }[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    transition: {
                                        delay: idx * 0.05,
                                    },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                            >
                                {item.onClick ? (
                                    <button
                                        onClick={() => {
                                            item.onClick?.();
                                            setOpen(false);
                                        }}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"
                                    >
                                        <div className="h-4 w-4">{item.icon}</div>
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href || '#'}
                                        key={item.title}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"
                                    >
                                        <div className="h-4 w-4">{item.icon}</div>
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"
            >
                <IconLayoutNavbarCollapse className="h-5 w-5 text-muted-foreground" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
    orientation = "horizontal",
}: {
    items: { title: string; icon: React.ReactNode; href?: string; onClick?: () => void }[];
    className?: string;
    orientation?: "horizontal" | "vertical";
}) => {
    let mouse = useMotionValue(Infinity);
    const isVertical = orientation === "vertical";

    return (
        <motion.div
            onMouseMove={(e) => mouse.set(isVertical ? e.pageY : e.pageX)}
            onMouseLeave={() => mouse.set(Infinity)}
            className={cn(
                "hidden md:flex gap-4 rounded-2xl bg-muted px-4 pb-3",
                isVertical ? "flex-col items-center h-auto w-16 py-4" : "mx-auto h-16 items-end",
                className,
            )}
        >
            {items.map((item) => (
                <IconContainer mouse={mouse} key={item.title} {...item} orientation={orientation} />
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouse,
    title,
    icon,
    href,
    onClick,
    orientation,
}: {
    mouse: MotionValue;
    title: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
    orientation?: "horizontal" | "vertical";
}) {
    let ref = useRef<HTMLDivElement>(null);
    const isVertical = orientation === "vertical";

    let distance = useTransform(mouse, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };

        if (isVertical) {
            return val - bounds.y - bounds.height / 2;
        } else {
            return val - bounds.x - bounds.width / 2;
        }
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [30, 60, 30]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [30, 60, 30]);

    let widthTransformIcon = useTransform(distance, [-150, 0, 150], [15, 30, 15]);
    let heightTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [15, 30, 15],
    );

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    let widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    const motionContent = (
        <motion.div
            ref={ref}
            style={{ width, height }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex aspect-square items-center justify-center rounded-full bg-accent border border-border"
        >
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, [isVertical ? 'x' : 'y']: 10, [isVertical ? 'right' : 'x']: isVertical ? '100%' : '-50%' }}
                        animate={{ opacity: 1, [isVertical ? 'x' : 'y']: 0, [isVertical ? 'right' : 'x']: isVertical ? '100%' : '-50%' }}
                        exit={{ opacity: 0, [isVertical ? 'x' : 'y']: 2, [isVertical ? 'right' : 'x']: isVertical ? '100%' : '-50%' }}
                        style={isVertical ? { right: '120%', top: '50%', y: '-50%' } : { left: '50%', top: '-32px' }}
                        className={cn(
                            "absolute w-fit rounded-md border border-border bg-popover px-2 py-0.5 text-xs whitespace-pre text-popover-foreground z-50",
                            isVertical ? "mr-2" : ""
                        )}
                    >
                        {title}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                style={{ width: widthIcon, height: heightIcon }}
                className="flex items-center justify-center"
            >
                {icon}
            </motion.div>
        </motion.div>
    );

    if (onClick) {
        return (
            <button onClick={onClick} className="focus:outline-none">
                {motionContent}
            </button>
        );
    }

    return (
        <Link href={href || '#'}>
            {motionContent}
        </Link>
    );
}
