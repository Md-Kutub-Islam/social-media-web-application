import React from "react";
import { Box, useMediaQuery, Typography, useTheme } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import state from '../../state'
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import FriendListWidgets from "../widgets/FriendListWidgets";

function Home() {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  return (
    <Box>
      {/* Navber  */}
      <Navbar />

      <Box display="flex" justifyContent="center" pt="1.1rem">
        <Link
          to="http://127.0.0.1:5500/Collage-resource-finder/index.html"
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="h4"
            color={dark}
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            Education Resources
          </Typography>
        </Link>
      </Box>

      {/* my post   */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          {/* my post  */}
          <MyPostWidget picturePath={picturePath} />

          <PostsWidget userId={_id} />
        </Box>

        {isNonMobileScreen && (
          <Box flexBasis="26%">
            <Box m="2rem 0">
              <FriendListWidgets userId={_id} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Home;
