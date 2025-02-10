import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import type { AuthCookie } from "~/utils/cookies";
import { authStorage } from "~/utils/cookies";
import { supabase } from "~/utils/db.server";

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const loginType = formData.get("loginType");
    console.log(loginType);
    try {
        switch (loginType) {
            case "github":
                const { error } = await supabase.auth.signInWithOAuth({
                    provider: "github",
                    options: {
                        redirectTo: `${process.env.APP_URL}/oauth/callback`,
                    },
                });
                if (error) throw error;
                return null;
            case "test":
                // Default test login
                const session = await authStorage.getSession();
                const userData: AuthCookie = {
                    userid: "1",
                    username: "defaultUser",
                    authenticated: true,
                };
                session.set("user", userData);
                return redirect("/dashboard", {
                    headers: {
                        "Set-Cookie": await authStorage.commitSession(session),
                    },
                });
        }
    } catch (error) {
        console.error(error);
        throw new Response("Failed to complete authentication", { status: 500 });
    }
}

export default function Login() {
    return (
        <div className="w-full max-w-md p-8 rounded-xl bg-theme-bg-card border border-theme-primary space-y-4">
            <h3 className="text-2xl text-center font-semibold">Sign In</h3>
            <Form method="post">
                <input type="hidden" name="loginType" value="github" />
                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-900 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Login with GitHub
                </button>
            </Form>
            <Form method="post">
                <input type="hidden" name="loginType" value="test" />
                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
                >
                    Login
                </button>
            </Form>
        </div>
    );
}
