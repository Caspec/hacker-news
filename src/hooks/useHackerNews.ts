import useSWR from "swr";
import { useEffect, useState } from "react";
import type { Story } from "../models/story";
import type { User } from "../models/user";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getRandomUniqueNumbers = (max: number, count: number): number[] => {
  const available = Array.from({ length: max }, (_, i) => i);
  const result: number[] = [];

  for (let i = 0; i < count; i++) {
    const randIndex = Math.floor(Math.random() * available.length);
    result.push(available[randIndex]);
    available.splice(randIndex, 1); // Fjern det valgte indeks, så det ikke gentages
  }

  return result;
};

export const useHackerNews = () => {
  const { data: storyIds, error } = useSWR<number[]>(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
    fetcher
  );

  const [stories, setStories] = useState<Story[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const isLoading = !storyIds && !error;
  const isError = !!error;

  useEffect(() => {
    if (!storyIds) return;

    const load = async () => {
      const top20 = storyIds.slice(0, 20);
      const randomIndexes = getRandomUniqueNumbers(top20.length, 10);
      const randomIds = randomIndexes.map((i) => top20[i]);

      const storiesData = await Promise.all(
        randomIds.map((id) =>
          fetcher(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        )
      );

      const validStories = storiesData
        .filter((story) => story)
        .sort((a, b) => a.score - b.score);

      const userIds = [...new Set(validStories.map((story) => story.by))];

      const userData = await Promise.all(
        userIds.map((id) =>
          fetcher(`https://hacker-news.firebaseio.com/v0/user/${id}.json`)
        )
      );

      const userMap: Record<string, User> = {};
      userData.forEach((user) => {
        if (user) userMap[user.id] = user;
      });

      setStories(validStories);
      setUsers(userMap);
    };

    load();
  }, [storyIds]);

  return { stories, users, isLoading, isError };
};
