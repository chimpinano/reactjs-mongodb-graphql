import mongoose, { Promise } from 'mongoose';
import { Clientes, Productos, Pedidos, Usuarios } from './db';
import { rejects } from 'assert';
import bcrypt from 'bcrypt';

// Generar Token
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

import jwt from 'jsonwebtoken';

const crearToken = (usuarioLogin, secreto, expiresIn) => {
    const {usuario} = usuarioLogin;

    return jwt.sign({usuario}, secreto, {expiresIn}); 
}

const ObjectId = mongoose.Types.ObjectId;

// limite: limitar los registros a presentar
// offset: si el limite es de 5, el offset le trae del 0-5, luego del 5-10...va de 5 en 5
// Clientes.countDocuments: nos va a permitir conocer cuantos registros hay en BDs
export const resolvers = {
    Query: {
        getClientes : (root, {limite, offset, vendedor}) => {
            let filtro;
            if(vendedor){
                filtro = {vendedor : new ObjectId(vendedor) }
            }
            return Clientes.find(filtro).limit(limite).skip(offset)
        },
        getCliente : (root, {id}) => {
            return new Promise((resolve, object) => {
                Clientes.findById(id, (error, cliente) => {
                    if(error) rejects(error)
                    else resolve(cliente)
                })
            });
        },
        totalClientes : (root, {vendedor}) => {
            return new Promise((resolve, object) => {
                let filtro;
                if(vendedor){
                    filtro = {vendedor : new ObjectId(vendedor) }
                }
                Clientes.countDocuments(filtro, (error, count) => {
                    if(error) rejects(error)
                    else resolve(count)
                })
            })
        },
        obtenerProductos : (root, {limite, offset, stocks}) => {
            let filtro;
            if(stocks){
                filtro = { stock: { $gt: 0 } }
            }
            return Productos.find(filtro).limit(limite).skip(offset)
        },
        obtenerProducto : (root, {id}) => {
            return new Promise((resolve, object) => {
                Productos.findById(id, (error, producto) => {
                    if(error) rejects(error)
                    else resolve(producto)
                })
            })
        },
        totalProductos : (root) => {
            return new Promise((resolve, object) => {
                Productos.countDocuments({}, (error, count) => {
                    if(error) rejects(error)
                    else resolve(count)
                })
            })
        },
        obtenerPedidos: (root, {cliente}) => {
            return new Promise((resolve, object) => {
                Pedidos.find({cliente: cliente}, (error, pedido) => {
                    if (error) rejects(error);
                    else resolve(pedido);
                })
            })
        },
        topClientes: (root) => {
            return new Promise((resolve, object) => {
                Pedidos.aggregate([
                    {
                        $match: { estado: "COMPLETADO" }
                    },
                    {
                        $group: { _id: "$cliente", total: { $sum: "$total" } }
                    },
                    {
                        $lookup: {
                            from: "clientes",
                            localField: '_id',
                            foreignField: '_id',
                            as : 'cliente'
                        }
                    },
                    {
                        $sort: { total: -1 }
                    },
                    {
                        $limit: 10
                    }
                ], (error, resultado) => {
                    if (error) rejects(error);
                    else resolve(resultado);
                })
            })
        },
        obtenerUsuario: (root, args, {usuarioActual}) => {
            if (!usuarioActual){
                return null;
            }
            //console.log(usuarioActual);
            // Obtener el usuario actual del request del JWT Verificado
            const usuario = Usuarios.findOne({usuario: usuarioActual.usuario});

            return usuario;
        },
        topVendedores: (root) => {
            return new Promise((resolve, object) => {
                Pedidos.aggregate([
                    {
                        $match: { estado: "COMPLETADO" }
                    },
                    {
                        $group: { _id: "$vendedor", total: { $sum: "$total" } }
                    },
                    {
                        $lookup: {
                            from: "usuarios",
                            localField: '_id',
                            foreignField: '_id',
                            as : 'vendedor'
                        }
                    },
                    {
                        $sort: { total: -1 }
                    },
                    {
                        $limit: 10
                    }
                ], (error, resultado) => {
                    if (error) rejects(error);
                    else resolve(resultado);
                })
            })
        }
    },
    Mutation: {
        crearCliente : (root, {input}) => {
            const nuevoCliente = new Clientes({
                nombre : input.nombre,
                apellido : input.apellido,
                empresa : input.empresa,
                emails : input.emails,
                edad : input.edad,
                tipo : input.tipo,
                pedidos : input.pedidos,
                vendedor: input.vendedor
            });
            nuevoCliente.id = nuevoCliente._id;
            // se usa el Promise para poder acceder al error, resolve significa que si se pudo hacer el nuevo cliente
            // el save para almacenar en la BDs los modelos
            return new Promise((resolve, object) => {
                nuevoCliente.save((error) => {
                    if(error) rejects(error)
                    else resolve(nuevoCliente)
                })
            });
        },
        actualizarCliente:(root, {input}) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndUpdate({_id : input.id}, input, {new: true}, (error, cliente) => {
                if(error) rejects(error)
                else resolve(cliente)
                });
            });
        },
        eliminarCliente: (root, {id}) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndRemove({_id: id}, (error) => {
                    if(error) rejects(error)
                    else resolve("El Cliente se Eliminó Correctamente")
                    })
            })
        },
        nuevoProducto : (root, {input}) => {
            const nuevoProducto = new Productos({
                nombre: input.nombre,
                precio: input.precio,
                stock: input.stock
            });

            // MongoDB crear el ID que se asigna al objeto
            nuevoProducto.id = nuevoProducto._id;

            return new Promise((resolve, object) => {
                nuevoProducto.save((error) => {
                    if(error) rejects(error)
                    else resolve(nuevoProducto)
                })
            });
        },
        actualizarProducto: (root, {input}) => {
            return new Promise((resolve, producto) =>{
                Productos.findOneAndUpdate({_id : input.id}, input, {new:true}, (error, producto) =>{
                    if(error) rejects(error)
                    else resolve(producto)
                })
            })
        },
        eliminarProducto: (root, {id}) => {
            return new Promise((resolve, producto) => {
                Productos.findOneAndRemove({_id : id}, (error) => {
                    if (error) rejects (error);
                    else resolve("El Producto se Eliminó Correctamente")
                })
            })
        },
        nuevoPedido:(root, {input}) => {
            const nuevoPedido = new Pedidos({
                pedido: input.pedido,
                total: input.total,
                fecha: new Date(),
                cliente: input.cliente,
                estado: "PENDIENTE",
                vendedor: input.vendedor
            });

            nuevoPedido.id = nuevoPedido._id;

            // Siempre que se utliza un Mutation se debe utlizar un Promise
            return new Promise((resolve, object) => {

                nuevoPedido.save((error) => {
                    if(error) rejects(error)
                    else resolve(nuevoPedido)
                })
                
            });
        },
        actualizarEstado: (root, {input}) => {
            return new Promise((resolve, object) =>{

                //console.log(input);
                const { estado } = input;
                let instruccion;
                if(estado === 'COMPLETADO'){
                    instruccion = '-';
                } else if(estado === 'CANCELADO'){
                    instruccion = '+';
                }
                // recorrer y actualizar la cantidad de productos
                input.pedido.forEach(pedido => {
                    // updateOne es un metodo de mongodb
                    // $inc: es 1 funcion de mongodb no de mongoose
                    Productos.updateOne({_id : pedido.id}, {
                        "$inc": 
                            { "stock": `${instruccion}${pedido.cantidad}` }
                        }, function(error) {
                            if(error) return new Error(error)
                        }
                    )
                });

                Pedidos.findOneAndUpdate({_id : input.id}, input, {new:true}, (error, object) => {
                    if(error) rejects(error);
                    else resolve('Se actualizó correctamente');
                })
            })
        },
        crearUsuario: async(root, {usuario, nombre, password, rol}) => {
            // se usa async porque puede tardar si la tabla es muy pesada
            // async await: nos permite correr codigo asincrono, pero tambien esperar hasta que alla una respuesta para continuar su ejecucion

            // revisar si el usuario
            // si no tuvieramos el archivo .babelrc, esta parte quedaria asi: Usuarios.findOne({usuario: usuario});
            // pero como lo tenemos usamos las nuevas versiones de javascript
            const existeUsuario = await Usuarios.findOne({usuario});

            if(existeUsuario){
                throw new Error('El usuario ya existe');
            }

            const nuevoUsuario = await new Usuarios({
                usuario,
                nombre,
                password,
                rol
            }).save();
            // Nota: este console.log se ve en la consola donde se corre graphql
            //console.log(nuevoUsuario)
            return "Creado Correctamente";
        },
        autenticarUsuario: async(root, {usuario, password}) => {
            // nos devuelve toda la data del usuario, si lo encuentra
            const nombreUsuario = await Usuarios.findOne({usuario});

            if (!nombreUsuario){
                throw new Error('Usuario no encontrado');
            }

            const passwordCorrecto = await bcrypt.compare(password, nombreUsuario.password);
            // si el password es incorrecto
            if(!passwordCorrecto){
                throw new Error("Password Incorrecto");
            }
            //process.env: viene de dotenv
            // 1hr: cada hora se tiene que loguear
            return {
                token : crearToken(nombreUsuario, process.env.SECRETO, '1hr')
            }
        }
    }
}
