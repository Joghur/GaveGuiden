import { Typography } from "@mui/material";
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
    <div>
      {comments.length > 0 &&
        comments.map((c: Comment) => <Typography>{`${c.commenter} - ${c.comment}`}</Typography>)}
    </div>
  );
};

export default Comments;
