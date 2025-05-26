import { useState } from "react";
import { useHackerNews } from "./hooks/useHackerNews";
import { StoryList } from "./components/StoryList";
import { SortOrder } from "./components/SortOrder";
import "./styles/main.scss";

function App() {
  const { stories, users, isLoading } = useHackerNews();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedStories = [...stories].sort((a, b) =>
    sortOrder === "asc" ? a.score - b.score : b.score - a.score
  );

  return (
    <div className="app">
      <h1>Top Hacker News Stories</h1>
      <div className="sort-controls">
        <SortOrder sortOrder={sortOrder} onChange={setSortOrder} />
      </div>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <StoryList stories={sortedStories} users={users} />
      )}
    </div>
  );
}

export default App;
