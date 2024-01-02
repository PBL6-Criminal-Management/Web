import React, { useState, useEffect } from "react";
import * as wantedCriminalsApi from "../../api/wanted-criminals";
import Header from "src/sections/wanted-criminals/wanted-criminal-header";
import { Unstable_Grid2 as Grid, Divider, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import { Scrollbar } from 'src/components/scrollbar';
import { styled } from '@mui/material/styles';
import WantedCriminalDetails from "src/sections/wanted-criminals/wanted-criminal-details/wanted-criminal-details";

const WantedCriminalDetailsPage = () => {
  const [wantedCriminal, setWantedCriminal] = useState({});
  const router = useRouter();
  const wantedId = decodeURIComponent(router.query.id);
  const wantedName = decodeURIComponent(router.query.name);
  const ScrollableContainer = styled(Scrollbar)({
    overflowY: 'auto',
    maxHeight: '100vh',
    // zIndex: 9999,
  });

  const getWantedCriminal = async () => {
    try {
      const wantedCriminal = await wantedCriminalsApi.getWantedCriminalById(wantedId);
      setWantedCriminal(wantedCriminal);
      setLastIndex(wantedCriminal.wantedCriminals.length - 1);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWantedCriminal();
  }, [wantedId]);

  return wantedCriminal && (
    <ScrollableContainer>
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
          maxWidth={1133}
          container
          sx={{
            alignItems: "center",
            paddingLeft: 3,
            paddingRight: 3,
          }}
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            mt={2}
            mb={2}
          >
            <Typography
              sx={{
                color: "error.main"
              }}
              variant='h5'
              mb={2}
            >
              Chi tiết đối tượng
            </Typography>
            <Divider />
          </Grid>
          <Grid
            container
            xs={12}
            md={12}
            lg={12}
            m={0}
            p={0}
            mb={2}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WantedCriminalDetails wantedCriminal={wantedCriminal} />
          </Grid>
        </Grid>
      </div>
    </ScrollableContainer>
  );
};

export default WantedCriminalDetailsPage;
