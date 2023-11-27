import { useState } from "react";

export default function usePost() {
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);
    const [resposta, setResposta] = useState('');

    async function cadastrarDados<T>({ url, dados, token }: { url: string, dados: T, token?: string }) {
        try {
            const headers: HeadersInit = {
                'Content-Type': 'application/json'
            }
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const resposta = await fetch(`https://localhost:7260/${url}`, {
                method: 'POST',
                headers: headers, // Use os headers configurados
                body: JSON.stringify(dados)
            });

            const respostaConvertida = await resposta.json();
            if (respostaConvertida.token != null) {
                setSucesso(true);
                setResposta(respostaConvertida.token);
                localStorage.setItem('token', respostaConvertida.token);
                localStorage.setItem('autenticacao', JSON.stringify({ autenticado: true, tipoUser: respostaConvertida.tipoUser, userId: respostaConvertida.userId }));
            } else {
                setErro(`Erro ${respostaConvertida}: ${resposta.statusText}`);
                setSucesso(false);
                console.log("ola");
                console.log(respostaConvertida);
            }
        }
        catch (erro) {

            console.log("oi");
            //setErro('Não foi possível enviar os dados');
        }
    }
    return { cadastrarDados, sucesso, erro, resposta }
}