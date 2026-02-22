// /app/api/feed/route.ts

import { NextResponse } from "next/server";
import { RankingMode } from "@/types";
import { createPhoto, deletePhoto, getFeed, updatePhoto } from "@/services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = (searchParams.get("mode") as RankingMode) || "TRENDING";
  const limit = Number(searchParams.get("limit") || 20);

  try {
    const feed = await getFeed(mode, limit);

    return NextResponse.json(feed);
  } catch (error) {
    return NextResponse.json(
      { error: `$[feed/route.ts] Failed to fetch feed: ${error}` },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPhoto = createPhoto(body);

    return NextResponse.json(newPhoto, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `$[feed/route.ts] Failed to create photo: ${error}` },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const updated = updatePhoto(id, updateData);

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: `$[feed/route.ts] Failed to update photo: ${error}` },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    deletePhoto(id!);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `$[feed/route.ts] Failed to delete photo: ${error}` },
      { status: 500 },
    );
  }
}
