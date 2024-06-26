import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridCellParams,
} from "@mui/x-data-grid";
import {
  DeleteForeverRounded,
  EditRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Container,
  Typography,
  Avatar,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import moment from "moment";
import { useTheme } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const api = import.meta.env.VITE_API_URL;
interface MyData {
  id: number;
  name: string;
  area: string;
  size: string;
  cultureType: string;
  farmer: {
    name: string;
    phoneNumber: string;
    state: string;
    district: string;
  };
}
type ItemZero = {
  id: string;
  lab: string;
  farmer: string;
  farmerPhone: string;
  tankName: string;
  state: string;
  district: string;
  area: string;
  complexity: string;
  createdAt: string;
};
interface Item {
  id: number;
  lab: string;
  tank: {
    farmer: {
      name: string;
      phoneNumber: string;
      user: {
        labName: string;
        state: string;
        district: string;
        area: string;
      };
    };
    name: string;
  };
  status: string;
  createdAt: string;
}
interface OneRow {
  id: number;
  lab: string;
  farmer: string;
  farmerPhone: string;
  tankName: string;
  state: string;
  district: string;
  area: string;
  complexity: string;
  createdAt: string;
}
  var types = [
    "Water",
    "Fish",
    "Shrimp",
    "Soil",
    "Feed",
    "Pcr",
    "Culture",
    "Plankton",
  ];
const CustomersView = ({
  // customers,
  setSelectedCustomer,
  setOpen,
  setOpenConfirm,
  // setOpenConfirm2,
  // handleUpdate,
}: any) => {
  const theme = useTheme();
    const [all, setAll] = useState<Item[] | null>(null);

  const [selectedType, setSelectedType] = useState("water");
  const [selectedRoute, setSelectedRoute] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleTypeSelection = (type:string) => {
        const lastPart = location.pathname.split("/")[3] == "complex" ? "complex" : "";
      setSelectedType(type.toLowerCase());
      setSelectedRoute(lastPart);
  };
  useEffect(() => {
      async function fetchTopic() {
         console.log("API CALL ", window.location.href.split("/")[5]);
         const others =  window.location.href.split("/")[5] === "complex" ? "complex" : "";
        console.log(
          " IS Equal API   URL ",
          others,
          selectedRoute,
          others == selectedRoute
        );
         const response = await axios.get(
           `${api}${selectedType}/${selectedType}`,
           {
             headers: {
               "Content-Type": "application/json",
             },
           }
         );
         console.log(" All Values =", response?.data);
         setAll(response?.data?.result);
         console.log(" Done ", all);
  }
  fetchTopic();
}, [selectedType]);

  useEffect(() => {
    const { pathname } = location;
    const lastPart = location.pathname.split("/")[3] == "complex" ? "complex" : "";
    setSelectedRoute(lastPart);
  }, [location]);


 useEffect(() => {
   async function fetchTopic() {
     const others =
     window.location.href.split("/")[5] === "complex" ? "complex" : "";
     console.log(
       " IS Equal API Route",
       others,
       selectedRoute,
       others == selectedRoute
     );
     const response = await axios.get(
       `${api}${selectedType}/${selectedRoute}`,
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
     console.log(" All Values =", response?.data);
     setAll(response?.data?.result);
   }
   fetchTopic();
 }, [selectedRoute]);

  const others = window.location.href.split("/")[5] == "complex" ? "complex" : "";
  console.log("API CALL URL ", `${api}${selectedType}/${others}`);

  const columns: GridColDef[] = [
    {
      field: "lab",
      headerName: "Lab",
      minWidth: 100,
    },
    {
      field: "farmer",
      headerName: "Farmer",
      minWidth: 100,
    },
    {
      field: "farmerPhone",
      headerName: "Farmer",
      minWidth: 100,
    },
    {
      field: "tankName",
      headerName: "Tank Name",
      minWidth: 100,
    },
    {
      field: "state",
      headerName: "Location State",
      minWidth: 100,
    },
    {
      field: "district",
      headerName: "District",
      minWidth: 100,
    },
    {
      field: "area",
      headerName: "Area",
      minWidth: 100,
    },
    {
      field: "complexity",
      headerName: "Complexity",
      minWidth: 250,
      renderCell: (params: any) => {
        const { row } = params;
        const { complexity } = row;
        const key = Object.keys(complexity)
        const value = key?.map((value) => {return value.charAt(0).toUpperCase() + value.slice(1);}).join(", ");
        // console.log(" Complexity ",key,value);
        return (
          <>
            { selectedType != "pcr" && key.length >= 1 ? (
              <Typography variant="body1">{value}</Typography>
            ) 
            : 
            selectedType == "pcr" && key.length == 1 ? (
              <Typography variant="body1" color="red">
                Negative
              </Typography>
            ) : (
              <Typography variant="body1"></Typography>
            )}
          </>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 120,
      renderCell: (params: any) => {
        const { row } = params;
        const { createdAt } = row;
        return (
          <>
            <Typography variant="body1">
              {moment(createdAt).format("DD MMM YYYY")}
            </Typography>
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "View Report",
      minWidth: 30,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <>
            <IconButton
              onClick={() => {
                navigate(`${selectedType}/${row?.id}`);
              }}
            >
              <VisibilityRounded />
            </IconButton>
          </>
        );
      },
    },
  ];
  // let rows: Item[]  = [];
  let rows: OneRow[] = [
   
  ];


if(all){

   rows = all && all?.map((item: Item) => {
    return {
      id: item?.id,
      lab: item?.tank?.farmer?.user?.labName || "",
      farmer: item?.tank?.farmer?.name || "",
      farmerPhone: item?.tank?.farmer?.phoneNumber || "",
      tankName: item?.tank?.name || "",
      state: item?.tank?.farmer?.user?.state || "",
      district: item?.tank?.farmer?.user?.district || "",
      area: item?.tank?.farmer?.user?.area || "",
      complexity: item?.status || "",
      createdAt: item?.createdAt || "",
    };
  });
}

  console.log(" All ", types,all,rows);
  const handleCellClick = (params: GridCellParams) => {
    const { row, id, field } = params;
    if (field != "actions") {
       const others = window.location.href.split("/")[5];
      console.log(selectedType,id);
      navigate(`${selectedType}/${id}`);
    }
  };

  return (
    // <div>

    <Container maxWidth="lg">
      <Paper
        sx={{ background: theme.palette.background.paper }}
        variant="outlined"
      >
       <div>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {types.map((type) => (
            <Grid item key={type}>
              <Button
                variant={
                  selectedType.toLowerCase() === type.toLowerCase()
                  ? "contained"
                  : "outlined"
                }
                color="primary"
                onClick={() => handleTypeSelection(type)}
                >
                {type}
              </Button>
            </Grid>
          ))}
        </Grid>
        </div> 

        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          onCellClick={handleCellClick}
          pagination
          autoHeight
          // checkboxSelection
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Paper>
    </Container>
    // </div>
  );
};

export default CustomersView;
