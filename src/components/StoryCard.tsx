import "../styles/StoryCard.scss";
import type { Story } from "../models/story";
import type { User } from "../models/user";
import { format } from "date-fns";

interface StoryCardProps {
  story: Story;
  user: User;
  dummyImage: string;
}

export const StoryCard = ({ story, user, dummyImage }: StoryCardProps) => {
  const formattedDate = format(
    new Date(story.time * 1000),
    "dd MMM yyyy HH:mm"
  );

  return (
    <div className="story-card">
      <img src={dummyImage} alt="dummy" className="story-image" />
      <div className="story-content">
        <h3 className="story-title">
          <a href={story.url} target="_blank">
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
