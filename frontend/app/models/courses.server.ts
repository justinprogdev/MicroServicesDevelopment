import type { Course, Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Course } from "@prisma/client";
export function getCourseListItems() {
  return prisma.course.findMany({
    select: { id: true, title: true, description: true, category: true },
    orderBy: [
      {
        category: "desc",
      },
      {
        positionInCategory: "asc",
      },
    ],
  });
}

export type CourseWithOfferings = Prisma.CourseGetPayload<{
  include: { offerings: true };
}>;
export function getCourse({ id }: Pick<Course, "id">) {
  return prisma.course.findFirst({
    where: { id },
    include: {
      offerings: true,
    },
  });
}
