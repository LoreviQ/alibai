import { redirect } from "@remix-run/node";

import { getSupabaseAuth } from "~/utils/db.server";

export async function action({ request }: { request: Request }) {
    const headers = new Headers();
    const supabaseAuth = getSupabaseAuth(request);
    await supabaseAuth.auth.signOut();
    return redirect("/", {
        headers,
    });
}
