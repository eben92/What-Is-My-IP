import { NextResponse } from "next/server";
import axios from "axios";
import { headers } from "next/headers";

async function getUserIp(req: Request) {
  // const headers = {
  //   "Content-Type": "application/json",
  // } as any;

  // const xForwardedFor = req.headers.get("x-forwarded-for");
  // if (xForwardedFor) {
  //   headers["x-forwarded-for"] = xForwardedFor;
  // }

  // const xRealIp = req.headers.get("x-real-ip");
  // if (xRealIp) {
  //   headers["x-real-ip"] = xRealIp;
  // }

  const response = await axios.get("https://ipapi.co/json/", {
    // headers: headers,
  });
  return { ...response.data, __headers: headers };
}

export async function POST(request: Request) {
  const headersList = headers();

  const hee = Object.entries(headersList.entries());

  try {
    const userIP = await getUserIp(request);

    return NextResponse.json(
      {
        msg: "success",
        result: { ...userIP },
        headers: hee,
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
