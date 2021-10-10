let productosCarrito = [];

let len = 1;

class Carrito {

    constructor (nombre, descripcion, codigo, url, precio, stock) {
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.codigo = codigo,
        this.url = url,
        this.precio = precio,
        this.stock = stock
    }

    addProducts = () => {
        products.push({
            nombre: this.nombre,
            descripcion: this.descripcion,
            codigo: this.codigo,
            url: this.url,
            precio: this.precio,
            stock: this.stock,
            id: len++
        })
    }
};

export default {productosCarrito, len, Carrito};