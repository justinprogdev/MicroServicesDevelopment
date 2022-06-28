import { Link, NavLink, Outlet } from "@remix-run/react";
import LoginBanner from "~/components/login-banner";
import type { LoaderFunction } from "@remix-run/node";
import { requireUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};
export default function RegistrationsPage() {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <div>
        <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
          <Link to="/registrations">Registrations</Link>
          <LoginBanner></LoginBanner>
        </header>
        <main className="flex h-full bg-white">
          <div className="h-full w-80 border-r bg-gray-50">
            <ol>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block border-b p-4 text-xl hover:font-bold ${
                      isActive ? "bg-white" : ""
                    }`
                  }
                  to="/"
                >
                  Go Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block border-b p-4 text-xl hover:font-bold ${
                      isActive ? "bg-white" : ""
                    }`
                  }
                  to="/courses"
                >
                  Course Catalog
                </NavLink>
              </li>
            </ol>
          </div>
          <div className="min-h-screen flex-1 p-6">
            <Outlet></Outlet>
          </div>
        </main>
      </div>
    </div>
  );
}
