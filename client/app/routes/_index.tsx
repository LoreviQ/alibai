import type { MetaFunction } from "@remix-run/node";
import { Hero, FeatureCard } from "~/components/cards";
import { CoinIcon, BuildingIcon, VerifiedIcon } from "~/components/icons";

export const meta: MetaFunction = () => {
    return [
        { title: "Electryon - BTC-Backed Stablecoin & Fractional Investment Platform" },
        {
            name: "description",
            content:
                "Discover Electryon's BTC-backed stablecoin and invest in fractional shares of promising businesses.",
        },
    ];
};

export default function Index() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <Hero />
            <div className="container mx-auto px-4 py-20 bg-gray-800/50">
                <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    <FeatureCard
                        header="Personality Mirroring"
                        description="Our AI learns from your existing posts to perfectly match your writing style and tone of voice."
                        icon={<CoinIcon />}
                        iconBgColor="bg-blue-500/20"
                    />
                    <FeatureCard
                        header="Multi-Platform Integration"
                        description="Seamlessly manage your presence across Twitter, LinkedIn, Instagram, and more from a single dashboard."
                        icon={<BuildingIcon />}
                        iconBgColor="bg-purple-500/20"
                    />
                    <FeatureCard
                        header="Full Customization"
                        description="Control exactly how your AI behaves, what it posts, and when it engages with your audience."
                        icon={<VerifiedIcon />}
                        iconBgColor="bg-green-500/20"
                    />
                </div>
            </div>
        </div>
    );
}
