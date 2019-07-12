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
