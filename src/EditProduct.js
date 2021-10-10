
import React, { useState, useEffect } from "react";
import { Button, Typography, TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';

const ProductAdd = yup.object().shape({
  img: yup.string().required("⚠️ Provide the product image"),
 product: yup.string().required().min(3).max(50, "Keep it short"),
  price: yup.number().required().positive().min(1),
 
});

 function EditProduct() {
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm({
    resolver: yupResolver(ProductAdd)
  });
  const history = useHistory();
  const { id } = useParams();

  function displayProduct(id) {
    fetch(`https://60fcdb7a1fa9e90017c70cd7.mockapi.io/product/${id}`, {
      method: "GET"
    })
      .then((data) => data.json())
      .then((data) => {
        setProduct(data);
      });
  }

  const editProduct = (data) => {
    console.log("form data", data);
    fetch(`https://60fcdb7a1fa9e90017c70cd7.mockapi.io/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((data) => data.json())
      .then((data) => {
        alert("Product successfully updated !!");
        history.push("/");
      });
  };
  const [product, setProduct] = useState({});
  useEffect(() => {
    displayProduct(id);
  }, []);

  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <div style={{ padding: "10px" , maxWidth: "600px", margin: "auto"}}><br />
      <div>
        <Typography
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Edit product here !
        </Typography>
        {product.id && (
          <div
            className="vote-form"
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          
            <TextField className="input"
            style={{ padding: "10px" }}
            multiline
            id="outlined-multiline-static"
              {...register("img")}
              error={errors?.img?.message}
              helperText={errors?.img?.message}
              defaultValue={product.img}
              label="Enter image"
              rows={4}
            /><br/>
            <TextField className="input"
            style={{ padding: "10px" }}
            multiline
              {...register("product")}
              id="outlined-multiline-static"
              error={errors?.product?.message}
              helperText={errors?.product?.message}
              defaultValue={product.product}
              label="Enter Product"
              rows={2}
            /><br/>
            <TextField className="input"
            multiline
            id="outlined-multiline-static"
              {...register("price")}
              error={errors?.price?.message}
              helperText={errors?.price?.message}
              defaultValue={product.price}
              label="Enter price"
              type="number"
              rows={2}
            />
            <Stack direction="row" spacing={2}>
            <Button className="button"
              onClick={handleSubmit(editProduct)}
              variant="contained"
              color="primary"> Submit
            </Button> 
            <Link to="/" className="btn btn-danger ml-2" >Cancel</Link></Stack>
          </div>
        )}
       
      </div>
     
    </div>
   
  );
}

export default EditProduct;