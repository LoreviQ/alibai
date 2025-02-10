import { Link } from "@remix-run/react";

export function Hero({}) {
    return (
        <div className="container mx-auto px-4 pt-20 pb-32">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-secondary">
                    AlibAI
                </h1>
                <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-secondary">
                    Your Personal AI Social Media Manager
                </h2>
                <p className="text-xl text-white mb-12">
                    Let AI manage your social media presence while maintaining your authentic voice and style.
                    Seamlessly integrate across multiple platforms.
                </p>
                <div className="flex gap-6 justify-center">
                    <Link
                        to="/login"
                        className="px-8 py-3 bg-theme-primary hover:bg-theme-primary-hover rounded-lg font-semibold transition-colors"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/partners"
                        className="px-8 py-3 border border-gray-500 hover:border-theme-primary rounded-lg font-semibold transition-colors"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
    );
}

interface FeatureCardProps {
    header: string;
    description: string;
    icon: React.ReactNode;
    iconBgColor?: string;
}
export function FeatureCard({ header, description, icon, iconBgColor = "bg-blue-500/20" }: FeatureCardProps) {
    return (
        <div className="p-6 rounded-xl bg-theme-bg-card border border-theme-secondary">
            <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center mb-4`}>{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{header}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    );
}
