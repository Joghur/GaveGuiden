import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Wish } from "./types";
import WishItem from "./WishItem";
import { queryDocuments } from "./database";
import WishDialog from "./WishDialog";

function Guide() {
  const { t } = useTranslation(["translation"]);

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [wish, setWish] = useState<Wish>();
  const [openModal, setOpenModal] = useState(false);

  const getData = async () => {
    const data = await queryDocuments("wishes", "groupId", "==", 2);
    if (data.success) {
      setWishes(data.success as Wish[]);
    }
  };

  console.log("wishes", wishes);
  console.log("wish --------------", wish);

  useEffect(() => {
    getData();
  }, []);

  const setData = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // const einWish: Wish = {
    //   groupId: 2,
    //   titel: "Smykker",
    //   content: "string",
    //   price: "string",
    //   status: "bought",
    //   person: "Isabel",
    //   url: "string",
    //   imageUri: "string",
    //   comments: [
    //     {
    //       commenter: "Hans",
    //       comment: "Den har jeg købt",
    //       createdAt: new Date(),
    //     },
    //   ],
    //   createdAt: new Date(),
    // };
    // const res = await saveData("wishes", einWish);
    // console.log("res guide", res);
    // setWishes((old) => [...old, einWish]);
    // setMakeWish(true);
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = (value?: Wish) => {
    setOpenModal(false);
    setWish(value);
  };
  console.log("openModal", openModal);
  return (
    <div>
      <div style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <button onClick={handleClickOpen}>{t("new")}</button>
      </div>
      {!openModal &&
        wishes.length > 0 &&
        wishes.map((wish) => {
          return (
            <div style={{ width: 400, margin: 10 }}>
              <WishItem wish={wish} />
            </div>
          );
        })}
      {openModal && (
        <>
          <WishDialog
            open={openModal}
            onClose={(e) => handleClose(e)}
          />
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
