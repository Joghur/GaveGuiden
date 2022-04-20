import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useTranslation } from "react-i18next";

import { Wish } from "./types";
import { convertEpochSecondsToDateString } from "./dates";

type Props = { wish: Wish };

export default function WishItem(props: Props) {
  const { t } = useTranslation(["translation"]);

  const { wish } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {wish.titel}
            </Typography>
            <Typography variant="subtitle2" paragraph>
              {wish?.updatedAt ? `${t("created")}: ` : `${t("updated")}: `}
              {convertEpochSecondsToDateString(
                wish?.updatedAt?.seconds
                  ? wish.updatedAt.seconds
                  : wish?.createdAt?.seconds,
                "dd-MM-yyyy"
              )}
            </Typography>
            <Typography variant="h6" paragraph>
              {wish.content}
            </Typography>
          </CardContent>
          {wish.imageUri && (
            <CardMedia
              component="img"
              sx={{ width: 160, display: { sm: "block" } }}
              image={wish.imageUri}
              alt={wish.titel}
            />
          )}
        </Card>
      </CardActionArea>
    </Grid>
  );
}
