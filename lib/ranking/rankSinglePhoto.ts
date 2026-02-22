import { RankingMode, RankInput } from "@/types";

export function rankPhoto(input: RankInput, mode: RankingMode = "TRENDING") {
  const { likes, comments, saves, qualityScore, relevanceScore, createdAt } =
    input;

  const now = new Date();
  const ageInHours = Math.max(
    0,
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60),
  );

  // ==============================
  // 1️⃣ Engagement Calculation
  // ==============================

  const weightedEngagement = likes * 1 + comments * 2 + saves * 3;

  const engagementScore = Math.log(weightedEngagement + 1);

  // Normalize to 0–100 scale
  const normalizedEngagement = Math.min(engagementScore * 10, 100);

  // ==============================
  // 2️⃣ Base Score (Weights = 1.0)
  // ==============================

  const ENGAGEMENT_WEIGHT = 0.5;
  const QUALITY_WEIGHT = 0.3;
  const RELEVANCE_WEIGHT = 0.2;

  const baseScore =
    normalizedEngagement * ENGAGEMENT_WEIGHT +
    qualityScore * QUALITY_WEIGHT +
    relevanceScore * RELEVANCE_WEIGHT;

  // ==============================
  // 3️⃣ Ranking Modes
  // ==============================

  let recencyMultiplier = 1;

  if (mode === "TRENDING") {
    const lambda = 0.05; // decay speed
    recencyMultiplier = Math.exp(-lambda * ageInHours);
  }

  if (mode === "TOP_ALL_TIME") {
    recencyMultiplier = 1; // no time decay
  }

  if (mode === "NEW") {
    // Pure chronological (newest first)
    return {
      finalScore: -ageInHours,
      breakdown: {
        engagement: normalizedEngagement,
        quality: qualityScore,
        relevance: relevanceScore,
        recency: 1,
      },
    };
  }

  // ==============================
  // 4️⃣ Final Score
  // ==============================

  // Optional: small randomness to avoid feed stagnation
  const RANDOMNESS_FACTOR = 0.0; // Set to 0.02 later if needed
  const randomness = Math.random() * RANDOMNESS_FACTOR;

  const finalScore = baseScore * recencyMultiplier + randomness;

  return {
    finalScore,
    breakdown: {
      engagement: normalizedEngagement,
      quality: qualityScore,
      relevance: relevanceScore,
      recency: recencyMultiplier,
    },
  };
}
