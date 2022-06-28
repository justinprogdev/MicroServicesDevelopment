const DateTime = require("luxon").DateTime;
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.course.deleteMany().catch(() => {
    // gulp.
  });
  const courses = [
    {
      title: "Intro to Services",
      description: "Learn How to Build Services",
      category: "services",
      positionInCategory: 1,
      offerings: {
        create: [
          {
            startDate: DateTime.now().plus({ days: 14 }).toISO(),
          },
          {
            startDate: DateTime.now().plus({ month: 1, days: 14 }).toISO(),
          },
        ],
      },
    },
    {
      title: "Web APIs",
      description: "Learn How to Build Web APIs",
      category: "services",
      positionInCategory: 2,
      offerings: {
        create: [
          {
            startDate: DateTime.now().plus({ month: 2, days: 14 }).toISO(),
          },
          {
            startDate: DateTime.now().plus({ month: 3, days: 14 }).toISO(),
          },
        ],
      },
    },
    {
      title: "Services Developer Testing",
      description: "Learn How to Test Services",
      category: "services",
      positionInCategory: 2,
      offerings: {
        create: [
          {
            startDate: DateTime.now().plus({ month: 3, days: 14 }).toISO(),
          },
          {
            startDate: DateTime.now().plus({ month: 4, days: 14 }).toISO(),
          },
        ],
      },
    },
    {
      title: "Microservice Development",
      description: "Learn How to Build Microservices",
      category: "services",
      positionInCategory: 4,
      offerings: {
        create: [
          {
            startDate: DateTime.now().plus({ month: 5, days: 7 }).toISO(),
          },
          {
            startDate: DateTime.now().plus({ month: 6, days: 14 }).toISO(),
          },
        ],
      },
    },
    {
      title: "Event Driven Microservices",
      description: "Stream All The Things!",
      category: "services",
      positionInCategory: 5,
      offerings: {
        create: [
          {
            startDate: DateTime.now().plus({ month: 6, days: 14 }).toISO(),
          },
          {
            startDate: DateTime.now().plus({ month: 7, days: 14 }).toISO(),
          },
        ],
      },
    },
    {
      title: "Angular State Management",
      description: "Learn how to manage state in an Angular appliaction",
      category: "angular",
      offerings: {
        create: [
          {
            startDate: DateTime.now().plus({ month: 8, days: 14 }).toISO(),
          },
          {
            startDate: DateTime.now().plus({ month: 9, days: 14 }).toISO(),
          },
        ],
      },
    },
  ];

  courses.forEach(async (c) => {
    await prisma.course.create({ data: c });
  });
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
