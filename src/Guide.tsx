import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Chip,
  Grid,
  Typography,
  Link,
  List,
  ListItem,
} from "@mui/material";

import { Wish } from "./types";
import WishItem from "./WishItem";
import {
  deleteDocument,
  editDocument,
  queryDocuments,
  saveData,
} from "./database";
import WishDialog from "./WishDialog";
import SettingsDialog from "./SettingsDialog";
import Comments from "./Comments";

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
  const [selectedWish, setSelectedWish] = useState<Wish | undefined>(undefined);
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
    console.log("user", user);
    console.log(
      "user.trim().toLowerCase().search(esther)",
      user.trim().toLowerCase().search("esther")
    );
    if (user.trim().toLowerCase().search("esther") > -1) setConfirmant(true);
    if (user.trim().toLowerCase().search("isabel") > -1) setConfirmant(true);
    if (localStorage !== undefined) {
      localStorage.setItem("user", user.trim());
    }
    setSettingsModal(false);
    getData();
  }, [user]);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = async (value?: Wish) => {
    console.log("value", value);
    setOpenModal(false);
    if (value) {
      let res;
      if (value?.id && value.id === selectedWish?.id) {
        console.log("editDocument", editDocument);
        res = await editDocument("wishes", value.id, value);
      } else {
        console.log("saveData", editDocument);
        res = await saveData("wishes", value);
      }
      if (res.success) {
        setWishes((old: Wish[]) => {
          const filteredWishes = old.filter((w) => w.id !== value?.id);
          filteredWishes.push(value);
          console.log("filteredWishes", filteredWishes);
          return filteredWishes;
        });
      }
    }
    setSelectedWish(undefined);
  };

  const handleDelete = async (id: string | undefined) => {
    console.log("id", id);
    if (id) {
      await deleteDocument("wishes", id);
      setSelectedWish(undefined);
      setOpenModal(false);
      setWishes((old: Wish[]) => {
        const filteredWishes = old.filter((w) => w.id !== id);
        console.log("filteredWishes", filteredWishes);
        return filteredWishes;
      });
    }
  };

  const handleSubmit = (userName: string) => {
    setUser(userName);
  };

  const handleSelectedWish = (wish: Wish) => {
    setSelectedWish(() => wish);
    setOpenModal(() => true);
  };
  console.log("confirmant", confirmant);
  return (
    <div>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {confirmant && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
            >
              {t("new")}
            </Button>
          </Grid>
        )}
        {user && (
          <Grid item>
            <Typography variant="h6">Hej {user}</Typography>
          </Grid>
        )}
      </Grid>
      {/* {user && !confirmant && (
        <div style={{ margin: 100 }}>
          <Typography variant="h3">{t("wip")}</Typography>
        </div>
      )} */}
      {!openModal && wishes.length === 0 && (
        <div style={{ margin: 100 }}>
          <Typography variant="h3">Ingen ønsker endnu</Typography>
        </div>
      )}
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
                        <Link onClick={() => handleSelectedWish(wish)}>
                          <WishItem wish={wish} />
                        </Link>
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
                <List>
                  {wishes
                    .filter((wish) => wish.person === personOrder[1])
                    .map((wish) => {
                      return (
                        <ListItem key={wish.id}>
                          <div style={{ width: "100%", margin: 10 }}>
                            <Link onClick={() => handleSelectedWish(wish)}>
                              <WishItem wish={wish} />
                            </Link>
                          </div>
                        </ListItem>
                      );
                    })}
                </List>
              </Grid>
            </Typography>
          </Grid>
        </Grid>
      )}
      <WishDialog
        open={openModal}
        onClose={(e) => handleClose(e)}
        onDelete={(id) => handleDelete(id)}
        wish={selectedWish}
        user={user}
        confirmant={confirmant}
      />

      <SettingsDialog
        open={settingsModal}
        onClose={() => setSettingsModal(false)}
        submit={handleSubmit}
      />
    </div>
  );
}

export default Guide;
