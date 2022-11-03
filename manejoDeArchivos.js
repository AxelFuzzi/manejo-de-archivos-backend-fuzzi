const fs = require('fs');

class Contenedor{
    constructor(url){
        this.url = url;
        this.productos = []
        
    }

    async save(producto){
        try {
            if (this.productos.length === 0) {
                producto.id = 1;
                this.productos.push(producto);
                console.log(producto.id);
                await fs.promises.writeFile(this.url, JSON.stringify(this.productos, null, 2));
            } else {
                let lastProducto = this.productos[this.productos.length - 1];
                producto.id = lastProducto.id + 1;
                this.productos.push(producto);
                console.log(producto.id);
                await fs.promises.writeFile(this.url, JSON.stringify(this.productos, null, 2))
            }
            return producto.id
            
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id){
        try {
            const readed = await fs.promises.readFile(this.url, 'utf-8');
            const obj = JSON.parse(readed);
            let filtro = obj.find(producto => producto.id === id);

            if (filtro === undefined) {
                return null 
                
            } else {
                console.log(filtro);
                return filtro
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAll() {
        try {
            const readed = await fs.promises.readFile(this.url, 'utf-8');
            const obj = JSON.parse(readed);
            console.log(obj);
            return obj

        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id) {
        try {
            const readed = await fs.promises.readFile(this.url, 'utf-8');
            const obj = JSON.parse(readed);
            let filtro = obj.find(producto => producto.id === id);

            if (filtro === undefined) {
                console.log('no encontrado');
                return null

            } else {
                let position = obj.indexOf(filtro);
                obj.splice(position, 1);
                this.productos = obj;
                await fs.promises.writeFile(this.url, JSON.stringify(obj, null, 2));
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAll() {
        try {
            this.productos = []
            await fs.promises.writeFile(this.url, JSON.stringify(this.productos, null, 2));
            console.log('archivo borrado con exito')
        } catch (error) {
            throw new Error(error);
        }
    }
}

class Producto {
    constructor(title, price, thumbnail){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

const objContenedor = new Contenedor('./productos.txt');

const producto1 = new Producto('asdasd', 123, 'img')
const producto2 = new Producto('jkhkjhjk',4573689 ,'img')
const producto3 = new Producto('opiup',23443 ,'img')

objContenedor.save(producto1)
objContenedor.save(producto2)
objContenedor.save(producto3)

//objContenedor.getById(2)
//objContenedor.getById(5)

//objContenedor.getAll();

//objContenedor.deleteById(1)
//objContenedor.deleteById(8)

//objContenedor.deleteAll();
