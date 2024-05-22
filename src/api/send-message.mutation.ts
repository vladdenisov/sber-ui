import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseCustomMutationOptions } from "../helpers/react-query-helpers";
import { API } from "./instance";
import { SendMessageRequest, SendMessageResponse } from "../types/Message";

export const useSendMessageMutation = (
  chat_id: string,
  options?: UseCustomMutationOptions<
    SendMessageResponse,
    unknown,
    SendMessageRequest
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<SendMessageResponse, unknown, SendMessageRequest>({
    mutationKey: ["chats", chat_id, "add_message"],
    mutationFn: async (message) => {
      return (await API.post<SendMessageResponse>("/message", message)).data;
    },
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: ["chats", chat_id, "messages"],
      });
      options?.onSuccess?.(...args);
    },
  });
};
