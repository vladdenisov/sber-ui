import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { FC } from "react";
import { Header } from "../components/header/header.component";
import { ChatList } from "../components/chat-list/chat-list.component";
import { Outlet } from "react-router-dom";

export const MainLayout: FC = () => {
  return (
    <Grid container height={"100%"} width={"100%"}>
      <Grid xs={12} height={"70px"}>
        <Header />
      </Grid>
      <Grid xs={2} height={"calc(100% - 70px)"}>
        <ChatList />
      </Grid>
      <Grid
        xs={10}
        overflow={"auto"}
        maxHeight={"calc(100% - 70px)"}
        height={"calc(100% - 70px)"}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
};
