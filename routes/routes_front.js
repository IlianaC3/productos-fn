const express = require('express');
const app = express();
const { mysql } = require('../db/db-config');
const Productos = require('../classes/Productos');
const FakerProducts = require('../classes/Faker')
const Producto = new Productos(mysql);
const FakerP = new FakerProducts();
app.set('view engine', 'ejs');
app.set('views', './public');

app.get('/', (req, res) => {
	Producto.getAll().then((result) => {
		if (result !== undefined) {
			res.render('index', { data: result });
		} else {
			res.status(404).json({
				error: `No existen productos`
			});
		}
	});
});

app.get('/agregar', (req, res) => {
	res.render('agregar');
});

app.get('/editar/:id', (req, res) => {
	Producto.getById(req.params.id).then((result) => {
		if (result !== undefined) {
			if (result === null) {
				res.status(404).json({
					error: `Producto no encontrado para el id ${id}`
				});
			} else {
				res.render('editar', { data: result });
			}
		} else {
			res.status(404).json({
				error: `El archivo no se puede leer`
			});
		}
	});
});

app.get('/productos-test', (req, res) => {
	FakerP.FakerFunction().then((result) => {
		if (result !== undefined) {
			res.render('productos-test', { data: result });
		} else {
			res.status(404).json({
				error: `No existen productos`
			});
		}
	});
	
});

module.exports = app;
