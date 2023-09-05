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


const CustomersView = ({
    customers,
    setSelectedCustomer,
    setOpen,
    setOpenConfirm,
}: any) => {
    const theme = useTheme();
    const columns: GridColDef[] = [
      {
        field: "name",
        headerName: "Full Name",
        minWidth: 150,
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        minWidth: 200,
      },
      {
        field: "qualification",
        headerName: "Qualification",
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
        field: "labName",
        headerName: "Lab Name",
        minWidth: 100,
      },
      {
        field: "role",
        headerName: "Role",
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
              {/* <IconButton
                onClick={() => {
                  setSelectedCustomer(row);
                  setOpen(true);
                }}
              >
                <EditRounded />
              </IconButton> */}
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
          qualification: item?.qualification,
          state: item?.state,
          district: item?.district,
          area: item?.area,
          labName: item?.labName,
          role: item?.role == "user" ? "USER" :"ADMIN",
          createdAt: item?.createdAt,
        };
    });
    return (
        <Container maxWidth="lg">
            <Paper sx={{ background: theme.palette.background.paper }} variant="outlined">
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
        </Container>
    );
};


export default CustomersView;
