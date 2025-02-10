import { redirect, type LoaderFunction } from "@remix-run/node";
import { supabase } from "~/utils/db.server";
import type { AuthCookie } from "~/utils/cookies";
import { authStorage } from "~/utils/cookies";

export const loader: LoaderFunction = async ({ request }) => {
    console.log("Redirect successful");
    return null;
    /*
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (error || !session) {
        return redirect("/login");
    }

    // Create our own session with the data we want
    const cookieSession = await authStorage.getSession();
    const userData: AuthCookie = {
        userid: session.user.id,
        username: session.user.email || session.user.user_metadata.user_name,
        authenticated: true,
    };

    cookieSession.set("user", userData);

    return redirect("/dashboard", {
        headers: {
            "Set-Cookie": await authStorage.commitSession(cookieSession),
        },
    });
    */
};

export default function OAuthCallback() {
    return <div>OAuthCallback</div>;
}
