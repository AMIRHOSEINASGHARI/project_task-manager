"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();
  router.push("/tasks/all");
  return <div className="mt-16">Home</div>;
};

export default Home;
