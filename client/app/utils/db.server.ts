import { createClient } from '@supabase/supabase-js'
import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import { redirect} from "@remix-run/node";

import type { User } from '~/types/user';

export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
)

// For auth-related operations
export function getSupabaseAuth(request: Request) {
    const headers = new Headers();
    return createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
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
        }
    );
}

// Helper for protected routes
export async function requireAuth(request: Request) : Promise<User> {
    const supabaseAuth = getSupabaseAuth(request);
    const { data: { session } } = await supabaseAuth.auth.getSession();
    
    if (!session) {
        throw  redirect("/login");
    }

    const { data: profile } = await supabaseAuth
        .from('user_profiles')
        .select('username')
        .eq('id', session.user.id)
        .single();

    return { 
        id: session.user.id,
        username: profile?.username,
    } satisfies User;
}