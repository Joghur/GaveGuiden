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

import Header from "./Header";
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
  const [gift, setGift] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getData = async () => {
    const data = await queryDocuments("wishes", "groupId", "==", 2);
    if (data.success) {
      setWishes(data.success as Wish[]);
    }
  };

  console.log("wishes", wishes);

  useEffect(() => {
    if (!user) {
      setSettingsModal(true);
      return;
    }
    if (user.trim().toLowerCase().search("esther") > -1) setConfirmant(true);
    if (user.trim().toLowerCase().search("isabel") > -1) setConfirmant(true);
    setSettingsModal(false);
    setGift(() => false);
    getData();
  }, [user, refresh]);


  const handleClickOpen = () => {
    if (!confirmant) {
      setGift(() => true);
    }
    setSelectedWish(() => undefined);
    setOpenModal(() => true);
  };

  const handleClose = async (value?: Wish) => {
    console.log("value", value);
    setOpenModal(() => false);
    setGift(() => false);
    if (value) {
      if (value?.id && value.id === selectedWish?.id) {
        await editDocument("wishes", value.id, value);
      } else {
        if (value.person === "Isabel,Esther") {
          value.person = "Isabel";
          await saveData("wishes", value);
          value.person = "Esther";
          await saveData("wishes", value);
        } else {
          await saveData("wishes", value);
        }
      }
      setRefresh((old) => !old);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    console.log("id", id);
    if (id) {
      await deleteDocument("wishes", id);
      setSelectedWish(() => undefined);
      setOpenModal(() => false);
      setGift(() => false);
      setWishes((old: Wish[]) => {
        const filteredWishes = old.filter((w) => w.id !== id);
        console.log("filteredWishes", filteredWishes);
        return filteredWishes;
      });
    }
  };

  const changeUser = (userName: string) => {
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
        <Grid container direction="column" spacing={2}>
          {user && (
            <Grid item>
              <Typography variant="h6" paragraph>{`${t(
                "hi"
              )} ${user}`}</Typography>
            </Grid>
          )}
          {confirmant && (
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleClickOpen}
              >
                {t("new")}
              </Button>
            </Grid>
          )}
          {user && !confirmant && (
            <>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleClickOpen}
                >
                  {t("newGift")}
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  {t("pageGuide.newGift.text1")}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {t("pageGuide.newGift.text2")}
                </Typography>
                <Typography variant="subtitle1" color="GrayText">
                  {t("pageGuide.newGift.text3")}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      {/* {user && !confirmant && (
        <div style={{ margin: 100 }}>
          <Typography variant="h3">{t("wip")}</Typography>
        </div>
      )} */}
      {!openModal && wishes.length === 0 && (
        <div style={{ margin: 100 }}>
          <Typography variant="h3">{t("noWish")}</Typography>
        </div>
      )}
      {!openModal && wishes.length > 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              <Grid
                container
                direction="column"
                alignItems="center"
                style={{ marginBottom: 13 }}
              >
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
                <List>
                  {wishes
                    .filter((wish) => {
                      return (
                        wish.giver === undefined &&
                        wish.person === personOrder[0]
                      );
                    })
                    .map((wish) => {
                      return (
                        <ListItem key={wish.id}>
                          <div style={{ width: "100%", margin: 10 }}>
                            <Link onClick={() => handleSelectedWish(wish)}>
                              <WishItem wish={wish} confirmant={confirmant} />
                            </Link>
                          </div>
                        </ListItem>
                      );
                    })}
                </List>
                {!confirmant && (
                  <>
                    <span
                      style={{
                        border: "2px solid brown",
                        borderRadius: 20,
                        textAlign: "center",
                        boxShadow: "2px 2px 6px gray",
                        marginTop: 10,
                        marginBottom: 10,
                        width: "75%",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          textShadow: "1px 1px 8px grey",
                        }}
                      >
                        {`${t("pageGuide.otherSuggestions")} ${personOrder[0]}`}
                      </p>
                    </span>
                    <List>
                      {wishes
                        .filter(
                          (wish) => wish.giver && wish.person === personOrder[0]
                        )
                        .map((wish) => {
                          return (
                            <ListItem key={wish.id}>
                              <div style={{ width: "100%", margin: 10 }}>
                                <Link onClick={() => handleSelectedWish(wish)}>
                                  <WishItem
                                    wish={wish}
                                    confirmant={confirmant}
                                  />
                                </Link>
                              </div>
                            </ListItem>
                          );
                        })}
                    </List>
                  </>
                )}
              </Grid>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              <Grid
                container
                direction="column"
                alignItems="center"
                style={{ marginBottom: 13 }}
              >
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
                    .filter(
                      (wish) =>
                        wish?.giver === undefined &&
                        wish.person === personOrder[1]
                    )
                    .map((wish) => {
                      return (
                        <ListItem key={wish.id}>
                          <div style={{ width: "100%", margin: 10 }}>
                            <Link onClick={() => handleSelectedWish(wish)}>
                              <WishItem wish={wish} confirmant={confirmant} />
                            </Link>
                          </div>
                        </ListItem>
                      );
                    })}
                </List>
                {!confirmant && (
                  <>
                    <span
                      style={{
                        border: "2px solid brown",
                        borderRadius: 20,
                        textAlign: "center",
                        boxShadow: "2px 2px 6px gray",
                        marginTop: 10,
                        marginBottom: 10,
                        width: "75%",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          textShadow: "1px 1px 8px grey",
                        }}
                      >
                        {`${t("pageGuide.otherSuggestions")} ${personOrder[1]}`}
                      </p>
                    </span>
                    <List>
                      {wishes
                        .filter(
                          (wish) => wish.giver && wish.person === personOrder[1]
                        )
                        .map((wish) => {
                          return (
                            <ListItem key={wish.id}>
                              <div style={{ width: "100%", margin: 10 }}>
                                <Link onClick={() => handleSelectedWish(wish)}>
                                  <WishItem
                                    wish={wish}
                                    confirmant={confirmant}
                                  />
                                </Link>
                              </div>
                            </ListItem>
                          );
                        })}
                    </List>
                  </>
                )}
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
        gift={gift}
        handleGift={() => setGift(() => true)}
      />

      <SettingsDialog
        open={settingsModal}
        onClose={() => setSettingsModal(false)}
        changeUser={changeUser}
      />
    </div>
  );
}

export default Guide;
