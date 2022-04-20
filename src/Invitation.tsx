import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";

import { config } from "./config";

type Props = { languageShort: string };

function Invitation({ languageShort = "de" }: Props) {
  const url = `${config.url}/invitation_${languageShort}.png`;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{
              height: "100%",
              display: { sm: "block" },
            }}
            image={url}
            alt="Invitation"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default Invitation;
