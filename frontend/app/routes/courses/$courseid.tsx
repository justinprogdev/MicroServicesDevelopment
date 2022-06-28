import type { Course, CourseWithOfferings } from "~/models/courses.server";
import { DateTime } from "luxon";
import { getCourse } from "~/models/courses.server";
import type { LoaderFunction } from "@remix-run/node";
import { json, Response } from "@remix-run/node";

import invariant from "tiny-invariant";
import { Link, useLoaderData } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function CourseDetailsPage() {
  const data = useLoaderData() as LoaderData;
  const user = useOptionalUser();
  return (
    <section>
      <p className="mb-3 text-3xl font-black">{data.course.title}</p>
      <p>{data.course.description}</p>
      <p className="text-xl font-black">
        This is a {data.course.numberOfDays} day course.
      </p>
      <p className="mt-8 text-2xl font-bold text-red-700">
        Register {user?.email} for {data.course.title}
      </p>
      <p>The Course is Running on these Dates:</p>
      <ul>
        {data.course.offerings.map((offering, idx) => (
          <li key={idx} className="m-3 pl-5 font-bold">
            {DateTime.fromISO(offering.startDate.toString()).toLocaleString()}{" "}
            through{" "}
            {DateTime.fromISO(offering.startDate.toString())
              .plus({ days: data.course.numberOfDays })
              .toLocaleString()}{" "}
            ({data.course.numberOfDays} days)
          </li>
        ))}
      </ul>
      <div>
        {user ? (
          <Link
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            to={"/registrations/new/" + data.course.id}
          >
            Register
          </Link>
        ) : (
          <p>Log In to Register</p>
        )}
      </div>
    </section>
  );
}

type LoaderData = {
  course: CourseWithOfferings;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.courseid, "courseId not found");
  const course = await getCourse({ id: params.courseid });

  if (!course) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ course });
};
