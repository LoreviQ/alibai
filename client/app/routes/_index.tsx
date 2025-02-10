import type { MetaFunction } from "@remix-run/node";
import { Hero, FeatureCard } from "~/components/cards";
import { BrainAIIcon, NetworkIcon, AutomationIcon } from "~/components/icons";

export const meta: MetaFunction = () => {
    return [
        { title: "AlibAI - Your Personal AI Social Media Manager" },
        {
            name: "description",
            content: "Discover AlibAI's AI Agent managed social media presence and engagement.",
        },
    ];
};

export default function Index() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-theme-bg to-theme-bg-secondary text-white">
            <Hero />
            <div className="container mx-auto px-4 py-10">
                <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    <FeatureCard
                        header="Personality Mirroring"
                        description="Our AI learns from your existing posts to perfectly match your writing style and tone of voice."
                        icon={<BrainAIIcon />}
                        iconBgColor="bg-blue-500/20"
                    />
                    <FeatureCard
                        header="Multi-Platform Integration"
                        description="Seamlessly manage your presence across Twitter, LinkedIn, Instagram, and more from a single dashboard."
                        icon={<NetworkIcon />}
                        iconBgColor="bg-purple-500/20"
                    />
                    <FeatureCard
                        header="Full Customization"
                        description="Control exactly how your AI behaves, what it posts, and when it engages with your audience."
                        icon={<AutomationIcon />}
                        iconBgColor="bg-green-500/20"
                    />
                </div>
            </div>
        </div>
    );
}
