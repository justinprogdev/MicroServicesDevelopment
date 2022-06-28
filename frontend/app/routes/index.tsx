import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className=" m-5 min-h-screen bg-white ">
      <header className=" h-40 bg-slate-500 pt-10 pl-10">
        <h1 className="text-4xl font-black text-yellow-200">
          Hypertheory Training
        </h1>
      </header>
      <section className="mt-10">
        <Link to="./courses" className="block">
          <span className="m-6 rounded-md bg-blue-700 p-4 font-bold text-white">
            See Our Courses
          </span>
        </Link>
        <p className="pt-14">
          <span className="font-bold">Note</span> This is a proof of concept for
          an upcoming project.
        </p>
      </section>
    </main>
  );
}
