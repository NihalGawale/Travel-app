import { RankingMode, RankInput } from "@/types";
import { rankPhoto } from "./rankSinglePhoto";

/**
 * 
What It Should Do
    Accept array of photos
    Accept ranking mode
    Apply rankPhoto to each
    Sort descending by finalScore
    Return ranked array
 */

export function rankPhotos(
  photos: RankInput[],
  mode: RankingMode = "TRENDING",
) {
  return photos
    .map((photo) => ({
      ...photo,
      ranking: rankPhoto(photo, mode),
    }))
    .sort((a, b) => b.ranking.finalScore - a.ranking.finalScore);
}
