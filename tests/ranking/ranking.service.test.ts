import { describe, it, expect } from "vitest";
import { NEW, TOP_ALL_TIME, TRENDING } from "@/constants";
import { rankPhoto } from "@/lib";

describe("Ranking Engine", () => {
  it("should calculate higher score for higher engagement", () => {
    const lowEngagement = rankPhoto(
      {
        likes: 10,
        comments: 2,
        saves: 1,
        qualityScore: 80,
        relevanceScore: 80,
        createdAt: new Date(),
      },
      TOP_ALL_TIME,
    );

    const highEngagement = rankPhoto(
      {
        likes: 100,
        comments: 20,
        saves: 10,
        qualityScore: 80,
        relevanceScore: 80,
        createdAt: new Date(),
      },
      TOP_ALL_TIME,
    );

    expect(highEngagement.finalScore).toBeGreaterThan(lowEngagement.finalScore);
  });

  it("should rank newer photo higher than older one with same metrics", () => {
    const now = new Date();

    const recent = rankPhoto(
      {
        likes: 100,
        comments: 20,
        saves: 10,
        qualityScore: 80,
        relevanceScore: 80,
        createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
      },
      TRENDING,
    );

    const old = rankPhoto(
      {
        likes: 100,
        comments: 20,
        saves: 10,
        qualityScore: 80,
        relevanceScore: 80,
        createdAt: new Date(now.getTime() - 72 * 60 * 60 * 1000), // 72 hours ago
      },
      TRENDING,
    );

    expect(recent.finalScore).toBeGreaterThan(old.finalScore);
  });

  it("should rank purely by recency in NEW mode ", () => {
    const now = new Date();

    const recent = rankPhoto(
      {
        likes: 100,
        comments: 20,
        saves: 10,
        qualityScore: 80,
        relevanceScore: 80,
        createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      },
      NEW,
    );

    const old = rankPhoto(
      {
        likes: 100,
        comments: 20,
        saves: 10,
        qualityScore: 80,
        relevanceScore: 80,
        createdAt: new Date(now.getTime() - 72 * 60 * 60 * 1000),
      },
      NEW,
    );

    expect(recent.finalScore).toBeGreaterThan(old.finalScore);
  });

  it("should ignore recency in TOP mode", () => {
    const now = new Date();

    const recent = rankPhoto(
      {
        likes: 100,
        comments: 20,
        saves: 10,
        qualityScore: 80,
        relevanceScore: 80,
        createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      },
      TOP_ALL_TIME,
    );

    const old = rankPhoto(
      {
        likes: 100,
        comments: 20,
        saves: 10,
        qualityScore: 80,
        relevanceScore: 80,
        createdAt: new Date(now.getTime() - 72 * 60 * 60 * 1000),
      },
      TOP_ALL_TIME,
    );

    expect(recent.finalScore).toBeCloseTo(old.finalScore);
  });
});
