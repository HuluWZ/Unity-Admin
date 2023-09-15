import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Card, CardContent, CardMedia, CardActions,Typography ,Button,TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery,Avatar } from '@mui/material';
import { Chip } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const api = import.meta.env.VITE_API_URL;
const url = `${api}`;

//Heders for the request
const token = localStorage.getItem("token");

const Item = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxShadow: 'none',
    borderRadius: 0,
    '&:hover': {
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
    },
}));

const ItemMedia = styled(CardMedia)(({ theme }) => ({
    height: 300,
    backgroundSize: 'fit',

}));




const CategoryInfo = ({ category }: any) => {
    const theme = useTheme();
    console.log(" Selected  Item : ", category);
    // console.log(" Product Info - ",product.user)
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Item>
                <Typography
                  variant="body1"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    Lab Name:
                  </Box>
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    {category && " " + category.labName}
                  </Box>
                </Typography>

                <Typography
                  variant="body1"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    Lab Image:
                  </Box>
                </Typography>
                <Typography
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <div>
                    <a href={category.labImage} target="_blank">
                      <img
                        src={category.labImage}
                        alt="Lab Image"
                        width="250"
                        height="250"
                      />
                    </a>
                  </div>
                </Typography>

                <Typography
                  variant="body1"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    Lab Report Type:
                  </Box>
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    {category && category?.labReport}
                  </Box>
                </Typography>

                <Typography
                  variant="body1"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    Lab Logo:
                  </Box>
                </Typography>
                <Typography
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <div>
                    <a href={category.labLogo} target="_blank">
                      <img
                        src={category.labLogo}
                        alt="Lab Logo"
                        width="250"
                        height="250"
                      />
                    </a>
                  </div>
                </Typography>
                <Typography
                  variant="body1"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    Lab Report Image:
                  </Box>
                </Typography>
                <Typography
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <div>
                    <a href={category.labReportImage} target="_blank">
                      <img
                        src={category.labReportImage}
                        alt="Lab Report Image"
                        width="350"
                        height="350"
                      />
                    </a>
                  </div>
                </Typography>
              </Item>
            </Grid>

            <br></br>
            <Grid item xs={12} md={12}>
              <Item>
                <Typography fontWeight="fontWeightBold" m={1}>
                  User Details
                </Typography>
                <Typography
                  variant="body1"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    Full Name:
                  </Box>
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    {category && category?.name}
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    Phone Number:
                  </Box>
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    {category && category?.phoneNumber}
                  </Box>
                </Typography>

                <Typography
                  variant="body1"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    State:
                  </Box>
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    {category && category?.state}
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    District:
                  </Box>
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    {category && category?.district}
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    Area:
                  </Box>
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    {category && category?.area}
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    Qualification:
                  </Box>
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    theme.palette.mode === "dark" ? "#fff" : "text.primary"
                  }
                >
                  <Box fontWeight="fontWeightBold" m={1}>
                    {category && category?.qualification}
                  </Box>
                </Typography>
              </Item>
            </Grid>
          </Grid>
        </Grid>{" "}
      </Grid>
    );
}

export default CategoryInfo