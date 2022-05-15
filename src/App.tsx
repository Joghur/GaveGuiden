import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline, Grid, Badge, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Guide from "./Guide";
import ToolbarLine from "./Toolbar";
import QuiltedImageList from "./QuiltedImageList";
import { Post, LanguageShort } from "./types";
import { mainFeaturedPost, featuredPosts } from "./config";

const theme = createTheme();

export default function MainApp() {
  const { t, i18n } = useTranslation(["translation"]);

  const [page, setPage] = useState<"main" | "guide">("main");
  const [language, setLanguage] = useState<LanguageShort>("de");

  const sections = [
    { title: "home", onClick: () => setPage("main") },
    { title: "guide", onClick: () => setPage("guide") },
  ];

  const languageShorts = [
    { languageShort: "de", onClick: () => changeLanguage("de") },
    { languageShort: "dk", onClick: () => changeLanguage("dk") },
    { languageShort: "gb", onClick: () => changeLanguage("gb") },
  ];

  const changeLanguage = (lng: LanguageShort) => {
    i18n.changeLanguage(lng === "gb" ? "en" : lng); // i18n uses "en"
  };

  const handleFeaturePostClick = (post: Post) => {
    setPage(post.link);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <ToolbarLine sections={sections} languages={languageShorts} />
        {page === "main" && (
          <>
            <Header title={t("mainHeader")} />
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid
              container
              justifyContent="center"
              spacing={3}
              style={{ textAlign: "center" }}
            >
              <Grid item xs={7}>
                <Badge
                  badgeContent={t("badge.changeName")}
                  color="info"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Typography variant="h5" style={{ fontStyle: "bold" }}>
                    {t("pageIndex.newFeature")}
                  </Typography>
                </Badge>
                <Typography variant="body1" paragraph>
                  {t("pageIndex.newFeatureText.text1")}
                </Typography>
                <Typography variant="body1" paragraph>
                  {t("pageIndex.newFeatureText.text2")}
                </Typography>
                <Typography variant="body1">
                  {t("pageIndex.newFeatureText.text3")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" color="GrayText" paragraph>
                  {t("pageIndex.newFeatureText.text4")}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={4} justifyContent="center">
              {featuredPosts.map((post) => {
                return (
                  <Grid key={post.title} item xs={11}>
                    <FeaturedPost
                      post={post}
                      onClick={() => handleFeaturePostClick(post)}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Grid item justifyContent="center" style={{ marginTop: 70 }}>
              <QuiltedImageList />
            </Grid>
          </>
        )}
        {page === "guide" && (
          <Grid item xs={6}>
            <Guide />
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
}