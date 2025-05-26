import React from "react";
import "../styles/StoryCard.scss";
import type { Story } from "../models/story";
import type { User } from "../models/user";

interface StoryCardProps {
  story: Story;
  user: User;
  dummyImage: string;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  user,
  dummyImage,
}) => {
  const date = new Date(story.time * 1000);
  const formattedDate = date.toLocaleString();

  return (
    <div className="story-card">
      <img src={dummyImage} alt="dummy" className="story-image" />
      <div className="story-content">
        <h3 className="story-title">
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            {story.title}
          </a>
        </h3>
        <p className="story-info">Score: {story.score}</p>
        <p className="story-info">
          By: {user.id} (karma: {user.karma})
        </p>
        <p className="story-info">{formattedDate}</p>
      </div>
    </div>
  );
};
