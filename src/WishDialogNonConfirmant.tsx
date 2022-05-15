import {
  Button,
  Card,
  CardMedia,
  Fade,
  Grid,
  Link,
  TextField,
  Typography,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  Chip,
} from "@mui/material";
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
      <Grid container direction="row" justifyContent="center" sx={{ m: 2 }}>
        <Grid item xs={12} md={7}>
          <DialogContent>
            <Typography variant="h5" paragraph noWrap>
              {formValues.person && formValues.person}
            </Typography>
            {formValues?.imageUri && (
              <CardMedia
                component="img"
                sx={{ width: 160, display: { sm: "block" } }}
                image={formValues.imageUri}
                alt=""
              />
            )}
            <Typography variant="h5" noWrap={false} paragraph>
              {formValues.titel && formValues.titel}
            </Typography>
            <Typography paragraph>
              {formValues.content && formValues.content}
            </Typography>
            <Typography paragraph>
              {formValues.price && `${t("price")} ${formValues.price}`}
            </Typography>
            {formValues.url && (
              <Typography variant="h5" paragraph>
                <Link href={formValues.url} underline="none">
                  {t("linkVendor")}
                </Link>
              </Typography>
            )}
          </DialogContent>
        </Grid>
        <Grid container item xs={8} md={4}>
          <Card variant="outlined">
            <DialogContent>
              <Tooltip
                title={t("tooltip.changeStatus")}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <Grid container item direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {t("changeState")}
                    </Typography>
                    <Typography variant="body2" color="GrayText">
                      {t("tooltip.changeStatus")}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Chip
                      label={t("bought")}
                      color="error"
                      variant={
                        formValues.status === "bought" ? "filled" : "outlined"
                      }
                      clickable
                      onClick={() => handleStatusChange("bought")}
                    />
                  </Grid>
                  <Grid item>
                    <Chip
                      label={t("seekingFunds")}
                      color="warning"
                      variant={
                        formValues.status === "seekingFunds"
                          ? "filled"
                          : "outlined"
                      }
                      clickable
                      onClick={() => handleStatusChange("seekingFunds")}
                    />
                  </Grid>
                  <Grid item>
                    <Chip
                      label={t("comment")}
                      color="info"
                      variant={
                        formValues.status === "comment" ? "filled" : "outlined"
                      }
                      clickable
                      onClick={() => handleStatusChange("comment")}
                    />
                  </Grid>
                  <Grid item>
                    <Chip
                      label={t("pending")}
                      color="success"
                      variant={
                        formValues.status === "pending" ? "filled" : "outlined"
                      }
                      clickable
                      onClick={() => handleStatusChange("pending")}
                    />{" "}
                  </Grid>
                </Grid>
              </Tooltip>
            </DialogContent>
          </Card>
        </Grid>
        <Grid item>
          <DialogContentText>
            <Comments comments={formValues.comments} />
          </DialogContentText>
        </Grid>
      </Grid>
      <Grid item>
        <DialogContent>
          <TextField
            id="comment"
            name="comment"
            label={t("makeComment")}
            type="text"
            value={comment}
            onChange={(e) => handleComment(e)}
            multiline
            sx={{ width: "100%" }}
          />
        </DialogContent>
      </Grid>
      <DialogActions>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={4}>
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
            <Grid item xs={4}>
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
          <Grid item xs={4}>
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
