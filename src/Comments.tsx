import { Grid, Typography } from "@mui/material";
import React from "react";

import { Comment } from "./types";

type Props = { comments: Comment[] };

const Comments = (props: Props) => {
  const { comments } = props;

  if (!comments) {
    return null;
  }

  if (comments.length === 0) {
    return null;
  }

  return (
    <>
      <Grid container direction="column" spacing={2}>
        {comments.length > 0 &&
          comments.map((c: Comment) => (
            <Grid container item direction="column">
              <Grid item>
                <Typography color="CaptionText">{c.commenter}</Typography>
              </Grid>
              <Grid item  sx={{marginRight: 5}}>
                <Typography noWrap={false}>{` - ${c.comment}`}</Typography>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Comments;
