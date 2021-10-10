// import React from 'react';
// import { Form, FormGroup, Input, Label ,Button} from "reactstrap";
// import { Link } from "react-router-dom";

// function AddProduct() {
//     return (
//         <div>
//             <h1>Add product here</h1>
//             <Form>
//                 <FormGroup>
//                     <Label>Product </Label>
//                     <Input type="text" placeholder="Enter Product"></Input>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label>Image</Label>
//                     <Input type="text" placeholder="Enter Image"></Input>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label>Price </Label>
//                     <Input type="text" placeholder="Enter Price"></Input>
//                 </FormGroup>
               
//                 <Button type="submit">Submit</Button>

//                 <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
//             </Form>
//         </div>
//     )
// }

// export default AddProduct

import { Button, Typography, TextField } from "@material-ui/core";
import { useHistory, useState } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';

const ProductAdd = yup.object().shape({
  img: yup.string().required(),
  product: yup.string().required().min(3).max(30, "Keep it short"),
  price: yup.number().required().positive().min(1),
 
});

function AddProduct(){
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ProductAdd)
  });
  const history = useHistory();

  const addProduct = (data) => {
    console.log("form data", data);
    fetch("https://60fcdb7a1fa9e90017c70cd7.mockapi.io/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((data) => data.json())
      .then((data) => {
        alert("Your Product added !!");
        history.push("/");
      });
  };

  return (
    <div style={{ padding: "10px", maxWidth: "600px", margin: "auto" }}>
      <br />
      <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
        Add your Products here !
      </Typography> 
      <div
        className="vote-form"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <TextField
         className="input"
         style={{ padding: "10px" }}
         multiline
         id="outlined-multiline-static"
          {...register("img")}
          error={errors?.img?.message}
          helperText={errors?.img?.message}
          label="Enter image"
          rows={4}
        />
        <TextField
        className="input"
        style={{ padding: "10px" }}
        multiline
        id="outlined-multiline-static"
          {...register("product")}
          error={errors?.product?.message}
          helperText={errors?.product?.message}
          label="Enter product"
          rows={2}
        />
        <TextField
        className="input"
        multiline
        id="outlined-multiline-static"
          {...register("price")}
          error={errors?.price?.message}
          helperText={errors?.price?.message}
          label="Enter price"
          type="number"
          rows={2}
        />

        <Stack direction="row" spacing={2}>
        <Button
          onClick={handleSubmit(addProduct)}
          variant="contained"
          color="primary">
          Add
        </Button>
        <Link to="/" className="btn btn-danger ml-2" >Cancel</Link>
        </Stack>
      </div>
    </div>
  );
}
export default AddProduct