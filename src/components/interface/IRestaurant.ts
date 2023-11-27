import IEndereco from "./IEndereco";

export interface IRestaurant {
    id?: number,
    nome: string,
    nomeFantasia: string,
    imagem: string,
    cnpj:string,
    addresDto: IEndereco
}