import { NextResponse } from "next/server";

async function getUserIp() {
  const res = await fetch("https://ipapi.co/json/", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error getting user ip");
  }
  const data = await res.json();

  return data;
}

export async function GET(request: Request) {
  try {
    const userIP = await getUserIp();

    return NextResponse.json(
      {
        msg: "success",
        result: { ...userIP },
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        msg: "Internal server error",
        error: err,
      },
      {
        status: 500,
      }
    );
  }
}
