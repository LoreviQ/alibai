import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";

export async function loader({ request }: LoaderFunctionArgs) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const next = requestUrl.searchParams.get("next") || "/dashboard";
    const headers = new Headers();
    console.log(requestUrl);
    if (code) {
        const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
            cookies: {
                getAll() {
                    return parseCookieHeader(request.headers.get("Cookie") ?? "");
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        headers.append("Set-Cookie", serializeCookieHeader(name, value, options))
                    );
                },
            },
        });

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return redirect(next, { headers });
        }
    }

    // return the user to an error page with instructions
    return redirect("/auth-code-error", { headers });
}
