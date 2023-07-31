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
            headerName: "Category", 
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
          title:product.title, 
          topic: product?.topic?.name, 
          thumbnail: product?.thumbnailUrl, 
          url: product?.url, 
          createdAt: product?.createdAt 
        }; 
    }); 
 
    return ( 
        <div> 
            <div> 
      <AddCategory onAddCategory={handleAddCategory} /> 
      <ViewAllCategories /> 
    </div> 
 
         
        <Container maxWidth="lg"> 
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
            </Container> 
        </div> 
    ); 
}; 
 
export default ProductsView;