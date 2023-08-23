import { NextResponse } from "next/server";
// import  superagent ("superagent");
import axios from "axios";

async function getUserIp(req: Request) {
  // const response = await fetch("https://ipapi.co/json/");

  // if (!response.ok) {
  //   throw new Error("Error getting user IP");
  // }

  // const data = await response.json();
  // return data;

  const headers = Object.fromEntries(req.headers.entries());

  const response = await axios.get("https://ipapi.co/json/");
  return response.data;
}

export async function GET(request: Request) {
  try {
    const userIP = await getUserIp(request);

    return NextResponse.json(
      {
        msg: "success",
        result: { ...userIP },
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
