import { NextResponse } from "next/server";

async function getUserIp(req: Request) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    headers.append("x-forwarded-for", xForwardedFor);
  }

  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) {
    headers.append("x-real-ip", xRealIp);
  }

  const response = await fetch("https://ipapi.co/json/", {
    cache: "no-store",
    headers,
  });

  if (!response.ok) {
    throw new Error("Error getting user IP");
  }

  const data = await response.json();
  return data;
}

export async function GET(request: Request) {
  try {
    const userIP = await getUserIp(request);

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
