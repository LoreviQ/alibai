import { type Provider, createClient } from "@supabase/supabase-js";
import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import { getSupabaseAuth } from "~/utils/db.server";
import { GithubIcon } from "~/components/icons";

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const provider = formData.get("provider");
    const { supabase, headers } = getSupabaseAuth(request);
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider as Provider,
            options: {
                redirectTo: `${process.env.APP_URL}/auth-callback`,
            },
        });
        if (error) throw error;
        return redirect(data.url, { headers });
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
                <input type="hidden" name="provider" value="github" />
                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-900 rounded-lg font-semibold transition-colors flex items-center justify-center gap-4"
                >
                    <GithubIcon />
                    Login with GitHub
                </button>
            </Form>
        </div>
    );
}
