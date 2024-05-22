import { Box, Typography } from "@mui/material";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      marginTop={"0"}
      height={"70px"}
      padding={"15px"}
      bgcolor={"#212121"}
      boxShadow={1}
    >
      <Typography typography={"h4"} fontWeight={"bold"}>
        ChatLLM
      </Typography>
    </Box>
  );
};
