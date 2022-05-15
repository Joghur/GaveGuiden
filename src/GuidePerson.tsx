import {
  Grid,
  Typography,
  Link,
  List,
  ListItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import React from "react";

import WishItem from "./WishItem";
import { Wish } from "./types";

type Props = {
  confirmant: boolean;
  person: string;
  wishes: Wish[];
  handleSelectedWish: (wish: Wish) => void;
};

export function GuidePerson({
  confirmant,
  person,
  wishes,
  handleSelectedWish,
}: Props) {
  const { t } = useTranslation(["translation"]);

  return (
    <>
      <Grid
        container
        item
        direction="column"
        // alignItems="center"
        // justifyContent="center"
        sx={{ mb: 13 }}
        xs={12}
        md={12}
      >
        <Grid
          item
          xs={6}
          md={12}
          style={{
            border: "2px solid silver",
            borderRadius: 20,
            textAlign: "center",
            boxShadow: "2px 2px 6px gray",
            // marginTop: 10,
            // marginBottom: 10,
            // paddingTop: 20,
            // paddingBottom: 20,
            padding: 40,
            // width: "100%",
          }}
        >
          <Typography
            style={{
              fontSize: 36,
              fontWeight: "bold",
              textShadow: "1px 1px 8px grey",
            }}
          >
            {person}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <List>
            {wishes
              .filter((wish) => {
                return wish.giver === undefined && wish.person === person;
              })
              .map((wish) => {
                return (
                  <ListItem key={wish.id}>
                    <Link onClick={() => handleSelectedWish(wish)}>
                      <WishItem wish={wish} confirmant={confirmant} />
                    </Link>
                  </ListItem>
                );
              })}
          </List>
        </Grid>
        {!confirmant && (
          <>
            <Grid
              item
              md={5}
              xs={4}
              style={{
                border: "2px solid brown",
                borderRadius: 20,
                textAlign: "center",
                boxShadow: "2px 2px 6px gray",
                marginTop: 10,
                marginBottom: 10,
                paddingTop: 20,
                paddingBottom: 20,
                // width: "75%",
              }}
            >
              <Typography
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textShadow: "1px 1px 8px grey",
                }}
              >
                {`${t("pageGuide.otherSuggestions")} ${person}`}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <List>
                {wishes
                  .filter((wish) => wish.giver && wish.person === person)
                  .map((wish) => {
                    return (
                      <ListItem key={wish.id}>
                        <Link onClick={() => handleSelectedWish(wish)}>
                          <WishItem wish={wish} confirmant={confirmant} />
                        </Link>
                      </ListItem>
                    );
                  })}
              </List>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

export default GuidePerson;
