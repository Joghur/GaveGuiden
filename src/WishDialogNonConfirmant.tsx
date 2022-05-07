import {
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogTitle,
  Grid,
  Link,
  TextField,
  Typography,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  Stack,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Wish, WishStatus } from "./types";
import Comments from "./Comments";

interface WishDialogNonConfirmantProps {
  handleSubmit: any;
  handleComment: any;
  handleClose: any;
  handleStatus: any;
  handleGift: any;
  formValues: Wish;
  comment: string;
}

export default function WishDialogNonConfirmant(
  props: WishDialogNonConfirmantProps
) {
  const { t } = useTranslation(["translation"]);

  const {
    handleSubmit,
    handleComment,
    handleClose,
    handleStatus,
    handleGift,
    formValues,
    comment,
  } = props;

  const handleStatusChange = (newStatus: WishStatus) => {
    console.log("handleStatusChange, newStatus", newStatus);
    handleStatus(newStatus);
  };

  const handleOnClose = () => {
    handleClose();
  };

  const handleOnSubmit = (e: any) => {
    handleSubmit(e);
  };

  return (
    <>
      <DialogContent>
        <Typography variant="h5" paragraph noWrap>
          {formValues.person && formValues.person}
        </Typography>
      </DialogContent>
      {formValues?.imageUri && (
        <Card sx={{ display: "flex", width: "100%" }}>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { sm: "block" } }}
            image={formValues.imageUri}
            alt=""
          />
        </Card>
      )}
      <DialogContent>
        <Typography variant="h5" noWrap paragraph>
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
          {formValues.price && `Pris ${formValues.price}`}
        </Typography>
      </DialogContent>
      {formValues.url && (
        <DialogContent>
          <Typography variant="h5" paragraph>
            <Link href={formValues.url}>Link til forhandler</Link>
          </Typography>
        </DialogContent>
      )}
      <DialogContent>
        <Stack direction="row" alignItems="content" spacing={1}>
          <Typography paragraph>Skift status</Typography>
          <Chip
            label={t("bought")}
            color="error"
            variant={formValues.status === "bought" ? "filled" : "outlined"}
            clickable
            onClick={() => handleStatusChange("bought")}
          />
          <Chip
            label={t("seekingFunds")}
            color="warning"
            variant={
              formValues.status === "seekingFunds" ? "filled" : "outlined"
            }
            clickable
            onClick={() => handleStatusChange("seekingFunds")}
          />
          <Chip
            label={t("comment")}
            color="info"
            variant={formValues.status === "comment" ? "filled" : "outlined"}
            clickable
            onClick={() => handleStatusChange("comment")}
          />
          <Chip
            label={t("pending")}
            color="success"
            variant={formValues.status === "pending" ? "filled" : "outlined"}
            clickable
            onClick={() => handleStatusChange("pending")}
          />
        </Stack>
      </DialogContent>
      <DialogContentText>
        <Comments comments={formValues.comments} />
      </DialogContentText>
      <DialogContent>
        <TextField
          id="comment"
          name="comment"
          label={t("makeComment")}
          type="text"
          value={comment}
          onChange={(e) => handleComment(e)}
          multiline
          sx={{width:"100%"}}
        />
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button
              onClick={handleClose}
              variant="contained"
              color="error"
              type="submit"
            >
              {t("cancel")}
            </Button>
          </Grid>
          {formValues.giver && (
            <Grid item>
              <Tooltip
                followCursor={true}
                title="Du kan ændre dit gave forslag her"
              >
                <Button
                  onClick={handleGift}
                  variant="contained"
                  color="warning"
                  type="submit"
                >
                  {t("editGift")}
                </Button>
              </Tooltip>
            </Grid>
          )}
          <Grid item>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              type="submit"
            >
              {t("save")}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
}
