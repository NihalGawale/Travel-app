// /lib/mock/photos.ts

import { RankInput } from "@/types";

export const mockPhotos: RankInput[] = [
  {
    id: "1",
    likes: 120,
    comments: 40,
    saves: 25,
    qualityScore: 85,
    relevanceScore: 80,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
  },
  {
    id: "2",
    likes: 50,
    comments: 10,
    saves: 5,
    qualityScore: 70,
    relevanceScore: 75,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "3",
    likes: 200,
    comments: 80,
    saves: 40,
    qualityScore: 90,
    relevanceScore: 90,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6h ago
  },
];