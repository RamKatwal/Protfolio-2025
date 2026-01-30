import Experience from "@/app/components/common/Experience";
import ScrollReveal from "@/app/components/common/ScrollReveal";

export default function ExperiencePage() {
    return (
        <div className="flex items-start w-full max-w-2xl min-h-[calc(100vh-56px)] border-r border-border">
            <ScrollReveal delay={0}>
                <Experience />
            </ScrollReveal>
        </div>
    );
}
