import React from "react";
import { Stack } from "@mui/material";
// import { InfinitySpin } from "react-loader-spinner";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      {/* <InfinitySpin color="gray" /> */}
      <CircularProgress />
    </Stack>
  );
};

export default Loader;
