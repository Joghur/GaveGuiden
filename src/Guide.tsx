import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid, Typography, List, ListItem } from "@mui/material";

import { Wish } from "./types";
import WishItem from "./WishItem";
import { queryDocuments, saveData } from "./database";
import WishDialog from "./WishDialog";

const shuffle = () => {
  let shuffableArray = ["Esther", "Isabel"];

  return shuffableArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

function Guide() {
  const { t } = useTranslation(["translation"]);

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [personOrder] = useState(shuffle);

  const getData = async () => {
    const data = await queryDocuments("wishes", "groupId", "==", 2);
    if (data.success) {
      setWishes(data.success as Wish[]);
    }
  };

  // console.log("wishes", wishes);

  useEffect(() => {
    getData();
  }, []);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = async (value?: Wish) => {
    // console.log("value", value);
    setOpenModal(false);
    if (value) {
      const res = await saveData("wishes", value);
      if (res.success) {
        setWishes((old: Wish[]) => [...old, value]);
      }
    }
  };

  return (
    <div>
      <div style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          {t("new")}
        </Button>
      </div>
      {!openModal && wishes.length > 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              <Grid container direction="column" style={{ marginBottom: 13 }}>
                <span
                  style={{
                    border: "2px solid silver ",
                    borderRadius: 20,
                    textAlign: "center",
                    boxShadow: "2px 2px 6px gray",
                    marginTop: 10,
                    marginBottom: 10,
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      fontSize: 36,
                      fontWeight: "bold",
                      textShadow: "1px 1px 8px grey",
                    }}
                  >
                    {personOrder[0]}
                  </p>
                </span>
              </Grid>
            </Typography>
            <List>
              {wishes
                .filter((wish) => wish.person === personOrder[0])
                .map((wish) => {
                  return (
                    <ListItem key={wish.id}>
                      <div style={{ width: "100%", margin: 10 }}>
                        <WishItem wish={wish} />
                      </div>
                    </ListItem>
                  );
                })}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              <Grid container direction="column" style={{ marginBottom: 13 }}>
                <span
                  style={{
                    border: "2px solid silver",
                    borderRadius: 20,
                    textAlign: "center",
                    boxShadow: "2px 2px 6px gray",
                    marginTop: 10,
                    marginBottom: 10,
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      fontSize: 36,
                      fontWeight: "bold",
                      textShadow: "1px 1px 8px grey",
                    }}
                  >
                    {personOrder[1]}
                  </p>
                </span>
              </Grid>
            </Typography>
            <List dense={true}>
              {wishes
                .filter((wish) => wish.person === personOrder[1])
                .map((wish) => {
                  return (
                    <ListItem key={wish.id}>
                      <div style={{ width: "100%", margin: 10 }}>
                        <WishItem wish={wish} />
                      </div>
                    </ListItem>
                  );
                })}
            </List>
          </Grid>
        </Grid>
      )}
      {openModal && (
        <>
          <WishDialog open={openModal} onClose={(e) => handleClose(e)} />
        </>
      )}
    </div>
  );
}

export default Guide;
