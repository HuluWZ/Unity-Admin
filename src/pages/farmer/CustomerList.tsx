import {
    DataGrid,
    GridColDef,
    GridToolbar,
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
    Paper,
} from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import moment from "moment";
import { useTheme } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from 'axios';
import {useState,useEffect} from 'react';

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
     district: string
  };

   // Add other properties as needed
 }

const CustomersView = ({
    customers,
    setSelectedCustomer,
    setOpen,
    setOpenConfirm,
    handleUpdate
}: any) => {
    const theme = useTheme();
    const [all, setAll] = useState([]);
      useEffect(() => {
        async function fetchTopic() {
          const response = await axios.get(`${api}tank/`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(" All Tanks Before = ", response.data.result);
          // const data = await response.json();
          setAll(response?.data?.result);
          console.log(" Done ",all);
        }
        fetchTopic();
      }, []);
        console.log(" Customers ", customers,all);

   
    const columns: GridColDef[] = [
      {
        field: "name",
        headerName: "Name",
        minWidth: 150,
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        minWidth: 100,
      },
      {
        field: "state",
        headerName: "State",
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
        field: "cultureType",
        headerName: "Culture Type",
        minWidth: 100,
      },
      {
        field: "labOwner",
        headerName: "Lab Owner",
        minWidth: 100,
      },
      {
        field: "labName",
        headerName: "Lab Name",
        minWidth: 100,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        minWidth: 100,
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
        headerName: "Actions",
        minWidth: 100,
        renderCell: (params: any) => {
          const { row } = params;
          return (
            <>
              <IconButton
                onClick={() => {
                  setSelectedCustomer(row);
                  handleUpdate(row);
                  console.log(" Row ", row);
                }}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setSelectedCustomer(row);
                  setOpenConfirm(true);
                }}
              >
                <DeleteForeverRounded />
              </IconButton>
            </>
          );
        },
      },
    ];
     const columnss: GridColDef[] = [
       {
         field: "name",
         headerName: "Name",
         minWidth: 180,
       },
       {
         field: "area",
         headerName: "Area",
         minWidth: 100,
       },
       {
         field: "size",
         headerName: "Size",
         minWidth: 100,
       },
       {
         field: "cultureType",
         headerName: "Culture Type",
         minWidth: 100,
       },
       {
         field: "farmerName",
         headerName: "Farmer Name",
         minWidth: 150,
       },
       {
         field: "farmerPhone",
         headerName: "Farmer Phone",
         minWidth: 100,
       },
       {
         field: "state",
         headerName: "State",
         minWidth: 100,
       },
       {
         field: "district",
         headerName: "District",
         minWidth: 100,
       },
       {
         field: "createdAt",
         headerName: "Created At",
         minWidth: 100,
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
         headerName: "Actions",
         minWidth: 100,
         renderCell: (params: any) => {
           const { row } = params;
           return (
             <>
               <IconButton
                 onClick={() => {
                   setSelectedCustomer(row);
                   handleUpdate(row);
                   console.log(" Row ", row);
                 }}
               >
                 <CheckCircleOutlineIcon />
               </IconButton>
               <IconButton
                 onClick={() => {
                   setSelectedCustomer(row);
                   setOpenConfirm(true);
                 }}
               >
                 <DeleteForeverRounded />
               </IconButton>
             </>
           );
         },
       },
     ];


    const rows = customers?.result?.map((item: any) => {
        return {
          id: item?.id,
          name: item?.name,
          phoneNumber: item?.phoneNumber,
          cultureType: item?.cultureType,
          state: item?.state,
          district: item?.district,
          area: item?.area,
          labName: item?.user?.labName,
          labOwner: item?.user?.name,
          createdAt: item?.createdAt,
        };
    });
     const rowss = all?.map((item: any) => {
       return {
         id: item?.id,
         name: item?.name,
         area: item?.area,
         size: item?.size,
         cultureType: item?.cultureType,
         state: item?.farmer ? item?.farmer?.state : 'null',
         district: item?.farmer ? item?.farmer?.district : 'null',
         farmerName: item?.farmer ? item?.farmer?.name : 'null',
         farmerPhone: item?.farmer ? item?.farmer?.phoneNumber : 'null',
         createdAt: item?.createdAt,
       };
     });
     console.log(" All ",all);
    return (
      <>
        <Container maxWidth="lg">
          <Paper
            sx={{ background: theme.palette.background.paper }}
            variant="outlined"
          >
            <DataGrid
              rows={rows}
              columns={columns}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              autoHeight
              checkboxSelection
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </Paper>
          <h4>Tanks</h4>
          <Paper
            sx={{ background: theme.palette.background.paper }}
            variant="outlined"
          >
            <DataGrid
              rows={rowss}
              columns={columnss}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              autoHeight
              checkboxSelection
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </Paper>
        </Container>
      </>
    );
};


export default CustomersView;
