import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';


function SignUpPage() {
    const history = useHistory();

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Ini halaman SignUp</h1>

            <Formik
                initialValues={{
                    fullName: '',
                    username: '',
                    email: '',
                    password: '',
                }}
                validate={(values) => {
                    const errors = {};

                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                        )
                    ) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.password) {
                        errors.password = 'Required';
                    } else if (values.password < 8) {
                        errors.password = 'Minimal 8 karakter';
                    }

                    return errors;
                }}
                onSubmit={(values) => {
                    console.log(values)
                    const url = `${process.env.REACT_APP_MOCKAPI_URL}/users`;

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
                            alert('Registrasi Berhasil. Silahkan Login!');

                            history.push('/signin');
                        })
                        .catch((error) => console.log(error));
                }}
            >
                {({ isSubmitting, values, handleChange }) => (
                    <Form >
                        <div>
                            <FormControl>
                                <InputLabel htmlFor="input-with-icon-adornment">FullName</InputLabel>
                                <Input
                                    id="fullName"
                                    type='text'
                                    name='fullName'
                                    placeholder='Full Name'
                                    value = {values.fullName}
                                    onChange = {handleChange}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            </div>
                           
                            {/* <Field
                            />
                            <ErrorMessage name='fullName' component='div' /> */}
                        <div>
                        <FormControl>
                                <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
                                <Input
                                    id="username"
                                    type='text'
                                name='username'
                                placeholder='Username'
                                value = {values.username}
                                onChange = {handleChange}
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
                                <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                                <Input
                                    id="email"
                                    type='email'
                                name='email'
                                placeholder='email'
                                value = {values.email}
                                onChange = {handleChange}
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
                                <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
                                <Input
                                    id="password"
                                    type='password'
                                name='password'
                                placeholder='password'
                                value = {values.password}
                                onChange = {handleChange}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            </div>
                        {/* </div>
                        <div>
                            <Field
                        
                                
                            />
                            <ErrorMessage name='username' component='div' />
                        </div>

                        <div>
                            <Field
                                
                            />
                            <ErrorMessage name='email' component='div' />
                        </div>
                        <div>
                            <Field
                                
                            />
                            <ErrorMessage name='password' component='div' /> */}
                        {/* </div> */}
                        {/* <button type='submit' disabled={isSubmitting}>
                            Submit
                        </button> */}
                        <div style = {{marginTop : '10px'}}>
                         <Button variant="outlined"  ><Input type = 'submit' disabled = {isSubmitting}>Submit</Input></Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignUpPage;
