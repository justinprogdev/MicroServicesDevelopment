import { Form, Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function LoginBanner() {
  const user = useOptionalUser();
  return (
    <div>
      {user ? (
        <span className="flex">
          <p className="mr-8 flex items-center justify-center">{user.email}</p>
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Logout
            </button>
          </Form>
        </span>
      ) : (
        <span className="flex">
          <Link
            to="/login?redirectTo=/courses"
            className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600  "
          >
            Log In
          </Link>
          <Link
            to="/join"
            className="ml-8 flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
          >
            Sign up
          </Link>
        </span>
      )}
    </div>
  );
}
