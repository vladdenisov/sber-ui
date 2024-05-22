import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { UseCustomQueryOptions } from "../helpers/react-query-helpers";
import { Chat } from "../types/Chat";
import { API } from "./instance";

export const useGetChatHistory = (
  chat_id: string,
  options?: UseCustomQueryOptions<Chat>,
): UseQueryResult<Chat> => {
  return useQuery({
    queryKey: ["chat", chat_id],
    queryFn: async () => (await API.get<Chat>(`/chat/${chat_id}`)).data,
    ...options,
  });
};
