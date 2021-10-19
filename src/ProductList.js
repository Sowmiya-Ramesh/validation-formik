import React,{ useEffect, useState }from "react";
import Card from '@mui/material/Card';
import { useHistory } from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from "@material-ui/core";
//import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Stack from '@mui/material/Stack';

export default function ProductList() {

    const [product, setProduct] = useState([]);
    
    const history = useHistory();

    function getProduct(){
        fetch("https://60fcdb7a1fa9e90017c70cd7.mockapi.io/product",{ method: "GET"})
        .then((data) => data.json())
        .then((data) => setProduct(data))
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
      }
      useEffect(() => {
        getProduct();
      }, []); 

      const deleteProduct = (id) => {
        getProduct([]);
        fetch(`https://60fcdb7a1fa9e90017c70cd7.mockapi.io/product/${id}`, {
          method: "DELETE"
        })
          .then((data) => data.json())
          .then((data) => {
            getProduct();
            alert("Product successfully deleted !");
          })
          .catch((e) => console.log(e));
      };


  return (
    <div className="container">
    <div className="row"  >{product.map((data) => {
       return (
      <div className="col-4" style={{ paddingBlockEnd: "20px"}}>
       
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data.img}
          alt= "car image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.product}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          ${data.price} million
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Stack direction="row" spacing={2}>
      <Button  className="button" variant="contained"
          color="primary" to="/edit/:id"  onClick={() => history.push(`/edit/${data.id}`)}  >Edit</Button>
      {/* <Button  to="/edit/:id"  onClick={() => history.push(`/edit/${data.id}`)} variant="contained"> Edit</Button> */}
     {/* <Link className="btn btn-danger" > Delete</Link>  */}
     <Button color="secondary" variant="contained" onClick={() => deleteProduct(data.id)} >  Delete </Button>
     </Stack>
      </CardActions>
    </Card>
    </div>
   
    );
    })}
    </div>
    </div>
    
  );
}
