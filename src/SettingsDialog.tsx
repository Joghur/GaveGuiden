import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface SettingDialogProps {
  onClose: any;
  open: boolean;
  changeUser?: any;
}

const SettingsDialog = (props: SettingDialogProps) => {
  const { t } = useTranslation(["translation"]);

  const [formValues, setFormValues] = useState("");

  const { open, onClose, changeUser } = props;

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormValues(value);
  };

  const handleSubmit = () => {
    changeUser(formValues);

    if (localStorage !== undefined) {
        console.log("formValues", formValues);
        localStorage.setItem("user", formValues.trim());
      }
  };

  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>{t("inputName")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              id="code"
              name="code"
              type="text"
              value={formValues}
              onChange={handleInputChange}
            />
          </DialogContentText>
        </DialogContent>
        <Grid container justifyContent="center">
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
      </Dialog>
    </>
  );
};

export default SettingsDialog;
