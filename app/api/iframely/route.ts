import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "Missing URL" }, { status: 400 });
    }

    const apiKey = process.env.IFRAMELY_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing Iframely API key" }, { status: 500 });
    }

    const res = await fetch(
      `https://iframe.ly/api/iframely?api_key=${process.env.IFRAMELY_API_KEY}&url=${encodeURIComponent(url)}`
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch from Iframely" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
