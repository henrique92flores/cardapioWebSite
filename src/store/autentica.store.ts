import { makeObservable, observable, action, autorun } from "mobx";
import { SetStateAction } from "react";

interface IUsuario {
    id?:number,
    email: string,
    token: string,
    tipoUser: number

}

class AutenticaStore {
    estaAutenticado = false;
    usuario: IUsuario = { email: "", token: "", tipoUser: 0 };

    constructor() {
        makeObservable(this, {
            estaAutenticado: observable,
            usuario: observable,
            login: action,
            logout: action
        });

        autorun(() => {
        const dadosAutenticacao = localStorage.getItem('autenticacao');
        if (dadosAutenticacao) {
            const { autenticado, tipoUser } = JSON.parse(dadosAutenticacao);
            this.estaAutenticado = autenticado;
            this.usuario.tipoUser = tipoUser;
        }
            if (this.estaAutenticado) {
                console.log("Usuário autenticado:", this.usuario.email);
                console.log("tipo user no autentica: ", this.usuario.tipoUser)
            } else {
                console.log("Usuário não autenticado");
            }
        });
    }

    registrarObservadorAutenticacao(callback: { (isAutenticado: boolean | ((prevState: boolean) => boolean), usuario: { tipoUser: SetStateAction<number>; }): void; (arg0: boolean, arg1: IUsuario): void; }) {
        return autorun(() => {
            callback(this.estaAutenticado, this.usuario);
        });
    }

    login({id, email, token, tipoUser }: IUsuario) {
        this.estaAutenticado = true;
        console.log('id',id);
        this.usuario = {id, email, token, tipoUser };
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.setItem('autenticacao', JSON.stringify({ autenticado: false, tipoUser: 0 }));
        this.estaAutenticado = false;
        this.usuario = { id:0, email: "", token: "", tipoUser :0 }
    }
}

const autenticaStore = new AutenticaStore();

export default autenticaStore;