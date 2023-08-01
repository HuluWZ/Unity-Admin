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
  var categoriess = {
    "message": "OK",
    "RESPONSE": "SUCCESS",
    "statusCode": 200,
    "result": [
        {
            "id": 4,
            "uuid": "db16ed09-16cd-4f8c-b774-7a4dc52a164e",
            "title": "Testing...",
            "description": "Description",
            "imageUrl1": "https://admin.unityaqua.in/src/services/answer_upload/1688741253256IMG_20230707_174516.jpg",
            "imageUrl2": "https://admin.unityaqua.in/src/services/answer_upload/1688741253258IMG_20230707_174517.jpg",
            "imageUrl3": "https://admin.unityaqua.in/src/services/answer_upload/1688741253260IMG_20230707_174500.jpg",
            "imageUrl4": null,
            "imageUrl5": null,
            "status": "1",
            "createdAt": "2023-07-07T14:47:33.000Z",
            "updatedAt": "2023-07-07T14:47:33.000Z",
            "forumTopicId": 1,
            "userId": 1,
            "forum_topic": {
                "id": 1,
                "uuid": "3a7d5bd7-8f71-4711-bf4a-ae3943671ea6",
                "name": "Topic One",
                "createdAt": "2023-05-22T12:11:49.000Z",
                "updatedAt": "2023-05-22T12:11:49.000Z"
            },
            "user": {
                "id": 1,
                "uuid": "d1d399cb-02ea-4b92-852b-2c40a0da5a48",
                "name": "Yafet R.",
                "phoneNumber": "0923376048",
                "pin": 4321,
                "qualification": "Alyah",
                "state": "A.A",
                "district": "Nefas Slik Lafto",
                "area": "Addis Ababa",
                "labName": "Lab One",
                "role": "admin",
                "status": "1",
                "createdAt": "2023-05-23T20:07:24.000Z",
                "updatedAt": "2023-06-28T15:19:56.000Z"
            },
            "isBookmarked": false
        },
        {
            "id": 2,
            "uuid": "a67c00a9-b36a-447b-bdbe-5c1333ff7801",
            "title": "sample",
            "description": "give",
            "imageUrl1": "https://admin.unityaqua.in/src/services/answer_upload/1688739878353IMG-20230707-WA0002.jpg",
            "imageUrl2": "https://admin.unityaqua.in/src/services/answer_upload/1688739878355IMG_20230706_122215_146.jpg",
            "imageUrl3": "https://admin.unityaqua.in/src/services/answer_upload/1688739878357Screenshot_2023-07-06-12-21-58-09_1c337646f29875672b5a61192b9010f9.jpg",
            "imageUrl4": null,
            "imageUrl5": null,
            "status": "1",
            "createdAt": "2023-07-07T14:24:38.000Z",
            "updatedAt": "2023-07-07T14:24:38.000Z",
            "forumTopicId": 4,
            "userId": 3,
            "forum_topic": {
                "id": 4,
                "uuid": "4631566a-ade6-49df-b7ea-7cbbd844f71c",
                "name": "Topic Four",
                "createdAt": "2023-07-06T12:02:08.000Z",
                "updatedAt": "2023-07-06T12:02:08.000Z"
            },
            "user": {
                "id": 3,
                "uuid": "769574ec-3ff2-4865-9f1a-51e484b20445",
                "name": "karthik",
                "phoneNumber": "9390132330",
                "pin": 1997,
                "qualification": "lab technician",
                "state": "Andhra Pradesh",
                "district": "krishna",
                "area": "vijayawada",
                "labName": "sample",
                "role": "user",
                "status": "1",
                "createdAt": "2023-07-07T14:21:47.000Z",
                "updatedAt": "2023-07-07T14:21:47.000Z"
            },
            "isBookmarked": false
        },
        {
            "id": 1,
            "uuid": "48b0e3d3-a6c5-4f53-8334-34ff9666b45c",
            "title": "New Server",
            "description": "This is the first forum with the new server",
            "imageUrl1": null,
            "imageUrl2": null,
            "imageUrl3": null,
            "imageUrl4": null,
            "imageUrl5": null,
            "status": "1",
            "createdAt": "2023-07-07T12:20:10.000Z",
            "updatedAt": "2023-07-07T12:20:10.000Z",
            "forumTopicId": 1,
            "userId": 1,
            "forum_topic": {
                "id": 1,
                "uuid": "3a7d5bd7-8f71-4711-bf4a-ae3943671ea6",
                "name": "Topic One",
                "createdAt": "2023-05-22T12:11:49.000Z",
                "updatedAt": "2023-05-22T12:11:49.000Z"
            },
            "user": {
                "id": 1,
                "uuid": "d1d399cb-02ea-4b92-852b-2c40a0da5a48",
                "name": "Yafet R.",
                "phoneNumber": "0923376048",
                "pin": 4321,
                "qualification": "Alyah",
                "state": "A.A",
                "district": "Nefas Slik Lafto",
                "area": "Addis Ababa",
                "labName": "Lab One",
                "role": "admin",
                "status": "1",
                "createdAt": "2023-05-23T20:07:24.000Z",
                "updatedAt": "2023-06-28T15:19:56.000Z"
            },
            "isBookmarked": false
        }
    ]
}
  console.log(" Categories  : ", categoriess?.result);
  const rows: GridRowsProp = categoriess?.result?.map((item: any) => {
    return {
          id: item.id,
          title: item.title,
          topic: item?.forum_topic?.name,
          asker:item?.user?.name,
          createdAt: item?.createdAt,
          isReported: item?.isBookmarked ? "Yes" : "No",
          answers: item?.forumTopicId
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
            field: "topic",
            headerName: "Topic",
            width: 150,
    },
      {
            field: "asker",
            headerName: "Asker",
            width: 150,
    },
      {
            field: "createdAt",
            headerName: "Published Date",
            width: 150,
    },
{
            field: "isReported",
            headerName: "Reported",
            width: 150,
    },
    {
            field: "answers",
            headerName: "Answers ",
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
