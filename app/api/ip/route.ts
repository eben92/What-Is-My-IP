import { NextResponse } from "next/server";

import axios from "axios";

async function getUserIp(req: Request) {
  const ip =
    req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "";

  const headers = Object.fromEntries(req.headers.entries());

  const response = await axios.get(`https://ipapi.co/${ip}/json/`);
  return response.data;
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
