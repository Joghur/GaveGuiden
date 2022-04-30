import { useState } from "react";
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
import { useTranslation } from "react-i18next";

interface SettingDialogProps {
  onClose: any;
  open: boolean;
  submit?: any;
}

const SettingsDialog = (props: SettingDialogProps) => {
  const { t } = useTranslation(["translation"]);

  const [formValues, setFormValues] = useState("");
  const [error, setError] = useState("");

  const { open, onClose, submit: handleSubmit } = props;
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setFormValues(value);
  };

  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Indtast dit navn</DialogTitle>
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
          <DialogContentText>
            <Typography color="red">{error}</Typography>
          </DialogContentText>
        </DialogContent>
        <Grid container justifyContent="center">
          <DialogActions>
            <Button
              onClick={() => handleSubmit(formValues)}
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
