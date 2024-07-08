import { Box, useMediaQuery, Typography, useTheme, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import FlexBetween from "../../components/FlexBetween";
import FriendListWidget from "../widgets/FriendListWidgets"
import MyPostWidget from "../widgets/MyPostWidget"
import PostsWidget from "../widgets/PostsWidget"
import UserWidget from "../widgets/UserWidget"
import UserImage from "../../components/UserImage"
import WidgetWrapper from "../../components/WidgetWrapper"
import PostWidget from "../widgets/PostWidget"
import UserProfilePost from "../widgets/UserProfilePost"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function ProfilePage() {
  const [user, setUser] = useState(null)
  const [posts, setPost] = useState(null)
  const dispatch = useDispatch()
  const {id} = useParams()
  const token = useSelector((state) => state.token)
  const navigate = useNavigate()
  const isNonMobileScreens = useMediaQuery("(min-width:100px)")
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log("Data",data);
    setUser(data);
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${id}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setPost(data);
    // dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    getUserPosts();
  }, []);

    useEffect(() => {
      getUser()  
    }, [])
    console.log("posts: ",posts);

    if(!user) return null

  return (
  <WidgetWrapper>
    <Navbar />
    <Box width="100%" padding="2rem 6%" mt="3rem" display="flex" flexDirection="column" gap="2rem" justifyContent="center">
        <FlexBetween gap=".05rem" alignItems="center" >
          <Box width="40%">
            <FlexBetween flexDirection="column" gap=".10rem">
              <UserImage image={user.user.picturePath} />
              <FlexBetween flexDirection="column">
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
                  {user.user.firstName} {user.user.lastName}
                </Typography>
                <Typography
                variant="h3"
                color={dark}
                fontWeight="500"
                fontSize="12px"
                >
                  {user.user.bio}
                </Typography>
                <Typography color={medium} sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }} onClick = {() => navigate(`/friends/${id}`)} >{user.user.friends.length} friends</Typography>
              </FlexBetween>
            </FlexBetween>
            <Link to={user.user.twitter} style={{ textDecoration: 'none'}}>
              <Box display="flex" alignItems="center" gap="5px" ml="5rem" mb="0.5rem">
              <img src="../assets/twitter.png" alt="twitter" />
              
                <Typography color={main} sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }} fontWeight="500">
                  Twitter
                </Typography>
              </Box>
            </Link>
            <Link to={user.user.linkdin} style={{ textDecoration: 'none'}}>
              <Box display="flex" alignItems="center" gap="5px" ml="5rem" >
              <img src="../assets/linkedin.png" alt="linkedin" />
              
                <Typography color={main} sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }} fontWeight="500">
                  LinkdIn
                </Typography>
              </Box>
            </Link>
          </Box>

        <Box width="60%">
                  <Box display="flex" flexDirection="column" justifyContent="start" gap="0.5rem">
                    <Box display="flex" flexDirection="column" alignItems="start">
                      <Typography
                      mb=".10rem"
                      variant="h3"
                      color={dark}
                      fontWeight="500"
                      sx={{
                        "&:hover": {
                          color: palette.primary.light,
                          cursor: "pointer",
                        },
                      }}
                      >
                        Stream
                      </Typography>

                      <Typography
                      variant="p"
                      color={dark}
                      fontWeight="500"
                      >
                        {user.user.stream} 
                      </Typography>
                    </Box>
                      <Divider />
                    <Box display="flex" flexDirection="column" alignItems="start">
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
                        Skills
                      </Typography>

                      <Typography
                      variant="p"
                      color={dark}
                      fontWeight="500"
                      >
                        {user.user.skills} 
                      </Typography>
                    </Box>
                      <Divider />
                    <Box display="flex" flexDirection="column" alignItems="start">
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
                        Achievement
                      </Typography>

                      <Typography
                      variant="p"
                      color={dark}
                      fontWeight="500"
                      >
                        {user.user.achievement} 
                      </Typography>
                    </Box>
                  </Box>
        </Box>
      </FlexBetween>

      <WidgetWrapper>
        <Box display="flex" flexWrap="wrap" width="100%" height="100%">
      
      {posts && posts.map(
    ({
      _id,
      userId,
      firstName,
      lastName,
      description,
      stream,
      picturePath,
      userPicturePath,
      likes,
      comments,
    }) => (
        <UserProfilePost
        key={_id}
        postId={_id}
        postUserId={userId}
        name={`${firstName} ${lastName}`}
        description={description}
        stream={stream}
        picturePath={picturePath}
        userPicturePath={userPicturePath}
        likes={likes}
        comments={comments}
      />
    )
  )}
      
        </Box>
      </WidgetWrapper>
    </Box>
  </WidgetWrapper>
    
  )
}

export default ProfilePage


