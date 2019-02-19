import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/clientes', {useNewUrlParser: true});

// para ocultar mensajes de mongo en caso de estar deprecado ese metodo
mongoose.set('setFindAndModify', false);

// Definir el schema de clientes
const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    emails: Array,
    edad: Number,
    tipo: String,
    pedidos: Array,
    vendedor: mongoose.Types.ObjectId
});
// model: nos crea 1 nueva tabla en MongoDB
const Clientes = mongoose.model('clientes', clientesSchema);

// Productos
const productosSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number
});
const Productos = mongoose.model('productos', productosSchema);

// Pedidos
// Nota: ObjectId es un tipo de dato que existe en Mongodb
const pedidosSchema = new mongoose.Schema({
    pedido: Array,
    total: Number,
    fecha: Date,
    cliente: mongoose.Types.ObjectId,
    estado: String,
    vendedor: mongoose.Types.ObjectId
});
const Pedidos = mongoose.model('pedidos', pedidosSchema);

// Usuarios
const usuariosSchema = new mongoose.Schema({
    usuario: String,
    nombre: String,
    password: String,
    rol: String
});
// hashear los password antes de guardarlos
// usuariosSchema.pre: Esto nos va ha permitir ejecutar codigo antes de que se guarde en la BDs
// next: nos va ha permitir ir a la siguiente funcion en Nodejs
usuariosSchema.pre('save', function(next){
    // si el password no esta modificado, ejecutar la siguiente función(si ya esta hasheado no lo vuelvas a hashear)
    // isModified: es una función
    if(!this.isModified('password')){
        // si no esta modificado ve a la siguiente funcion
        return next();
    }
    // genSalt: que nos genere el Salt, 10 es un numero seguro(cuidado: entre mas grande el # mas pesado se hace el proceso de hashing)
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);
        // en caso de que si se pudo generar el Salt
        // vamos a hashear el password que se va a almacenar en la BDs
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            // para que ya continue ejecutando la siguiente función
            next();
        });
    })
})

const Usuarios = mongoose.model('usuarios', usuariosSchema)

export { Clientes, Productos, Pedidos, Usuarios };
