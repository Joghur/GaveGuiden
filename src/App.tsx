import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline, Grid } from "@mui/material";
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

export default function App() {
  const { t, i18n } = useTranslation(["translation"]);

  const [language, setLanguage] = useState<LanguageShort>("de");

  const languageShorts = [
    { languageShort: "de", onClick: () => changeLanguage("de") },
    { languageShort: "dk", onClick: () => changeLanguage("dk") },
    { languageShort: "gb", onClick: () => changeLanguage("gb") },
  ];

  const changeLanguage = (lng: LanguageShort) => {
    i18n.changeLanguage(lng === "gb" ? "en" : lng); // i18n uses "en"
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <ToolbarLine languages={languageShorts} />
        <Header title={t("mainHeader")} />
        <MainFeaturedPost post={mainFeaturedPost} />
        <Grid>
          <Guide />
        </Grid>
        <Grid item justifyContent="center" style={{ marginTop: 70 }}>
          <QuiltedImageList />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
