import { useOutletContext } from "@remix-run/react";
import type { User } from "@supabase/supabase-js";

import { GithubIcon } from "~/components/icons";
import { ActionButton } from "~/components/buttons";
import { HeadingBreak } from "~/components/cards";

const PROVIDERS = [
    { id: "discord", name: "Discord", icon: undefined }, // Add appropriate icon paths
    { id: "facebook", name: "Facebook", icon: undefined },
    { id: "github", name: "GitHub", icon: <GithubIcon /> },
    { id: "google", name: "Google", icon: undefined },
    { id: "twitch", name: "Twitch", icon: undefined },
    { id: "twitter", name: "Twitter", icon: undefined },
] as const;

export default function Settings() {
    const userData = useOutletContext<User>();
    const connectedProviders = PROVIDERS.filter((provider) =>
        userData.identities?.some((identity) => identity.provider === provider.id)
    );

    const nonConnectedProviders = PROVIDERS.filter(
        (provider) => !userData.identities?.some((identity) => identity.provider === provider.id)
    );
    return (
        <div className="bg-theme-bg-card/70 rounded-lg p-6">
            <h1 className="text-xl font-semibold mb-4">Accounts</h1>
            <HeadingBreak label="Connected Accounts" colour="theme-secondary" />
            <div className="space-y-2">
                {connectedProviders.map((provider) => (
                    <ProviderDetails
                        id={provider.id}
                        name={provider.name}
                        icon={provider.icon}
                        connected={true}
                        key={provider.id}
                    />
                ))}
            </div>
            <HeadingBreak label="Other Accounts" colour="red-500" />
            <div className="space-y-2">
                {nonConnectedProviders.map((provider) => (
                    <ProviderDetails
                        id={provider.id}
                        name={provider.name}
                        icon={provider.icon}
                        connected={false}
                        key={provider.id}
                    />
                ))}
            </div>
        </div>
    );
}

interface ProviderDetailsProps {
    id: string;
    name: string;
    icon?: JSX.Element;
    connected: boolean;
}
function ProviderDetails({ id, name, icon, connected }: ProviderDetailsProps) {
    return (
        <div key={id} className="flex items-center justify-between py-2 px-4 bg-theme-surface-secondary rounded-lg">
            <div className="flex items-center space-x-3">
                {icon}
                <span className="font-medium">{name}</span>
            </div>

            {connected ? (
                <ActionButton
                    label="Disconnect"
                    className="bg-red-500 hover:bg-red-400"
                    onClick={() => {
                        /* Add disconnect handler */
                    }}
                />
            ) : (
                <ActionButton
                    label="Connect"
                    className="bg-theme-primary hover:bg-theme-primary-hover"
                    onClick={() => {
                        /* Add connect handler */
                    }}
                />
            )}
        </div>
    );
}
