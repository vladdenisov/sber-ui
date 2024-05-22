import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { UseCustomQueryOptions } from "../helpers/react-query-helpers";
import { Chat } from "../types/Chat";
import { API } from "./instance";

export const useGetUserChats = (
  user_id: string,
  options?: UseCustomQueryOptions<Chat[]>,
): UseQueryResult<Chat[]> => {
  return useQuery({
    queryKey: ["chats", "all"],
    queryFn: async () => (await API.get<Chat[]>(`/user/${user_id}`)).data,
    ...options,
  });
};
