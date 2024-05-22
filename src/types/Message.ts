export interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

export interface SendMessageRequest {
  text: string;
  chat_id: string;
  user_id: string;
}

export interface SendMessageResponse {
  text: string;
  links: string[];
}
