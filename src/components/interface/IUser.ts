import IEndereco from "./IEndereco";

export default interface IUser {
    id?: number,
    nome: string,
    cnpj: string,
    email: string,
    senha: string,
    confirmasenha: string,
    telefone: string,
    tipocliente: number,
    endereco: IEndereco;
}