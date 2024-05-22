import { Message } from "./Message";

export interface Chat {
  chat_id: string;
  title: string;
  messages: Message[];
  links: string[];
}

export interface ChatCreationRequest {
  message: string;
  user_id: string;
}

export interface ChatCreationResponse {
  chat_id: string;
  text: string;
  links: string[];
}
