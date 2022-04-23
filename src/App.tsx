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
import { LanguageShort } from "./types";
import { mainFeaturedPost, featuredPosts } from "./config";

const theme = createTheme();

export default function App() {
  const { t, i18n } = useTranslation(["translation"]);

  const [page, setPage] = useState<"main" | "guide">("main");

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <ToolbarLine sections={sections} languages={languageShorts} />
        {page === "main" && (
          <>
            <Header title={t("mainHeader")} />
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={4}>
              {featuredPosts.map((post) => {
                return (
                  <FeaturedPost
                    key={post.title}
                    post={post}
                    onClick={() => setPage(post.link)}
                    onCancel={() => setPage("main")}
                  />
                );
              })}
            </Grid>
            <Grid item justifyContent="center" style={{ marginTop: 70 }}>
              <QuiltedImageList />
            </Grid>
          </>
        )}
        {page === "guide" && (
          <>
            <Header title={t("guide")} />
            <Guide />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}
