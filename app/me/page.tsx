import axios from "axios";

export const dynamic = "force-dynamic";

async function getUserIp() {
  const response = await axios.get("https://ipapi.co/json/", {});
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
