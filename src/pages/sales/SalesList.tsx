import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridToolbar,
} from "@mui/x-data-grid";
import {
    DeleteForeverRounded,
    EditRounded,
    VisibilityRounded,
} from "@mui/icons-material";
import { Box, IconButton, Container, Grid, Typography, Chip, Paper } from "@mui/material";
import { useTheme } from "@mui/system";
import { Link } from "react-router-dom";


const SalesView = ({
    sales,
    setSelectedSales,
    setOpen,
    setOpenConfirm,
}: any) => {
    const theme = useTheme();
    console.log(" All Sales :=: ", sales);
    const columns: GridColDef[] = [
    
            {
            field: "id",
            headerName: "Id",
            width: 50,
        },
        {
            field: "treatment",
            headerName: "Treatment",
            width: 150,
        },
        {
            field: "category",
            headerName: "Category",
            width: 150,
        },
        {
            field: "problem",
            headerName: "Problem",
            width: 150,
        },
        {
            field: "date",
            headerName: "Date ",
            width: 150,
            renderCell: (params: any) => {
                return <>{new Date(params.value).toLocaleDateString()}</>;
            },
        },
        {
            field: "user",
            headerName: "Added By",
            minWidth: 100
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 100
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params: any) => {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                setSelectedSales(params.row);
                                setOpen(true);
                            }}
                        >
                            <EditRounded />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setSelectedSales(params.row);
                                setOpenConfirm(true);
                            }}
                        >
                            <DeleteForeverRounded />
                        </IconButton>
                        <IconButton
                            component={Link}
                            to={`${params.row.id}`}
                        >
                            <VisibilityRounded />
                        </IconButton>

                    </Box>
                );
            },
        },
    ];

    const rows: GridRowsProp = sales?.result.map((item: any) => {
        return {
            id: item?.id,
            treatment: item?.treatment?.name,
            category: item?.treatment?.problem?.sector?.name,
            problem: item?.treatment?.problem?.name,
            date: item?.createdAt,
            user: item?.nameOne + " ",
            status : item?.treatment?.status == 1? "Approved":"Pending"
        };
    });

    return (
        <Container maxWidth="lg">
            <Paper sx={{ background: theme.palette.background.paper }} variant="outlined">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    pagination
                    rowsPerPageOptions={[5, 10, 20]}
                    initialState={{
                        pagination: {
                            pageSize: 10,
                        },
                    }
                    }
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </Paper>
        </Container>
    );
};

export default SalesView;