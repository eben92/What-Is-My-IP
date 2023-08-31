import { NextResponse } from "next/server";

async function getUserIp(req: Request) {
  const ip =
    req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "";

  const res = await fetch(`https://ipapi.co/${ip}/json/`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error fetching user IP");
  }

  const data = await res.json();
  return data;
}

export async function GET(request: Request) {
  try {
    const userIP = await getUserIp(request);

    return NextResponse.json(
      {
        realIp: request.headers.get("x-real-ip"),
        country_name: userIP.country_name,
        country_code: userIP.country_code,
        currency:
          userIP.country_name?.toLowerCase() === "ghana" ? "GHS" : "USD",
        headers: Object.fromEntries(request.headers.entries()),
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
