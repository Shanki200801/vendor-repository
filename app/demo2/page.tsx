import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DemoPage from "./pagee";
import { env } from "process";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  console.log(
    `${process.env.NEXT_PUBLIC_NEXTAPP_URL}/api/getvendors?${Date.now()}`,
  );
  const fetchData = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAPP_URL}/api/getvendors?${Date.now()}`,
      {
        method: "GET",
        headers: {},
        cache: "no-store",
      },
    );
    return data.json();
  };
  const initialData = await fetchData();

  return <DemoPage initialdata={initialData} />;
};

export default Page;
