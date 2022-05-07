import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Wish } from "./types";

interface WishDialogConfirmantProps {
  onDelete: (e?: string) => void;
  formValues: Wish;
  handleInputChange: any;
  handleSubmit: any;
  handleDelete: any;
  setFormValues: any;
  confirmant: boolean | undefined;
}

export default function WishDialogConfirmant(props: WishDialogConfirmantProps) {
  const { t } = useTranslation(["translation"]);

  const {
    onDelete,
    formValues,
    handleInputChange,
    setFormValues,
    handleSubmit,
    handleDelete,
    confirmant,
  } = props;

  const handleButtonPress = (str: any) => {
    console.log("str", str);
    console.log("confirmant", confirmant);
    if (!confirmant) {
      const { giver: remove, ...rest } = formValues;
      setFormValues({
        ...rest,
        person: str,
      });
      return;
    }
    setFormValues({
      ...formValues,
      person: str,
    });
  };

  return (
    <>
      <DialogContent>
        <DialogContentText>
          <Typography paragraph>
            {t("recipient")}{" "}
            <span
              style={{
                color: "blue",
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              {formValues.person}
            </span>
          </Typography>
        </DialogContentText>
        <TextField
          id="titel"
          name="titel"
          required
          label={t("titel")}
          type="text"
          value={formValues.titel}
          onChange={handleInputChange}
        />
        <TextField
          id="content"
          name="content"
          label={t("content")}
          type="text"
          value={formValues.content}
          onChange={handleInputChange}
          multiline
        />
        <TextField
          id="price"
          name="price"
          label={t("price")}
          type="text"
          value={formValues.price}
          onChange={handleInputChange}
          multiline
        />
        <TextField
          id="url"
          name="url"
          label={t("vendorUrl")}
          type="text"
          value={formValues.url}
          onChange={handleInputChange}
          multiline
        />
        <TextField
          id="imageUri"
          name="imageUri"
          label={t("imageUri")}
          type="text"
          value={formValues.imageUri}
          onChange={handleInputChange}
          multiline
        />
      </DialogContent>
      <Grid container justifyContent="center">
        <DialogContentText>
          <Typography>{t("whichRecipient")}</Typography>
        </DialogContentText>
      </Grid>
      <Grid container justifyContent="center">
        <Grid container item direction="row" justifyContent="center">
          <DialogActions>
            <Button
              onClick={() => handleButtonPress("Esther")}
              variant="contained"
              color="secondary"
            >
              Esther
            </Button>
            <Button
              onClick={() => handleButtonPress("Isabel")}
              variant="contained"
              color="secondary"
            >
              Isabel
            </Button>
          </DialogActions>
        </Grid>
        {!confirmant && !formValues.id && (
          <Grid item>
            <DialogActions>
              <Button
                onClick={() => handleButtonPress("Isabel,Esther")}
                variant="contained"
                color="secondary"
              >
                {t("both")}
              </Button>
            </DialogActions>
          </Grid>
        )}
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item>
          <DialogActions>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              type="submit"
            >
              {t("delete")}
            </Button>
          </DialogActions>
        </Grid>
        <Grid item>
          <DialogActions>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              type="submit"
            >
              {t("submit")}
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </>
  );
}
