import { Paper, Box, Grid } from "@mui/material";

import { MainPost } from "./types";

interface MainFeaturedPostProps {
  post: MainPost;
}

export default function MainFeaturedPost(props: MainFeaturedPostProps) {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${post.image})`,
        height: "100%",
      }}
    >
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: "none" }}
          src={post.image}
          alt={post.imageLabel}
        />
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 300,
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          ></Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
