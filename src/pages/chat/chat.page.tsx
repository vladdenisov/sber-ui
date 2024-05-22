import {
  Box,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Message } from "../../types/Message";
import { useCreateChatMutation } from "../../api/create-chat-mutation";
import { useSendMessageMutation } from "../../api/send-message.mutation";
import { MessageItem } from "./message-item";
import SendIcon from "@mui/icons-material/Send";
import { useGetChatHistory } from "../../api/get-chat-history.query";
import { toast } from "react-toastify";

export const ChatPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const user_id = localStorage.getItem("user_id");

  const [messages, setMessages] = useState<Message[]>([]);

  const navigate = useNavigate();

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { data, isLoading } = useGetChatHistory(id ?? "", {
    enabled: id !== "new",
  });

  useEffect(() => {
    setMessages([]);
  }, [id]);

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const { mutate, isPending: isCreationPending } = useCreateChatMutation({
    onSuccess: (data) => {
      addMessage({
        text: data.text,
        sender: "bot",
        timestamp: new Date().toISOString(),
      });
      navigate(`/${data.chat_id}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Ошибка!!!");
    },
  });

  const { mutate: sendMessageMutation, isPending: isMessagePending } =
    useSendMessageMutation(id ?? "", {
      onSuccess: (data) => {
        addMessage({
          text: data.text,
          sender: "bot",
          timestamp: new Date().toISOString(),
        });
      },
      onError: (error) => {
        console.error(error);
        toast.error("Ошибка!!!");
      },
    });

  const [inputValue, setInputValue] = useState("");

  const sendMessage = () => {
    addMessage({
      text: inputValue,
      sender: user_id ?? "",
      timestamp: new Date().toISOString(),
    });
    setInputValue("");
    if (id === "new") {
      mutate({ message: inputValue, user_id: user_id ?? "" });
      return;
    } else {
      sendMessageMutation({
        text: inputValue,
        user_id: user_id ?? "",
        chat_id: id ?? "",
      });
    }
  };

  if (isLoading) {
    return (
      <Box width={"100%"} height={"100%"} display={"flex"}>
        <CircularProgress
          sx={{
            margin: "auto",
          }}
        />
      </Box>
    );
  }

  return (
    <Box width={"100%"} height={"100%"}>
      <Box overflow={"auto"} height={"calc(100% - 100px)"} padding={"0 2em"}>
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
        {messages.length === 0 && (
          <Box
            margin={"auto"}
            width={"100%"}
            height={"100%"}
            textAlign={"center"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant={"h4"}>Задайте вопрос боту</Typography>
          </Box>
        )}
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        height={"100px"}
        alignItems={"center"}
        gap={"2em"}
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <TextField
          type="text"
          placeholder="Напишите свой вопрос..."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          variant="outlined"
          disabled={isMessagePending || isCreationPending}
          fullWidth
          autoComplete="off"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
            width: "calc(100% - 200px)",
          }}
        />
        {isCreationPending || isMessagePending ? (
          <CircularProgress />
        ) : (
          <IconButton
            color={"primary"}
            type="submit"
            disabled={isCreationPending || isMessagePending}
          >
            <SendIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
