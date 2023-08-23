"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [res, setRes] = useState(null);

  useEffect(() => {
    getUserIp();
  }, []);

  async function getUserIp() {
    const response = await axios.get("https://ipapi.co/json/");
    setRes(response.data);
  }

  return <pre className="">{JSON.stringify(res)}</pre>;
}
