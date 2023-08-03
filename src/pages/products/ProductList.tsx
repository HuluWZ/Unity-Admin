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
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,

} from "@mui/material"; 
import { useTheme } from "@mui/material"; 
import AddCategory from "./AddCategory"; 
import ViewAllCategories from "./ViewAllCategory"; 

const api = import.meta.env.VITE_API_URL; 
const url = `${api}topic`; 
 
const ProductsView = ({ 
    products, 
    setSelectedProduct, 
    setOpen, 
    setOpenConfirm, 
}: any) => { 
 
    const handleAddCategory = (categoryName:string) => { 
    // Send the new category to the backend API for creation 
    // Replace 'YOUR_BACKEND_API_ENDPOINT' with the actual API endpoint 
    fetch(url, { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ name: categoryName }), 
    }) 
      .then((response) => response.json()) 
        .then((data) => {
        //   products?.result.push(data?.result)
        console.log('Category created:', data?.result)  
      }).catch((error) => console.log('Error creating category:', error)); 
  }; 
    // console.log("   products", products) 
    const theme = useTheme();  
    
 
    return ( 
    <div> 
            <div> 
               <AddCategory onAddCategory={handleAddCategory} /> 
               <ViewAllCategories /> 
            </div> 
 
         
        {/* <Container maxWidth="lg"> 
            <h3>Books and Magazines</h3> 
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
            </Container>  */}
            {/* <div> */}
        <Grid container spacing={2}>

        {products && products?.result?.map((item: any) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item?.id}>
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia component="img" height="250" image={item?.thumbnailUrl} alt={item?.title} />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {item?.title}
            </Typography>
           <Button variant="outlined" onClick={() => { 
                                setSelectedProduct(item); 
                                setOpen(true); 
                            }} >Edit</Button>
           <Button variant="outlined" onClick={() => { 
                                setSelectedProduct(item); 
                                setOpenConfirm(true); 
                            }}>Delete</Button>
          </CardContent>
          </Card>
        </Grid>

                    
                ))}
                </Grid>
            </div>
)
}; 
 
export default ProductsView;