let products = [];

//let len = products.length;

let len = 1;

class Product {
    
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

    // addId = () => {
    //     products.forEach((data, len)=>{
    //     data.id = len + 1;
    //     })        
    // }

    addTimeStamp = () => {
        products.forEach((data)=>{
        let d = new Date();
        let n = d.toLocaleString();
        data.timestamp = n;
        })
    }
}

export default {products, Product}