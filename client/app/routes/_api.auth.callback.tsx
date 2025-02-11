import { redirect, type LoaderFunctionArgs } from "@remix-run/node";

import { getSupabaseAuth } from "~/utils/db.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const next = requestUrl.searchParams.get("next") || "/dashboard";
    const headers = new Headers();
    console.log(requestUrl);
    if (code) {
        const supabaseAuth = getSupabaseAuth(request);

        const { error } = await supabaseAuth.auth.exchangeCodeForSession(code);

        if (!error) {
            return redirect(next, { headers });
        }
        return null;
    }

    return null;
}
