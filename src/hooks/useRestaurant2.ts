import { useState } from "react";

export default function usePostuseRestaurant2() {
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);
    const [resposta, setResposta] = useState('');

    async function cadastrarDados<T>({ url, dados, token }: { url: string, dados: T, token?: string }) {
        try {
            const headers: HeadersInit = {
                'Content-Type': 'application/json'
            }
                headers['Access-Control-Allow-Origin'] = '*';

            const resposta = await fetch(`http://localhost:5228/${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            setSucesso(true);
            const respostaConvertida = await resposta.json();
            setResposta(respostaConvertida.token);
        }
        catch (erro) {
            setErro('Nao foi possivel enviar os dados');
        }
    }
    return { cadastrarDados, sucesso, erro, resposta }
}