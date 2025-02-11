import type { LoaderFunctionArgs } from "@remix-run/node";
import { useSearchParams, Link } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const error = url.searchParams.get("error");
    const errorDescription = url.searchParams.get("error_description");

    return Response.json({
        error: error || "Authentication Error",
        errorDescription: errorDescription || "There was a problem authenticating your account.",
    });
}

export default function AuthError() {
    const [searchParams] = useSearchParams();
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">{error || "Authentication Error"}</h1>
                    <p className="mt-2 text-gray-600">
                        {errorDescription || "There was a problem authenticating your account."}
                    </p>
                </div>

                <div className="flex justify-center mt-6">
                    <Link to="/login" className="text-blue-600 hover:text-blue-800">
                        Return to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
