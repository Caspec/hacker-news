import useSWR from "swr";
import { useEffect, useState } from "react";
import type { Story } from "../models/story";
import type { User } from "../models/user";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const useHackerNewsHook = () => {
  const topStoryUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";
  const response = useSWR<number[]>(topStoryUrl, fetcher);
  const storyIds = response.data;
  const error = response.error;

  const [stories, setStories] = useState<Story[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const isLoading = !storyIds && !error;
  const isError = !!storyIds && !!error;

  useEffect(() => {
    if (!storyIds) return;

    const loadStories = async () => {
      const randomIds = storyIds
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, 10); // 10 random

      const storyPromises = randomIds.map((id) =>
        fetcher(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      );
      const storiesData = await Promise.all(storyPromises);

      const validStories = storiesData
        .filter((story) => story)
        .sort((a, b) => a.score - b.score);

      const uniqueAuthors = [...new Set(validStories.map((s) => s.by))];

      const userPromises = uniqueAuthors.map((id) =>
        fetcher(`https://hacker-news.firebaseio.com/v0/user/${id}.json`)
      );
      const usersData = await Promise.all(userPromises);

      const userMap: Record<string, User> = {};
      usersData.forEach((user) => {
        if (user) userMap[user.id] = user;
      });

      setStories(validStories);
      setUsers(userMap);
    };

    loadStories();
  }, [storyIds]);

  return { stories, users, isLoading, isError };
};
