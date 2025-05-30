import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StoryList } from "../src/components/StoryList";
import type { Story } from "../src/models/story";
import type { User } from "../src/models/user";

const mockStories: Story[] = [
  {
    id: 1,
    by: "alice",
    score: 100,
    time: 1700000000,
    title: "Test Story One",
    type: "story",
    url: "https://test/story1",
  },
  {
    id: 2,
    by: "bob",
    score: 80,
    time: 1700000100,
    title: "Test Story Two",
    type: "story",
    url: "https://test/story2",
  },
];

const mockUsers: Record<string, User> = {
  alice: { id: "alice", karma: 500 },
  bob: { id: "bob", karma: 300 },
};

describe("StoryList", () => {
  it("list of story cards", () => {
    render(<StoryList stories={mockStories} users={mockUsers} />);

    expect(screen.getByText("By: alice (karma: 500)")).toBeInTheDocument();
    expect(screen.getByText("By: bob (karma: 300)")).toBeInTheDocument();

    expect(screen.getByText("Score: 100")).toBeInTheDocument();
    expect(screen.getByText("Score: 80")).toBeInTheDocument();
  });
});
