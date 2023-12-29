import React, { useState, useEffect } from "react";
import * as wantedCriminalsApi from "../../api/wanted-criminals";
import Header from "src/sections/wanted-criminals/wanted-criminal-header";
import { Grid } from "@mui/material";
import { useRouter } from 'next/router';

const WantedCriminalDetailsPage = () => {

  const router = useRouter();
  const wantedId = decodeURIComponent(router.query.id);
  const wantedName = decodeURIComponent(router.query.name);
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Header />
      <Grid
        container
        rowSpacing={1}
        display="flex"
        columnSpacing={{ xs: 3, md: 5 }}
        maxWidth={900}
        sx={{ alignItems: "center", justifyContent: "space-around" }}
      >
        
      </Grid>
    </div>
  );
};

export default WantedCriminalDetailsPage;
