import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Wish } from "./types";
import WishItem from "./WishItem";
import { queryDocuments, saveData } from "./database";
import WishDialog from "./WishDialog";
import { Grid, Typography, List, ListItem } from "@mui/material";

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
        <button onClick={handleClickOpen}>{t("new")}</button>
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

// const wishesMockup: Wish[] = [
//   {
//     titel: "Penge",
//     content: "Så mange som muligt",
//     person: "Esther",
//     createdAt: new Date(),
//   },
//   {
//     titel: "Smykker",
//     content: "Fra Smykkeland",
//     status: "seekingFunds",
//     person: "Esther",
//     createdAt: new Date(),
//   },
//   {
//     titel: "Ure",
//     content: "Garmin",
//     status: "bought",
//     person: "Isabel",
//     url: "https://www.golfaktiv.com/detail/index/sArticle/2847?sPartner=123304461+&gclid=Cj0KCQjwxtSSBhDYARIsAEn0thTy6kW0ocV8gUmQ2E-5NjcFOYBUtXFe1pLnd_29_jMZQ4D74ZBj5owaAmEeEALw_wcB",
//     image:
//       "https://www.golfaktiv.com/media/image/46/dd/bf/garmin-approach-s62-gps-golf-uhr-entfernungsmesser-schwarz-schwarz-1_600x600.jpg",
//     comments: [
//       {
//         commenter: "Hans",
//         comment: "Den har jeg købt",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

// const change = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//   e.preventDefault();
//   setWishes((old) => [
//     ...old,
//     {
//       groupId: 2,
//       titel: "Heste",
//       content: "Fra Hesteland",
//       person: "Esther",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       groupId: 2,
//       titel: "Heste",
//       content: "Fra Hesteland",
//       person: "Isabel",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   ]);
// };

// const wishesArray: Wish[] = [
//   {
//     status: "bought",
//     comments: [
//       {
//         createdAt: {
//           seconds: 1650056274,
//           nanoseconds: 138000000,
//         },
//         comment: "Den har jeg købt",
//         commenter: "Hans",
//       },
//     ],
//     person: "Isabel",
//     url: "string",
//     titel: "Smykker",
//     price: "string",
//     createdAt: {
//       seconds: 1650056274,
//       nanoseconds: 138000000,
//     },
//     content: "string",
//     groupId: 2,
//     imageUri: "string",
//   },
//   {
//     status: "bought",
//     comments: [
//       {
//         createdAt: {
//           seconds: 1650056274,
//           nanoseconds: 138000000,
//         },
//         comment: "Den har jeg købt",
//         commenter: "Hans",
//       },
//     ],
//     person: "Isabel",
//     url: "string",
//     titel: "Smykker",
//     price: "string",
//     createdAt: {
//       seconds: 1650056274,
//       nanoseconds: 138000000,
//     },
//     content: "string",
//     groupId: 2,
//     imageUri: "string",
//   },
// ];
