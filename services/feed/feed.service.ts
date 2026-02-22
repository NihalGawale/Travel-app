/* eslint-disable @typescript-eslint/no-explicit-any */
// /services/feed.service.ts

import { mockPhotos } from "@/lib";
import { rankPhotos } from "@/lib/ranking/rankPhotos";
import { RankingMode } from "@/types";

// Replace with your actual DB import
// import { db } from "@/lib/db";

export async function getFeed(mode: RankingMode, limit: number = 20) {
  // const photos = await db.photo.findMany({
  //   take: 100, // fetch more than needed before ranking
  // });

  // const ranked = rankPhotos(photos, mode);
  const ranked = rankPhotos(mockPhotos, mode);

  return ranked.slice(0, limit);
}

export async function createPhoto(body: any) {
  // const newPhoto = await db.photo.create({
  //   data: body,
  // });

  const newPhoto = [body, ...mockPhotos][0]; // Mock creation by adding to the front of the array

  return newPhoto;
}

// export async function updatePhoto(id: string, updateData: any) {
//   const updated = await db.photo.update({
//     where: { id },
//     data: updateData,
//   });

//   return updated;
// }

// export async function deletePhoto(id: string) {
//   await db.photo.delete({
//     where: { id },
//   });
// }
