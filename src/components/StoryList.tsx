import React from "react";
import type { Story } from "../models/story";
import type { User } from "../models/user";
import { StoryCard } from "./StoryCard";
import dummyImage from "../assets/dark.png";

interface StoryListProps {
  stories: Story[];
  users: Record<string, User>;
}

export const StoryList: React.FC<StoryListProps> = ({ stories, users }) => {
  return (
    <div className="story-list">
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          story={story}
          user={users[story.by]}
          dummyImage={dummyImage}
        />
      ))}
    </div>
  );
};
