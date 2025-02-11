import { redirect } from "@remix-run/node";

import { getSupabaseAuth } from "~/utils/db.server";

export async function action({ request }: { request: Request }) {
    const headers = request.headers;
    const supabaseAuth = getSupabaseAuth(headers);
    await supabaseAuth.auth.signOut();
    return redirect("/", {
        headers,
    });
}
