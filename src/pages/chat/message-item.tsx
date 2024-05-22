import { FC } from "react";
import { Message } from "../../types/Message";
import { Avatar, Box, Typography } from "@mui/material";

interface MessageItemProps {
  message: Message;
}

export const MessageItem: FC<MessageItemProps> = ({ message }) => {
  return (
    <Box
      sx={{
        borderRadius: "1em",
        border: "2px solid #9E9E9E",
      }}
      display={"flex"}
      flexDirection={"column"}
      padding={"1em 2em"}
      gap={"1em"}
      maxWidth={"1000px"}
      margin={"1em auto"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        gap={"1em"}
      >
        <Avatar>{message.sender === "bot" ? "Б" : "В"}</Avatar>
        <Typography typography={"text"}>
          {message.sender === "bot" ? "Бот" : "Вы"}
        </Typography>
        <Typography typography={"caption"}>
          {Intl.DateTimeFormat("ru-RU", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date(message.timestamp))}
        </Typography>
      </Box>
      <Typography typography={"text"}>{message.text}</Typography>
    </Box>
  );
};
