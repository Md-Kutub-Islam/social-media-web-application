import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

function Login() {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          fontFamily={"Praise, cursive"}
        >
          SocialNest
        </Typography>
      </Box>

      {/* form box  */}
      <Box
        width={isNonMobileScreen ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontSize="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Wlcome to SocialNest, the social media for sociopath!
          <Form />
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
