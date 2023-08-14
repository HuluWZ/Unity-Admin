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
import { Box, IconButton, Container, Grid, Typography, Chip,Button, Paper,Dialog, DialogTitle, DialogContent, DialogActions, TextField   } from "@mui/material";
import { 
  colors, 
  Card,
  CardContent,
  Snackbar,
DialogContentText
} from "@mui/material"; 
import { useTheme } from "@mui/system";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react'
import axios from 'axios';

const api = import.meta.env.VITE_API_URL; 
const url = `${api}treatment`; 
const token = localStorage.getItem("token") || "";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  card: {
    minHeight: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    },
  card2: {
    minHeight: 80,
    minWidth: 180,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));


const SalesView = ({
    sales,
    setSelectedSales,
    setOpen,
    setOpenConfirm,
}: any) => {
    const classes = useStyles(); // Assign the classes object to a variable
    const [categories, setCategories] = useState([{ id: '', name: '' }]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProblem, setSelectedProblem] = useState('');
    const [problems, setProblem] = useState([{ id: '', name: '' }]);
    const [solutions, setSolution] = useState([{ id: '', name: '',description:'',images:[''],imageUrl1:'',imageUrl2:'',imageUrl3:'' }]);
    const [message, setMessage] = useState('');
    const [selectedIndex, setIndex] = useState(0)
    const [problemIndex, setProblemIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSectorName, setNewSectorName] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('success'); // 'success' or 'error'

    useEffect(() => {
        async function fetchTopic() {
            console.log("Method Called ", url)
            const response = await fetch(`${url}/sector`, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            console.log(" Get All Sector : ", data?.result)
            setCategories(data?.result);
        }
        fetchTopic();
    }, []);
    const handleSectorClick = async (id: any,name:string,index:number) => {
        const response = await fetch(`${url}/problem/sector/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        setSelectedCategory(name);
        setIndex(index);
        console.log(" Sector ",name," Id: ",id)
        const data = await response.json();
        console.log(" Get Selected Problem : ", data?.result,name)
        setProblem(data?.result);
    }

    const handleProblemClick = async (id: any,name:string,index:number) => {
        const response = await fetch(`${url}/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        setSelectedProblem(name);
        setProblemIndex(index);
        console.log(" Selected Problem ",name," Id: ",id)
        const data = await response.json();
        console.log(" Get Selected Solution : ", data?.result)
        setSolution(data?.result);
    }
    // Handle Modal 
    const handleModalOpen = () => {
      setIsModalOpen(true);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
      setNewSectorName(''); // Clear the input field
    };
    const handleNewSectorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewSectorName(event.target.value);
    };
    const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


    const handleAddSector = async() => {
      const data = {name:newSectorName};
        // Make your API POST request here with newSectorName
        console.log(" new Sector Data ", data);
        const response = await axios.post(`${url}/sector`, data, {
            headers: {
                "Content-Type": "application/json",
                // authtoken: `${token}`
            }
        });
                setIsModalOpen(false);

        if (response?.data?.result) {
         console.log(" Sucess ")   
         setSnackbarColor('success');
         setSnackbarMessage('Sector added successfully');

        } else {
            console.log(" Error ")   
           setSnackbarColor('error');
          setSnackbarMessage('Failed to add sector');

        }
        // setSnackbarOpen(false);


        console.log(" Response Create Sector ",response)
  };


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

    const rowSolution: GridRowsProp = solutions?.map((item: any) => {
        return {
            id: item?.id,
            treatment: item?.name,
            category: item?.problem?.sector?.name,
            problem: item?.problem?.name,
            date: item?.createdAt,
            user: item?.nameOne + " ",
            status : item?.treatment?.status == 1? "Approved":"Pending"
        };
    });
    return (
        <>
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
                <hr></hr>
                <br></br><br></br>

    <div>
                    <Grid container spacing={3}>
                                        <Button variant="contained" color="primary"
                    onClick={handleModalOpen}
                    style={{ marginLeft: 780 }}>
                    Add Sector
                        </Button>
                        <br></br>
                        <br></br>
      </Grid>
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>Add New Sector</DialogTitle>
        <DialogContent>
            <TextField
            label="Sector Name"
            value={newSectorName}
            onChange={handleNewSectorNameChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">Cancel</Button>
          <Button onClick={handleAddSector} color="primary">Add</Button>
        </DialogActions>
                    </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        // Use 'success' or 'error' color here
        sx={{ backgroundColor: snackbarColor === 'success' ? 'green' : 'red' }}

      >
        <Typography variant="body1">{snackbarMessage}</Typography>
      </Snackbar>

    </div>
        <Grid container spacing={3} >
         {categories.map((sector, index) => (
            <Grid item xs={10} sm={7} md={3} key={index}>
            <Card className={classes.card}>
                     <Typography variant="h6"
                         onClick={() => handleSectorClick(sector?.id, sector?.name,index)}
                         style={{ fontWeight: selectedIndex == index ? 'bold' : 'normal' }}
                       >
                         {sector?.name}
                     </Typography>
                 {/* <IconButton >
                 </IconButton> */}

            </Card>
           </Grid>
         ))}
        </Grid>
                      <hr /> {/* This is the horizontal line */}
                <br>
                </br>

      <Grid container spacing={3} >
        {/* <Typography># Problems on Sector <b>{selectedCategory}</b></Typography> */}
        { problems[0]?.id &&
        problems?.length > 0 ?
         ( problems?.map((problem, index) => (
           <Grid item xs={10} sm={7} md={3} key={index}>
             <Card className={classes.card2}>
                     <Typography variant="h6"
                         onClick={() => handleProblemClick(problem?.id, problem?.name,index)}
                        style={{ fontWeight: problemIndex == index ? 'bold' : 'normal' }}

                     >{problem?.name}</Typography>
             </Card>
           </Grid>
          ))
         )
          :
        (<>
         <Typography>No Problem found on Sector {selectedProblem}</Typography>
         </>
                                )
        }
                </Grid>
                <hr />
                <br>
                </br>
            {solutions[0].id &&
            <Paper sx={{ background: theme.palette.background.paper }} variant="outlined">
                <DataGrid
                    rows={rowSolution}
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
        }
      </Container>

        </>

    );
};

export default SalesView;