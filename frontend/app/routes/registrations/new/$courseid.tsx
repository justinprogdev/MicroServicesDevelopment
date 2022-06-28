import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import type { CourseWithOfferings } from "~/models/courses.server";
import { getCourse } from "~/models/courses.server";
import { DateTime } from "luxon";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { createRegistration } from "~/models/registrations.server";
type LoaderData = {
  course: CourseWithOfferings;
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const courseId = formData.get("courseId")?.toString();
  const offeringId = formData.get("offeringId")?.toString();
  invariant(courseId, "No Course Id");
  invariant(offeringId, "No Offering");

  await createRegistration({ courseId, userId, offeringId });
  return redirect("/registrations");
};
export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.courseid, "Course ID Not Found");
  const course = await getCourse({ id: params.courseid });
  if (!course) {
    throw new Response("Course Not Found", { status: 404 });
  }
  return json<LoaderData>({ course });
};
export default function RegistrationsNewPage() {
  const { course } = useLoaderData() as LoaderData;
  return (
    <section>
      <p>Register for a course {course.title}</p>
      <Form method="post">
        <label className="flex w-full flex-col gap-1">
          <span>Course Name: </span>
          <input disabled value={course.title}></input>
          <input type="hidden" value={course.id} name="courseId"></input>
        </label>
        <label className="flex w-full flex-col gap-1">
          <span>Select a Date: </span>
          <select name="offeringId">
            {course.offerings.map((offering, index) => (
              <option key="index" value={offering.id}>
                {getDateStuff(offering.startDate, course.numberOfDays)}
              </option>
            ))}
          </select>
        </label>
        <div>
          <p>
            By Registering for this course, you agree you or your company will
            pay Hypertheory <em>ONE BAJILLION DOLLARS</em> (j/k)
          </p>
        </div>
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Sign Me Up!
        </button>
      </Form>
    </section>
  );
}

function getDateStuff(startDate: Date, numberOfDays: number) {
  return (
    DateTime.fromISO(startDate.toString()).toLocaleString() +
    " through " +
    DateTime.fromISO(startDate.toString())
      .plus({ days: numberOfDays })
      .toLocaleString() +
    " (" +
    numberOfDays +
    " days)"
  );
}
