import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid, Typography, List, ListItem } from "@mui/material";

import { Wish } from "./types";
import WishItem from "./WishItem";
import { queryDocuments, saveData } from "./database";
import WishDialog from "./WishDialog";
import SettingsDialog from "./SettingsDialog";

const shuffle = () => {
  let shuffableArray = ["Esther", "Isabel"];

  return shuffableArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const findWord = (word: string, str: string) => {
  return RegExp("\\b" + word + "\\b").test(str);
};

function Guide() {
  const { t } = useTranslation(["translation"]);

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [personOrder] = useState(shuffle);
  const storageUser: string = localStorage.getItem("user") || "";
  const [user, setUser] = useState(storageUser);
  const [confirmant, setConfirmant] = useState(false);

  const getData = async () => {
    const data = await queryDocuments("wishes", "groupId", "==", 2);
    if (data.success) {
      setWishes(data.success as Wish[]);
    }
  };

  // console.log("wishes", wishes);

  useEffect(() => {
    if (!user) {
      setSettingsModal(true);
      return;
    }
    if (findWord(user.toLowerCase(), "esther")) setConfirmant(true);
    if (findWord(user.toLowerCase(), "isabel")) setConfirmant(true);
    if (localStorage !== undefined) {
      localStorage.setItem("user", user);
    }
    setSettingsModal(false);
    getData();
  }, [user]);

  console.log("confirmant", confirmant);
  console.log("user", user);

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

  const handleSubmit = (userName: string) => {
    setUser(userName);
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            {t("new")}
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="h6">Hej {user}</Typography>
        </Grid>
      </Grid>
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
      <WishDialog open={openModal} onClose={(e) => handleClose(e)} />

      <SettingsDialog
        open={settingsModal}
        onClose={() => setSettingsModal(false)}
        submit={handleSubmit}
      />
    </div>
  );
}

export default Guide;
