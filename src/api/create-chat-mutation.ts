import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseCustomMutationOptions } from "../helpers/react-query-helpers";
import { ChatCreationRequest, ChatCreationResponse } from "../types/Chat";
import { API } from "./instance";

export const useCreateChatMutation = (
  options?: UseCustomMutationOptions<
    ChatCreationResponse,
    unknown,
    ChatCreationRequest
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<ChatCreationResponse, unknown, ChatCreationRequest>({
    mutationKey: ["chats", "all"],
    mutationFn: async (message) => {
      return (await API.post<ChatCreationResponse>("/chats", message)).data;
    },
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: ["chats", "all"],
      });
      options?.onSuccess?.(...args);
    },
  });
};
