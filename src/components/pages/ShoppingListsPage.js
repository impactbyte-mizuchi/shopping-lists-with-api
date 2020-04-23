import React from 'react';
import { Formik, Form, } from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

function ShoppingListsPage() {
   return (
      <div style={{ textAlign: 'center' }}>
         <h1>ShoppingList Page</h1>

         <Formik
            initialValues={{
               name: '',
               description: '',
               quantity: '',
               imageURL: '',
            }}
            validate={(values) => {
               const errors = {};

               if (!values.name) {
                  errors.name = 'Required';
               }
               return errors;
            }}
            onSubmit={(values) => {
               console.log(values)
               const user = JSON.parse(localStorage.getItem('userLogin'));
               console.log(user.id);
               
               const url = `${process.env.REACT_APP_MOCKAPI_URL}/users/${user.id}/shopping-lists`;

               const options = {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
               };

               fetch(url, options)
                  .then((response) => response.json())
                  .then((result) => {
                     alert('Barang berhasil ditambahkan');


                  })
                  .catch((error) => console.log(error));
            }}
         >
            {({ isSubmitting, values, handleChange, errors, touched }) => (
               <Form >
                  <div>
                     <FormControl>

                        <Input
                           id="name"
                           type='text'
                           name='name'
                           placeholder="Item's Name"
                           value={values.name}
                           onChange={handleChange}
                           startAdornment={
                              <InputAdornment position="start">
                                 <AccountCircle />
                              </InputAdornment>
                           }
                        />
                     </FormControl>
                     <div>
                        <span
                           style={{
                              color: "yellow",
                              fontStyle: "bold",
                           }}
                        >
                           {errors.name &&
                              touched.name &&
                              errors.name}
                        </span>
                     </div>

                  </div>
                  <div>
                     <FormControl>

                        <Input
                           id="description"
                           type='text'
                           name='description'
                           placeholder='description'
                           value={values.description}
                           onChange={handleChange}
                           startAdornment={
                              <InputAdornment position="start">
                                 <AccountCircle />
                              </InputAdornment>
                           }
                        />
                     </FormControl>
                  </div>

                  <div>
                     <FormControl>

                        <Input
                           id="quantity"
                           type='number'
                           name='quantity'
                           placeholder='quantity'
                           value={values.quantity}
                           onChange={handleChange}
                           startAdornment={
                              <InputAdornment position="start">
                                 <AccountCircle />
                              </InputAdornment>
                           }
                        />
                     </FormControl>
                  </div>

                  <div>
                     <FormControl>

                        <Input
                           id="imageURL"
                           type='url'
                           name='imageURL'
                           placeholder='imageURL'
                           value={values.imageURL}
                           onChange={handleChange}
                           startAdornment={
                              <InputAdornment position="start">
                                 <AccountCircle />
                              </InputAdornment>
                           }
                        />
                     </FormControl>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                     <Button variant="outlined"  ><Input type='submit' >Submit</Input></Button>
                  </div>
               </Form>
            )}
         </Formik>
      </div>
   );
}

export default ShoppingListsPage;
