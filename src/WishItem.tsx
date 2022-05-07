import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { muiColors, Wish, WishStatus } from "./types";
import { convertEpochSecondsToDateString } from "./dates";

type Props = { confirmant: boolean; wish: Wish };

const chipColor = (status: string): muiColors => {
  let color: muiColors;
  if (!status) {
    color = "success";
  }

  switch (status) {
    case "bought":
      color = "error";
      break;

    case "seekingFunds":
      color = "warning";
      break;

    case "comment":
      color = "info";
      break;

    default:
      color = "success";
  }
  return color;
};

export default function WishItem(props: Props) {
  const { t } = useTranslation(["translation"]);

  const { confirmant, wish } = props;
  // console.log("wish", wish);
  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {wish.titel}
            </Typography>
            {/* <Typography variant="subtitle2" paragraph>
              {wish?.updatedAt ? `${t("updated")}: ` : `${t("created")}: `}
              {convertEpochSecondsToDateString(
                wish?.updatedAt?.seconds
                  ? wish.updatedAt.seconds
                  : wish?.createdAt?.seconds,
                "dd-MM-yyyy"
              )}
            </Typography> */}
            {!confirmant && wish.giver && (
              <Typography variant="body2" color="GrayText" paragraph>
                {`${t("suggestionBy")}: ${wish.giver}`}
              </Typography>
            )}
            <Typography variant="body2" paragraph>
              {wish?.content}
            </Typography>

            {!confirmant && wish.status && (
              <>
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <Typography variant="body1">Status:</Typography>
                  </Grid>
                  <Grid item sx={{ ml: 2 }}>
                    <Chip
                      label={t(wish.status)}
                      color={chipColor(wish.status)}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </CardContent>
          {wish?.imageUri && (
            <CardMedia
              component="img"
              sx={{
                height: "100%",
                width: 250,
                display: { sm: "block" },
                sizes: "small",
              }}
              image={wish.imageUri}
              alt=""
            />
          )}
        </Card>
      </CardActionArea>
    </Grid>
  );
}
