import type { Registration, User } from "@prisma/client";
import { prisma } from "~/db.server";
import { DaprClient } from "dapr-client";
import { RegistrationRequest } from "~/models/types/registration-request";
export type { Registration } from "@prisma/client";

const client = new DaprClient(
  process.env.FRONTEND_SERVICE_HOST,
  process.env.DAPR_HTTP_PORT
);
const PUB_SUB_NAME = "registrations";
const TOPCIC_NAME = "registration-requested";

export async function createRegistration({
  courseId,
  offeringId,
  userId,
}: Pick<Registration, "courseId" | "userId" | "offeringId">) {
  const registration = await prisma.registration.create({
    data: {
      courseId,
      offeringId,
      userId,
      createdAt: new Date().toISOString(),
    },
    include: {
      user: true,
      offering: true,
      course: true,
    },
  });

  const eventToPublish: RegistrationRequest = {
    student: {
      id: userId,
      email: registration.user.email,
    },
    course: {
      courseId: courseId,
      courseName: registration.course.title,
      numberOfDays: registration.course.numberOfDays,
    },
    offering: {
      offeringId: offeringId,
      startDate: registration.offering.startDate,
      numberOfDays: registration.course.numberOfDays,
    },
    created: new Date(),
  };
  const message = RegistrationRequest.toJSON(eventToPublish) as Object;

  await client.pubsub.publish(PUB_SUB_NAME, TOPCIC_NAME, message);

  return registration;
}

export function getRegistrationsForUser({ id }: Pick<User, "id">) {
  return prisma.registration.findMany({
    where: { userId: id },
    include: {
      course: true,
      offering: true,
    },
  });
}
