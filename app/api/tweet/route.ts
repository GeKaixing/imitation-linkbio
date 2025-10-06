import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAG8N0QEAAAAAY%2F7SufibFDhyp5KF%2FOjO3hYee%2Fo%3DfvKsQjy8Em7K9mOBkURXAsTlrD4NquiRnbN4cYwwh1HlMJ6Yol');

export async function GET(request: Request) {
  
  try {
    const tweet = await client.v2.singleTweet('1975020433796690103', {
      "tweet.fields": ["author_id", "created_at", "public_metrics", "text"],
      expansions: ["author_id"],
      "user.fields": ["name", "username", "profile_image_url"],
    });

    return NextResponse.json(tweet);
  } catch (error: any) {
    console.error("Twitter API Error:", error);
    return NextResponse.json(
      { error: error?.data || error?.message || "Failed to fetch tweet" },
      { status: 500 }
    );
  }
}
