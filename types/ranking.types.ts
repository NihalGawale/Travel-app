export type RankInput = {
  id: string;
  likes: number;
  comments: number;
  saves: number;
  qualityScore: number;
  relevanceScore: number;
  createdAt: Date;
};

export type RankingMode = "TRENDING" | "TOP_ALL_TIME" | "NEW";
