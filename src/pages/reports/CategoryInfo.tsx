import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Card,
  CardContent,
  Container,
  CardMedia,
  CardHeader,
  Divider,
  CardActions,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery,Avatar } from '@mui/material';
import { Chip } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PageView from "../../components/PageView";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify components and CSS
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const api = import.meta.env.VITE_API_URL;
const url = `${api}user/`;

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




const CategoryInfo = ({ category,selectType }: any) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleApprove = () => {
    setOpen(false); // Close the dialog

    axios
      .put(`${url}approve/${category.id}`)
      .then((response) => {
        // Handle success
        console.log("Item approved:", response.data);
        toast.success("User approved successfully", {
          position: "top-right",
          autoClose: 3000, // Auto-close the notification after 3 seconds
        });
        // You can add more logic here, such as updating your UI
      })
      .catch((error) => {
        // Handle error
        console.error("Error approving item:", error);
        toast.error("Error approving User", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };
  const filterObjectKeys = (obj) => {
    const excludedKeys = [
      "id",
      "createdAt",
      "updatedAt",
      "tankId",
      "tank",
      "status",
    ];
    return Object.entries(obj).reduce((filteredObj, [key, value]) => {
      if (!excludedKeys.includes(key) && value !== null) {
        filteredObj[key] = value;
      }
      return filteredObj;
    }, {});
  };
  const filteredObject = filterObjectKeys(category);
  const keysArray = Object.keys(filteredObject);
  const valuesArray = Object.values(filteredObject);
  const highlightedKeys = Object.keys(category?.status); // Keys to be highlighted

  console.log(" Filter  Category = ", keysArray, valuesArray);
  return (
    <PageView title={`${selectType} Report Detail`} backPath="/reports">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ height: "100%" }} variant="outlined">
              <CardHeader
                title="Farmer Detail"
                subheader={
                  <Typography variant="caption" color="secondary" gutterBottom>
                    {category?.tank?.farmer?.name}
                  </Typography>
                }
              />
              <Divider />
              <ToastContainer />

              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6} lg={6}>
                    <Typography
                      variant="body1"
                      color={
                        theme.palette.mode === "dark"
                          ? "textPrimary"
                          : "textSecondary"
                      }
                      gutterBottom
                    >
                      Name
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      {category?.tank?.farmer?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Typography
                      variant="body1"
                      color={
                        theme.palette.mode === "dark"
                          ? "textPrimary"
                          : "textSecondary"
                      }
                      gutterBottom
                    >
                      Mobile
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      {category?.tank?.farmer?.phoneNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Typography
                      variant="body1"
                      color={
                        theme.palette.mode === "dark"
                          ? "textPrimary"
                          : "textSecondary"
                      }
                      gutterBottom
                    >
                      Area
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      {category?.tank?.farmer?.area}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Typography
                      variant="body1"
                      color={
                        theme.palette.mode === "dark"
                          ? "textPrimary"
                          : "textSecondary"
                      }
                      gutterBottom
                    >
                      Culture Type
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      {category?.tank?.farmer?.cultureType}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ height: "100%" }} variant="outlined">
              <CardHeader
                title="Lab Detail"
                subheader={
                  <Typography variant="caption" color="secondary" gutterBottom>
                    {category?.tank?.farmer?.user?.labName}
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={6}>
                    <Typography
                      variant="body1"
                      color={
                        theme.palette.mode === "dark"
                          ? "textPrimary"
                          : "textSecondary"
                      }
                      gutterBottom
                    >
                      Name
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      {category?.tank?.farmer?.user?.labName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Typography
                      variant="body1"
                      color={
                        theme.palette.mode === "dark"
                          ? "textPrimary"
                          : "textSecondary"
                      }
                      gutterBottom
                    >
                      Area
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      {category?.tank?.farmer?.user?.area}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Typography
                      variant="body1"
                      color={
                        theme.palette.mode === "dark"
                          ? "textPrimary"
                          : "textSecondary"
                      }
                      gutterBottom
                    >
                      State
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      {category?.tank?.farmer?.user?.state}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Typography
                      variant="body1"
                      color={
                        theme.palette.mode === "dark"
                          ? "textPrimary"
                          : "textSecondary"
                      }
                      gutterBottom
                    >
                      District
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      {category?.tank?.farmer?.user?.district}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ height: "100%" }} variant="outlined">
              <CardHeader
                title="Sample Details"
                subheader={
                  <Typography variant="caption" color="secondary" gutterBottom>
                    {category?.tank?.name}
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={3}>
                    <Typography
                      variant="body1"
                      color={
                        theme.palette.mode === "dark"
                          ? "textPrimary"
                          : "textSecondary"
                      }
                      gutterBottom
                    >
                      Name
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      {category?.tank?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography
                      variant="body1"
                      color={
                        theme.palette.mode === "dark"
                          ? "textPrimary"
                          : "textSecondary"
                      }
                      gutterBottom
                    >
                      Size
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      {category?.tank?.size}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography
                      variant="body1"
                      color={
                        theme.palette.mode === "dark"
                          ? "textPrimary"
                          : "textSecondary"
                      }
                      gutterBottom
                    >
                      Area
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      {category?.tank?.area}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography
                      variant="body1"
                      color={
                        theme.palette.mode === "dark"
                          ? "textPrimary"
                          : "textSecondary"
                      }
                      gutterBottom
                    >
                      Date
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      {moment(category?.tank?.createdAt).format("DD MMM YYYY")}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ height: "100%" }} variant="outlined">
              <CardHeader
                title="Lab Report"
                subheader={
                  <Typography
                    variant="caption"
                    color="secondary"
                    gutterBottom
                    sx={{ textAlign: "center" }} // Center-align the text
                  >
                    {/* {category?.labName} */}
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={6}>
                  {keysArray.map((key, index) => (
                    <Grid item xs={6} md={3} key={key}>
                      <Typography
                        variant="body1"
                        color={highlightedKeys.includes(key) ? "red" : " green"}
                        gutterBottom
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Typography>
                      <Typography
                        variant="b}ody1"
                        color="textPrimary"
                        gutterBottom
                      >
                        {valuesArray[index]}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ height: "100%" }} variant="outlined">
              <CardHeader
                title="Suggestions"
                subheader={
                  <Typography
                    variant="caption"
                    color="secondary"
                    gutterBottom
                    sx={{ textAlign: "center" }} // Center-align the text
                  >
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={6}>
                    <Grid item xs={6} md={3} >
                      <Typography
                        variant="body1"
                        gutterBottom
                      >
                        Treatment
                      </Typography>
                      <Typography
                        variant="b}ody1"
                        color="textPrimary"
                        gutterBottom
                      >
                        {""}
                      </Typography>
                    </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </PageView>
  );
}

export default CategoryInfo