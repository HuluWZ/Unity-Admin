import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { Chip } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';

const Item = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxShadow: 'none',
    borderRadius: 0,
    '&:hover': {
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
    },
}));

const ItemMedia = styled(CardMedia)(({ theme }) => ({
    height: 300,
    backgroundSize: 'fit',

}));


const CategoryInfo = ({ category }: any) => {
  const theme = useTheme();
  const images = [category?.imageUrl1 ,category?.imageUrl2,category?.imageUrl3];
    // console.log(" Selected  Item : ", category);
    // console.log(" Product Info - ",product.user)
    return (
        <Grid container spacing={2}>

            <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Item>
                        <Typography fontWeight="fontWeightBold" m={1}>#   Forum Detail</Typography>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Forum Title:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {category && " "+category.title}
                                </Box>
                            </Typography>
                
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Description:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {category && category?.description}
                                </Box>
                            </Typography>

                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Topic:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {category && category?.forumTopicId || "--"}
                                </Box>
                            </Typography>
                        </Item>
                    </Grid>
                
                    <Grid item xs={6} md={6}>
                        <Item>
                        <Typography fontWeight="fontWeightBold" m={1}>#  {category && category?.forum_answers?.length}  Forum Answers </Typography>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {/* Crack Free: */}
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {/* {category && category.item?.condition?.crackFree} */}
                                </Box>
                            </Typography>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {/* Fully Functional: */}
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {/* {category && category.item?.condition?.functional} */}
                                </Box>
                            </Typography>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {/* Power On: */}
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {/* {category && category.item?.condition?.powerOn  } */}
                                </Box>
                            </Typography>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {/* Images: */}
                                </Box>
                            </Typography>
                            <Typography  color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                {/* <div >
                        {category && category.item.images.map((imageUrl:any, index:number) => (
                                 <a href={imageUrl} target="_blank">
                                   <img src={imageUrl} alt={`Image ${index + 1}`} width="150" height="150" />
                                 </a>
                        )) || " No Image "}
                        </div>      */}

                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Item>
                        <Typography fontWeight="fontWeightBold" m={1}>#   Other  Details</Typography>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Is Liked:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {category && category?.isLiked || "False"}
                                </Box>
                            </Typography>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Images:
                                </Box>
                            </Typography>
                            <Typography  color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <div >
                        {category && images.map((imageUrl:any, index:number) => (
                                 <a href={imageUrl} target="_blank">
                                   <img src={imageUrl} alt={`Image ${index + 1}`} width="150" height="150" />
                                 </a>
                            )) || " No Image "}
                        </div>      

                            </Typography>
                        </Item>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <Item>
                            <Typography fontWeight="fontWeightBold" m={1}>#   Asker  Details</Typography>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Full Name:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {category && category?.user?.name}
                                </Box>
                            </Typography>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Phone Number:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {category && category?.user?.phoneNumber}
                                </Box>
                           </Typography>
                
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    State:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {category && category?.user?.state}
                                </Box>
                            </Typography>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Area:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {category && category?.user?.area}
                                </Box>
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CategoryInfo