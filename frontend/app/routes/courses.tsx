import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { getCourseListItems } from "~/models/courses.server";
import { json } from "@remix-run/node";
import LoginBanner from "~/components/login-banner";
import { useOptionalUser } from "~/utils";
type LoaderData = {
  courseListItems: Awaited<ReturnType<typeof getCourseListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const courseListItems = await getCourseListItems();
  return json<LoaderData>({ courseListItems });
};
export default function CoursesPage() {
  const data = useLoaderData() as LoaderData;
  const user = useOptionalUser();
  return (
    <div className="flex h-full min-h-screen flex-col">
      <div>
        <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
          <Link to=".">Courses</Link>
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
              {user ? (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl hover:font-bold ${
                        isActive ? "bg-white" : ""
                      }`
                    }
                    to="/registrations"
                  >
                    My Registrations
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
              {data.courseListItems.map((course) => (
                <li key={course.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl hover:font-bold ${
                        isActive ? "bg-white font-bold" : ""
                      }`
                    }
                    to={course.id}
                  >
                    {course.title}
                  </NavLink>
                </li>
              ))}
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
