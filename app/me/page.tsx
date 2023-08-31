import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://what-is-my-ip-murex.vercel.app"
    : "http://localhost:3000";

export const dynamic = "force-dynamic";

async function getUserIp() {
  const response = await axios.post(`${BASE_URL}/api/ip`);
  return response.data;
}

export default async function Home() {
  const res = await getUserIp();

  return (
    <pre className="">
      {Object.entries(res).map(([key, value]) => {
        return (
          <div key={key}>
            {/* @ts-ignore */}
            {key}: {value}
          </div>
        );
      })}
    </pre>
  );
}
