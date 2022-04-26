import * as React from "react";
import { Button, Grid, Link, Toolbar } from "@mui/material";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  sections?: ReadonlyArray<{
    title: string;
    onClick?: () => void;
  }>;
  languages: ReadonlyArray<{
    languageShort: string;
    onClick?: () => void;
  }>;
}

export default function ToolbarLine(props: HeaderProps) {
  const { t } = useTranslation(["translation"]);

  const { sections, languages } = props;

  return (
    <React.Fragment>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          {sections && (
            <Toolbar>
              {sections.map((section) => (
                <Link
                  key={section.title}
                  onClick={section?.onClick}
                  underline="none"
                >
                  <Button size="small">{t(section.title)}</Button>
                </Link>
              ))}
            </Toolbar>
          )}
        </Grid>
        <Grid item>
          <Toolbar component="nav" variant="dense" sx={{ overflowX: "auto" }}>
            {languages.map((section) => (
              <Link key={section.languageShort} onClick={section?.onClick}>
                <Button size="large">
                  {getUnicodeFlagIcon(section.languageShort)}
                </Button>
              </Link>
            ))}
          </Toolbar>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
