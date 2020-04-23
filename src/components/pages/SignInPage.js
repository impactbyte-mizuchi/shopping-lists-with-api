import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function SignInPage() {
    const history = useHistory();
    return (
        <div>
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
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <Field type='email' name='email' />
                            <ErrorMessage name='email' component='div' />
                        </div>
                        <div>
                            <Field type='password' name='password' />
                            <ErrorMessage name='password' component='div' />
                        </div>
                        <button type='submit' disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignInPage;
