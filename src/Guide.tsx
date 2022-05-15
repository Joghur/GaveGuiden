import { useTranslation } from "react-i18next";
import {
  Button,
  Grid,
  Fade,
  Typography,
  Link,
  Tooltip,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

import { Wish } from "./types";
import GuidePerson from "./GuidePerson";
import {
  deleteDocument,
  editDocument,
  queryDocuments,
  saveData,
} from "./database";
import WishDialog from "./WishDialog";
import SettingsDialog from "./SettingsDialog";

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

  const handleChangeName = (e: any) => {
    console.log("e", e);
    if (!confirmant) {
      setSettingsModal(true);
    }
  };

  console.log("confirmant", confirmant);
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
      >
        <Grid container item direction="column" spacing={2}>
          {user && (
            <Grid item xs={12} md={6}>
              <Link onClick={handleChangeName} underline="none">
                <Tooltip
                  title={!confirmant && t("tooltip.changeName")}
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  followCursor={true}
                >
                  <Typography variant="h6" paragraph>
                    {`${t("hi")} ${user}  `}
                    {!confirmant && <FontAwesomeIcon icon={faEdit} />}
                  </Typography>
                </Tooltip>
              </Link>
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
      {!openModal && wishes.length === 0 && (
        <Grid item xs={8} md={6}>
          <Typography variant="h3">{t("noWish")}</Typography>
        </Grid>
      )}
      {!openModal && wishes.length > 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ mt: 4, mb: 2 }}>
            <GuidePerson
              confirmant={confirmant}
              person={personOrder[0]}
              wishes={wishes}
              handleSelectedWish={handleSelectedWish}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: 4, mb: 2 }}>
            <GuidePerson
              confirmant={confirmant}
              person={personOrder[1]}
              wishes={wishes}
              handleSelectedWish={handleSelectedWish}
            />
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
    </>
  );
}

export default Guide;
