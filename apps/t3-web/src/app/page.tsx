import { Suspense } from "react";

import { api, HydrateClient } from "@repo/trpc/server";
import { AuthShowcase } from "./_components/auth-showcase";
import { Button } from "@repo/ui/components/button";

export const runtime = "edge";

export default async function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  const mesage = api.auth.getSecretMessage();
  const test = await api.auth.getSession();
  // const testing = await api.v1.users.authorized.getUsersAccounts();
  const testing = await api.v1.events.main.getUpcoming();

  return (
    <HydrateClient>
      <main className='container h-screen py-16'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <h1 className='text-5xl font-extrabold tracking-tight sm:text-[5rem]'>
            Create <span className='text-primary'>T3</span> Turbo
          </h1>
          <AuthShowcase />
          <Button>Test button</Button>
          <div className='w-full max-w-2xl overflow-y-scroll'>
            <Suspense
              fallback={<div className='flex w-full flex-col gap-4'></div>}
            ></Suspense>
          </div>
          {testing && testing.map((test) => <p key={test.id}>{test.name}</p>)}
          {/* <p>{mesage}</p> */}
          <p>{JSON.stringify(test)}</p>
        </div>
      </main>
    </HydrateClient>
  );
}
