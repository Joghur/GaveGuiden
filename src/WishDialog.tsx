import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Wish } from "./types";

interface WishDialogProps {
  onClose: (e?: Wish) => void;
  open: boolean;
}

const defaultValues: Wish = {
  groupId: 2,
  titel: "",
  content: "",
  price: "",
  status: undefined,
  person: "Esther",
  url: "",
  imageUri: "",
  comments: [],
  createdAt: new Date(),
};

export default function WishDialog(props: WishDialogProps) {
  const { t } = useTranslation(["translation"]);

  const { onClose, open } = props;

  const [formValues, setFormValues] = useState<Wish>(defaultValues);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(formValues);
    onClose(formValues);
  };

  const handleClose = () => {
    onClose();
  };

  console.log("formValues", formValues);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <Grid container alignItems="center" direction="column">
        <Grid item>
          <TextField
            id="titel-input"
            name={t("titel")}
            label={t("titel")}
            type="text"
            value={formValues.titel}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="content-input"
            name="{sdfsdfsdf}"
            label={t("content")}
            type="text"
            value={formValues.content}
            onChange={handleInputChange}
            multiline
          />
        </Grid>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          type="submit"
        >
          {t("submit")}
        </Button>
      </Grid>
    </Dialog>
  );
}
