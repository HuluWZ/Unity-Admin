import React from "react";
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
import { useNavigate,Link } from "react-router-dom";
import { useTheme } from "@mui/system";
const CategoriesView = ({
  categories,
  setSelectedCategory,
  setOpen,
  setOpenConfirm,
}: any) => {
  const theme = useTheme();

  const navigate = useNavigate();
  console.log(" Categories  : ", categories?.result);
  const rows: GridRowsProp = categories?.result?.map((item: any) => {
    return {
          id: item.id,
          title: item.title,
          description: item.description,
          topic: item?.topic?.name,
          thumbnail: item?.thumbnail,
          createdAt: item?.createdAt
        };
  });

  const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 50,
        },
    {
            field: "title",
            headerName: "Title",
            width: 150,
        },
        {
            field: "description",
            headerName: "Description",
            width: 350,
        },
        {
            field: "topic",
            headerName: "Topic",
            width: 150,
    },
    {
      field: "thumbnail",
      headerName: "Image",
      width: 400,
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CardMedia
            component="img"
            height="300"
            image={params?.row?.thumbnail}
            alt="green iguana"
          />
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
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            onClick={() => {
              setSelectedCategory(params.row);
              setOpen(true);
            }}
          >
            <EditRounded />
          </IconButton>
          <IconButton
            onClick={() => {
              setSelectedCategory(params.row);
              setOpenConfirm(true);
            }}
          >
            <DeleteForeverRounded />
          </IconButton>
           <IconButton component={Link} to={`${params.row.id}`}>
              <VisibilityRounded />
          </IconButton>
        </Box>
      ),
    },
  ];

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
              pageSize: 5,
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

export default CategoriesView;
