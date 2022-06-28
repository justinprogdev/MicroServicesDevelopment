import { Link, useLoaderData } from "@remix-run/react";
import { getRegistrationsForUser } from "~/models/registrations.server";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { DateTime } from "luxon";
type LoaderData = {
  registrationListItems: Awaited<ReturnType<typeof getRegistrationsForUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const id = await requireUserId(request);
  const registrationListItems = await getRegistrationsForUser({ id });
  return json<LoaderData>({ registrationListItems });
};
export default function RegistrationsIndexPage() {
  const { registrationListItems: registrations } =
    useLoaderData() as LoaderData;
  return (
    <section>
      {registrations.length === 0 ? (
        <div
          className="border-l-4 border-orange-500 bg-orange-100 p-4 text-orange-700"
          role="alert"
        >
          <p className="font-bold">No Registrations</p>
          <p>
            <Link to="/courses">
              You can browser our course catalog and register for a course.
            </Link>
          </p>
        </div>
      ) : (
        <>
          <p className="text-3xl font-extrabold">You Are Registered For: </p>
          {registrations.map((reg, index) => (
            <div
              key={index}
              className="mb-3 border-2 border-gray-400 p-5 shadow-lg"
            >
              <p className="text-xl font-extrabold">{reg.course.title} </p>
              <p>
                {getDateStuff(reg.offering.startDate, reg.course.numberOfDays)}
              </p>
              <p>
                Your registration is currently{" "}
                <span className="font-bold capitalize text-red-700">
                  {reg.status}
                </span>
              </p>
            </div>
          ))}
        </>
      )}
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
