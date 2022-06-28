# Scenario

We have a partially implemented _monolith_ that allows users to:

- Create an account
- Log in
- Browse the Course Catalog

Registered users can:

- Register for an upcoming course.
- See their list of registrations.

## So Many Problems

1. The UI sucks. We won't fix that.
2. The Biggest Problems:

- There is no way for a registration to go from `Pending` to `Completed` or `Cancelled` or `Denied`.

- The weak-sauce developer we hired said they were a web "guru".

The data for the course list is made up, mostly. There is no way to change it, edit it, etc.

## Needs

- We need to know when a user registers.
- Each course offering has limited availability.
  - We need a way to say, after we've enrolled a student, that the seat is taken.
  - When there are no more seats available, students should not be able to enroll.

# Getting Going

In the `dev-environments` folder:

Run

```shell
docker compose up -d
```

In the root of this project:

Run

```shell
tye run --watch
```

## Urls For Things

- Mongo Express: http://localhost:8090
- Tye Dashboard http://localhost:8000
- Zipkin http://localhost:9411/zipkin/
