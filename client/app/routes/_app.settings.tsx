import { useOutletContext } from "@remix-run/react";
import type { User, UserIdentity } from "@supabase/supabase-js";

const PROVIDERS = [
    { id: "discord", name: "Discord", icon: "..." }, // Add appropriate icon paths
    { id: "facebook", name: "Facebook", icon: "..." },
    { id: "github", name: "GitHub", icon: "..." },
    { id: "google", name: "Google", icon: "..." },
    { id: "twitch", name: "Twitch", icon: "..." },
    { id: "twitter", name: "Twitter", icon: "..." },
] as const;

export default function Settings() {
    const userData = useOutletContext<User>();

    const getProviderStatus = (provider: string) => {
        return userData.identities?.some((identity) => identity.provider === provider);
    };

    return (
        <div className="space-y-6">
            <div className="bg-theme-surface rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Linked Accounts</h2>
                <div className="space-y-4">
                    {PROVIDERS.map((provider) => (
                        <div
                            key={provider.id}
                            className="flex items-center justify-between p-4 bg-theme-surface-secondary rounded-lg"
                        >
                            <div className="flex items-center space-x-3">
                                {/* Add provider icon here */}
                                <span className="font-medium">{provider.name}</span>
                            </div>

                            {getProviderStatus(provider.id) ? (
                                <div className="flex items-center">
                                    <span className="text-green-500 mr-2">Connected</span>
                                    <button
                                        className="px-3 py-1 text-sm text-red-500 hover:text-red-400"
                                        onClick={() => {
                                            /* Add disconnect handler */
                                        }}
                                    >
                                        Disconnect
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="px-4 py-2 bg-theme-primary text-white rounded hover:bg-theme-primary-hover"
                                    onClick={() => {
                                        /* Add connect handler */
                                    }}
                                >
                                    Connect
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
