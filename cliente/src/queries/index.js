import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql` 
  query getClientes($limite: Int, $offset: Int, $vendedor: String) {
    getClientes(limite: $limite, offset: $offset, vendedor: $vendedor) {
        id
        nombre
        apellido
        empresa
    }
    totalClientes(vendedor: $vendedor)
  }
`;

export const CLIENTE_QUERY = gql`
  query ConsultarCliente($id:ID){
    getCliente(id:$id){
      id
      nombre
      apellido
      empresa
      edad
      tipo
      emails {
        email
      }
    }
  }
`;

export const PRODUCTOS_QUERY = gql`
  query obtenerProductos($limite: Int, $offset: Int, $stocks: Boolean){
    obtenerProductos(limite : $limite, offset: $offset, stocks: $stocks){
      id
      nombre
      precio
      stock
    }
    totalProductos
  }
`;

export const PRODUCTO_QUERY = gql`
  query obtenerProducto ($id: ID!){
    obtenerProducto (id: $id){
      nombre
      precio
      stock
    }
  }
`;
// Nota: Originalmente era de tipo String pero al final se cambio por ID, 
// sin embargo esto dio problemas entonces se dejo String : String => ID
export const PEDIDOS_QUERY = gql`
  query obtenerPedidos($cliente : String){
    obtenerPedidos(cliente : $cliente){
      id
      total
      fecha
      estado
      pedido{
        id
        cantidad
      }
    }
  }
`;

export const TOP_CLIENTES = gql`
  query topClientes{
    topClientes{
      total
      cliente{
        nombre
      }
    }
  }
`;

export const TOP_VENDEDORES = gql`
  query topVendedores{
    topVendedores{
      total
      vendedor{
        nombre
      }
    }
  }
`;

export const USUARIO_ACTUAL = gql`
  query obtenerUsuario{
    obtenerUsuario {
      id
      usuario
      nombre
      rol
    }
  }
`;
