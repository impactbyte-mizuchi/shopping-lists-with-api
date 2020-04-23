import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';

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
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <Field
                                type='text'
                                name='fullName'
                                placeholder='Full Name'
                            />
                            <ErrorMessage name='fullName' component='div' />
                        </div>
                        <div>
                            <Field
                                type='text'
                                name='username'
                                placeholder='Username'
                            />
                            <ErrorMessage name='username' component='div' />
                        </div>

                        <div>
                            <Field
                                type='email'
                                name='email'
                                placeholder='email'
                            />
                            <ErrorMessage name='email' component='div' />
                        </div>
                        <div>
                            <Field
                                type='password'
                                name='password'
                                placeholder='password'
                            />
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

export default SignUpPage;
