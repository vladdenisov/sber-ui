import { Box, Button, CircularProgress } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useGetUserChats } from "../../api/get-user-chats.query";
import { ChatItem } from "./chat-item.component";

export const ChatList: FC = () => {
  const user_id = localStorage.getItem("user_id");

  const { data = [], isLoading } = useGetUserChats(user_id ?? "", {
    enabled: !!user_id,
  });

  if (isLoading) {
    return (
      <Box
        minHeight={"100%"}
        display={"flex"}
        bgcolor={"#212121"}
        width={"300px"}
        height={"100%"}
        flexDirection={"column"}
      >
        <CircularProgress
          sx={{
            margin: "auto",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      minHeight={"100%"}
      display={"flex"}
      bgcolor={"#212121"}
      width={"100%"}
      height={"100%"}
      flexDirection={"column"}
    >
      <Link
        to={"/new"}
        style={{
          margin: "10px auto",
        }}
      >
        <Button variant={"outlined"} color={"primary"}>
          Добавить чат
        </Button>
      </Link>
      {data.map((chat) => (
        <ChatItem
          key={chat.chat_id}
          chat_id={chat.chat_id}
          title={chat.title}
        />
      ))}
    </Box>
  );
};
