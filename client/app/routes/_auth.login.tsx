import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import type { AuthCookie } from "~/utils/cookies";
import { authStorage } from "~/utils/cookies";

export async function action({ request }: { request: Request }) {
    try {
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
    } catch (error) {
        console.error(error);
        throw new Response("Failed to complete authentication", { status: 500 });
    }
}

export default function Login() {
    return (
        <Form method="post" className="w-full max-w-md p-8 rounded-xl bg-theme-bg-card border border-theme-primary">
            <h3 className="text-2xl text-center font-semibold mb-6">Sign In</h3>
            <div className="space-y-4">
                <button
                    type="submit"
                    className="w-full mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
                >
                    Login
                </button>
            </div>
        </Form>
    );
}
