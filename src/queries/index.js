import gql from 'graphql-tag';


export const CLIENTE_QUERY = gql `
  query ConsultarClientes($id:ID) {
    getCliente(id: $id) {
      nombre
      apellido
      empresa
      edad
      emails{
        email
      }
      tipo
    }
  }
`;

export const CLIENTES_QUERY = gql `

  query getClientes($limite: Int, $offset: Int){
    getClientes(limite: $limite, offset: $offset){
      id
      nombre
      apellido
      empresa
    }
    totalClientes
  }

`;

export const OBTENER_PRODUCTOS = gql`

  query obtenerProductos($limite: Int, $offset: Int, $stock: Boolean) {
    obtenerProductos(limite:$limite, offset: $offset, stock: $stock){
      id
      nombre
      precio
      stock
    }
    totalProductos
  }	

`;

export const OBTENER_PRODUCTO = gql`

  query obtenerProducto($id: ID!){
    obtenerProducto(id: $id) {
      nombre
      stock
      precio
    }
  }
`;

//pedidos 
export const OBTENER_PEDIDOS = gql`
  query obtenerPedidos($cliente: ID) {
  obtenerPedidos(cliente: $cliente) {
    id
    pedido {
      id
      cantidad
    }
    total
    fecha
    estado
  }
}
`;

export const TOP_CLIENTES = gql`
  query topClientes {
    topClientes{
      total
      cliente{
        nombre
      }
    }
  }
`;

// USUARIOS

export const USUARIO_ACTUAL = gql`
  query obtenerUsuario {
    obtenerUsuario{
      usuario
    }
  }

`
