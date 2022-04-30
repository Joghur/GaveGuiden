import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface FeaturedPostProps {
  post: {
    date?: string;
    description?: string;
    image?: string;
    imageLabel?: string;
    title: string;
  };
  onClick?: () => void;
  onCancel?: () => void;
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { t } = useTranslation(["translation"]);

  const { post, onClick, onCancel } = props;

  return (
    <Grid item>
      <Link onClick={onClick} underline="none">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {t(post.title)}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description && t(post.description)}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: 260,
              height: 260,
              display: { sm: "block" },
            }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </Link>
    </Grid>
  );
}
