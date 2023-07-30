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
import {
  Box,
  IconButton,
  Container,
  Grid,
  colors,
  Paper,
  CardMedia,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const ProductsView = ({
    products,
    setSelectedProduct,
    setOpen,
    setOpenConfirm,
}: any) => {

    // console.log("   products", products)
    const theme = useTheme();

    const columns: GridColDef[] = [
    {
            field: "id",
            headerName: "ID",
            width: 50,
        },
        {
            field: "title",
            headerName: "Title",
            width: 250,
        },
        {
            field: "topic",
            headerName: "Topic",
            width: 150,
        },
    
            {
      field: "thumbnail",
      headerName: "Thumbnail",
      width: 300,
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CardMedia
            component="img"
            height="300"
            image={params?.row?.thumbnail}
            alt="View Pdf"
          />
        </Box>
      ),
        },
    {
      field: "url",
      headerName: "File",
      width: 300,
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <a href={params?.row?.url} target="_blank"> View Pdf </a>
            
        </Box>
      ),
        },
        {
            field: "createdAt",
            headerName: "Published Date",
            width: 150,
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
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                setSelectedProduct(params.row);
                                setOpen(true);
                            }}
                        >
                            <EditRounded />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setSelectedProduct(params.row);
                                setOpenConfirm(true);
                            }}
                        >
                            <DeleteForeverRounded />
                        </IconButton>
                        {/* <IconButton component={Link} to={`${params.row.id}`}> */}
                            {/* <VisibilityRounded /> */}
                        {/* </IconButton> */}
                    </Box>
                );
            },
        },
    ];

    const rows: GridRowsProp = products?.result?.map((product: any) => {
        console.log(" Books = ", products)
        return {
          id: product.id,
          title: product.title,
          topic: product?.topic?.name,
          thumbnail: product?.thumbnailUrl,
          url: product?.url,
          createdAt: product?.createdAt
        };
    });

    return (
        <Container maxWidth="lg">
            <Paper sx={{ background: theme.palette.background.paper }} variant="outlined">

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pagination
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    autoHeight
                    initialState={{
                        pagination: {
                            pageSize: 10,
                        },
                    }}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    sx={{
                        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.05)",
                    }}
                />
            </Paper>
        </Container>
    );
};

export default ProductsView;
