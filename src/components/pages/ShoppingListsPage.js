/** @format */

import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function ShoppingListsPage() {
	const [ allList, setAllList ] = useState([]);
	useEffect(function() {
		const user = JSON.parse(localStorage.getItem('userLogin'));
		const url = `${process.env.REACT_APP_MOCKAPI_URL}/users/${user.id}/shopping-lists`;
		fetch(url)
			.then((response) => response.json())
			.then((results) => {
				console.log(results);

				setAllList(results);
			})
			.catch((error) => console.log(error));
	}, []);

	const handleDelete = async (id) => {
		try {
			const user = JSON.parse(localStorage.getItem('userLogin'));
			const url = `${process.env.REACT_APP_MOCKAPI_URL}/users/${user.id}/shopping-lists/${id}`;
			const response = await fetch(url, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' }
			});
			await response.json();
			window.location.reload();
		} catch (error) {
			throw error;
		}
	};

	const handleEdit = async (id) => {
		const newName = prompt('Ubah Nama barang?');
		const newDesc = prompt('Ubah deskripsi barang?');
		const newLink = prompt('Ubah gambar barang?');
		const user = JSON.parse(localStorage.getItem('userLogin'));
		let currentItem = allList.find((list) => list.id == id);
		let name = newName;
		let description = newDesc;
		let link = newLink;

		if (newName === null) {
			name = currentItem.name;
		}

		if (newDesc === null) {
			description = currentItem.description;
		}

		if (newLink === null) {
			link = currentItem.imageURL;
		}

		const url = `${process.env.REACT_APP_MOCKAPI_URL}/users/${user.id}/shopping-lists/${id}`;

		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: name, description: description, imageURL: link })
		});
		await response.json();
		window.location.reload();
	};

	return (
		<div style={{ textAlign: 'center' }}>
			<h1>ShoppingList Page</h1>

			<Formik
				initialValues={{
					name: '',
					description: '',
					quantity: '',
					imageURL: ''
				}}
				validate={(values) => {
					const errors = {};

					if (!values.name) {
						errors.name = 'Required';
					}
					return errors;
				}}
				onSubmit={(values) => {
					console.log(values);
					const user = JSON.parse(localStorage.getItem('userLogin'));
					console.log(user.id);

					const url = `${process.env.REACT_APP_MOCKAPI_URL}/users/${user.id}/shopping-lists`;

					const options = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(values)
					};

					fetch(url, options)
						.then((response) => response.json())
						.then((result) => {
							console.log(result, 'data');
							alert('Barang berhasil ditambahkan');

							window.location.reload();
						})
						.catch((error) => console.log(error));
				}}
			>
				{({ isSubmitting, values, handleChange, errors, touched }) => (
					<Form>
						<div>
							<FormControl>
								<Input
									id="name"
									type="text"
									name="name"
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
										color: 'yellow',
										fontStyle: 'bold'
									}}
								>
									{errors.name && touched.name && errors.name}
								</span>
							</div>
						</div>
						<div>
							<FormControl>
								<Input
									id="description"
									type="text"
									name="description"
									placeholder="description"
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
									type="number"
									name="quantity"
									placeholder="quantity"
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
									type="url"
									name="imageURL"
									placeholder="imageURL"
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
							<Button variant="outlined">
								<Input type="submit">Submit</Input>
							</Button>
						</div>
					</Form>
				)}
			</Formik>
			<div>
				<h1>list item</h1>
				{allList.map((list) => {
					return (
						<Card key={list.id} style={{ maxWidth: '350px' }}>
							<CardActionArea>
								<CardMedia
									component="img"
									alt="Contemplative Reptile"
									height="140"
									image={list.imageURL}
									title="Contemplative Reptile"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										{list.name}
									</Typography>
									<Typography variant="body2" color="textSecondary" component="p">
										{list.description}
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Button size="small" onClick={() => handleEdit(list.id)} color="primary">
									Edit
								</Button>
								<Button size="small" onClick={() => handleDelete(list.id)} color="secondary">
									Delete
								</Button>
							</CardActions>
						</Card>
					);
				})}
			</div>
		</div>
	);
}

export default ShoppingListsPage;
