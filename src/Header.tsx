import * as React from "react";
import { Grid } from "@mui/material";

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;

  return (
    <React.Fragment>
      <Grid container direction="column" style={{ marginBottom: 13 }}>
        <span
          style={{
            border: "2px solid gold",
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
              fontSize: 48,
              fontWeight: "bold",
              textShadow: "1px 1px 8px grey",
            }}
          >
            {title}
          </p>
        </span>
      </Grid>
    </React.Fragment>
  );
}
