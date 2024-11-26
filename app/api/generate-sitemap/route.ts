import { NextResponse } from "next/server";
import { generateSitemap } from "../../../utils/crawler";

export async function POST(req: Request) {
  const { url, settings } = await req.json();

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const sitemap = await generateSitemap(url, settings);
    return new Response(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch {
    // Handle the error without using the error variable
    return NextResponse.json(
      { error: "Failed to generate sitemap" },
      { status: 500 }
    );
  }
}
