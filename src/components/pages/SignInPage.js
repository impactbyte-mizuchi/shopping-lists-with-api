import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

function SignInPage() {
    const history = useHistory();
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Ini halaman Sign In</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
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
                    return errors;
                }}
                onSubmit={(values) => {
                    const url = `${process.env.REACT_APP_MOCKAPI_URL}/users`;

                    fetch(url)
                        .then((response) => response.json())
                        .then((results) => {
                            const existingUser = results.find(
                                (result) => result.email === values.email
                            );

                            if (existingUser === undefined) {
                                alert(
                                    'Email belum terdaftar, silahkan registrasi'
                                );
                            } else if (
                                existingUser !== undefined &&
                                existingUser.password === values.password
                            ) {
                                alert('login berhasil, silahkan masuk');

                                localStorage.setItem(
                                    'userLogin',
                                    JSON.stringify(existingUser)
                                );

                                localStorage.setItem(
                                    'isLoggedIn',
                                    JSON.stringify(true)
                                );

                                history.push('/shopping-lists');
                            }
                        });
                }}
            >
                {({ isSubmitting, values, handleChange }) => (
                    <Form>
                        <div>
                            <FormControl>
                                <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                                <Input
                                    id="email"
                                    type='text'
                                    name='email'
                                    placeholder='Email'
                                    value={values.email}
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
                                <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
                                <Input
                                    id="password"
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={values.password}
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
                            <Button variant="outlined"  ><Input type='submit' disabled={isSubmitting}>Submit</Input></Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignInPage;
