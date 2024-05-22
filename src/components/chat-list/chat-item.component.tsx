import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

export interface ChatItemProps {
  chat_id: string;
  title: string;
}

export const ChatItem: FC<ChatItemProps> = ({ chat_id, title }) => {
  return (
    <Link to={`/${chat_id}`}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        boxShadow={"1"}
        padding={"0.5em 1em"}
      >
        <Typography typography={"text"} color={"white"}>
          {title}
        </Typography>
      </Box>
    </Link>
  );
};
