import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function getUserIp(req: NextRequest) {
  const geo = req.geo;
  const ip =
    req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "";

  cookies().set("secure-ip", ip, { secure: true });

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
  return { ...data, geo };
}

export async function POST(request: NextRequest) {
  try {
    const userIP = await getUserIp(request);

    const ip =
      request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for") ||
      "";

    cookies().set("hello", ip);

    return NextResponse.json(
      {
        realIp: request.headers.get("x-real-ip"),
        country_name: userIP.country_name,
        country_code: userIP.country_code,
        currency:
          userIP.country_name?.toLowerCase() === "ghana" ? "GHS" : "USD",
        geo: userIP.geo,
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
