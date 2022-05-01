import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Wish } from "./types";
import Comments from "./Comments";

interface WishDialogNonConfirmantProps {
  handleSubmit: any;
  handleComment: any;
  formValues: Wish;
  comment: string;
}

export default function WishDialogNonConfirmant(
  props: WishDialogNonConfirmantProps
) {
  const { t } = useTranslation(["translation"]);

  const { handleSubmit, handleComment, formValues, comment } = props;

  return (
    <>
      <DialogContent>
        <Typography paragraph>
          {formValues.person && formValues.person}
        </Typography>
      </DialogContent>
      <DialogContent>
        <Typography paragraph>
          {formValues.titel && formValues.titel}
        </Typography>
      </DialogContent>
      <DialogContent>
        <Typography paragraph>
          {formValues.content && formValues.content}
        </Typography>
      </DialogContent>
      <DialogContent>
        <Typography paragraph>
          {formValues.price && formValues.price}
        </Typography>
      </DialogContent>
      <DialogContent>
        <Typography paragraph>
          {formValues.imageUri && formValues.url}
        </Typography>
      </DialogContent>
      <DialogContent>
        <Typography paragraph>
          {formValues.imageUri && formValues.imageUri}
        </Typography>
      </DialogContent>
      <DialogContent>
        <Typography paragraph>
          Status: {formValues.status && formValues.status}
        </Typography>
      </DialogContent>
      <Comments comments={formValues.comments} />
      <DialogContent>
        <TextField
          id="comment"
          name="comment"
          label={t("comment")}
          type="text"
          value={comment}
          onChange={(e) => handleComment(e)}
          multiline
        />
      </DialogContent>
      <Grid container justifyContent="space-between">
        <Grid item>
          <DialogActions>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              type="submit"
            >
              {t("submit")}
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </>
  );
}
