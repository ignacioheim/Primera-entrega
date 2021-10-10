import product from './producto.js';
import carts from './carrito.js';
import express from 'express';
import fs from 'fs';
//import path from 'path';
//import { fileURLToPath } from 'url';
//import { dirname } from 'path';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

//import handlebars  from 

const app = express();
const PORT = process.env.PORT || 8080;
const products = express.Router();
const cart = express.Router();

const server = app.listen(PORT,()=>{
    console.log(`Estoy escuchando desde el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Importo el módulo de productos
let listProducts = product.products;

/* Variable administrador */
const administrador = true;

/* Variable ususario */
//const administrador = false;

// Defino los dos routers que voy a usar
app.use('/productos', products);
app.use('/carrito', cart);

///// Rutas de productos /////
products.get('/listar', (req,res)=>{
    if (listProducts.length > 0) {
        res.json(listProducts)
    } else {
        res.json("No hay productos cargados.")
    }
});

products.post('/agregar', (req,res)=>{
    
    if(administrador) {
        let nombre = req.body.nombre
        let descripcion = req.body.descripcion
        let codigo = req.body.codigo
        let url = req.body.url
        let precio = req.body.precio
        let stock = req.body.stock
        let item = new product.Product(nombre,descripcion,codigo,url,precio,stock)
        //GUARDAR PRODUCTOS EN MEMORIA
        item.addProducts();        
        item.addTimeStamp();
        res.json({listProducts})
        // GUARDAR ARCHIVO EN SISTEMA
        let guardar = (name, info) => {
            return fs.promises.appendFile('./productos.txt', info)
        };
        async function myFunc () {
            try {
                const writeFile = await guardar('./productos.txt', JSON.stringify(listProducts, null, '\t'))
                console.log("Archivo guardado con éxito.")
            }
            catch (err) {
                console.log("Error en guardar.", err)
            }
        }
        myFunc();

    } else {
        res.json({
            error: '-1',
            descipcion: 'Ruta Agregar no autorizada'})
    }
});

products.put('/actualizar/:id', (req,res)=>{
    if (administrador) {
       let params = req.params;
        if (parseInt(params.id)>0 && parseInt(params.id)<=listProducts.length) {
            let producto = listProducts.filter(function(p){return p.id == parseInt(params.id)});    
            producto[0].nombre = req.body.nombre;     
            producto[0].descripcion = req.body.descripcion;
            producto[0].codigo = req.body.codigo;
            producto[0].url = req.body.url;
            producto[0].precio = req.body.precio;
            producto[0].stock = req.body.stock;
            res.json({producto})
        } else {
            res.json({error: 'Producto no encontrado'})
        }
    } else {
        res.json({
            error: '-1',
            descipcion: 'Ruta Actualizar no autorizada'})
    }
});

products.delete('/borrar/:id', (req,res)=>{
    if (administrador) {
        let params = req.params;        
        if (parseInt(params.id)>0 && parseInt(params.id)<=listProducts.length) {
            let producto = listProducts.filter(function(p){return p.id == parseInt(params.id)});
            //console.log(producto)
            listProducts.shift(producto);
            res.json(producto);
            //res.json(listProducts)
        } else {
            res.json({error: 'Producto no encontrado'})
        }    
    } else {
        res.json({
            error: '-1',
            descipcion: 'Ruta Borrar no autorizada'})
    }
});

///// Rutas carrito /////

let listCarrito = carts.productosCarrito;

cart.get('/listar', (req,res)=>{
    if (listCarrito.length > 0) {
        res.json(listCarrito);
    } else {
        res.json("No hay productos en el carrito.");
    }
});

cart.post('/agregar/:id', (req,res)=>{
    let params = req.params;
    if (parseInt(params.id)>0 && parseInt(params.id)<=listProducts.length) {
        let producto = listProducts.filter(function(p){return p.id == parseInt(params.id)});
        // GUARDAR PRODUCTOS EN MEMORIA
        listCarrito.push(producto);
        res.json(producto);
        // GUARDAR PRODUCTOS DEL CARRITO EN SISTEMA
        let guardar = (name, info) => {
            return fs.promises.appendFile('./carrito.txt', info)
        };
        async function myFunc () {
            try {
                const writeFile = await guardar('./carrito.txt', JSON.stringify(listProducts, null, '\t'))
                console.log("Archivo guardado con éxito.")
            }
            catch (err) {
                console.log("Error en guardar.", err)
            }
        }
        myFunc();
    } else {
        res.json({error: 'Producto no encontrado'})
    } 
});

cart.delete('/borrar/:id', (req,res)=>{
    let params = req.params;        
    if (parseInt(params.id)>0 && parseInt(params.id)<=listCarrito.length) {
        let producto = listCarrito.filter(function(p){return p.id == parseInt(params.id)});
        //console.log(producto)
        listCarrito.shift(producto);
        res.json(producto);
        //res.json(listProducts)
    } else {
        res.json({error: 'Producto no encontrado'})
    } 
});
