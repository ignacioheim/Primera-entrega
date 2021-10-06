import modulo from './producto.js'
import express from 'express'
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
let listProducts = modulo.products;

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

let len = 1;

products.post('/agregar', (req,res)=>{
    
    if(administrador) {
        let nombre = req.body.nombre
        let descripcion = req.body.descripcion
        let codigo = req.body.codigo
        let url = req.body.url
        let precio = req.body.precio
        let stock = req.body.stock
        let item = new modulo.Product(nombre,descripcion,codigo,url,precio,stock)
        item.addProducts();
        item.addTimeStamp();
         
        //console.log(item)
        //res.json(item)
        res.json({listProducts})
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

cart.get('/listar', (req,res)=>{
    res.json("Se está probando.")
});

cart.post('/agregar', (req,res)=>{
    req.json(body)
});

cart.delete('/borrar/:id', (req,res)=>{
    req.json(body)
});
