import { useState } from "react";

interface PostResult {
    erro: string;
    sucesso: boolean;
    resposta: string;
    usertype: number; // Adicione a propriedade usertype
}


export default function usePost() {
    const [resultado, setResultado] = useState<PostResult>({
        erro: '',
        sucesso: false,
        resposta: '',
        usertype: 0, // Inicialize com um valor padrão, se aplicável
    });

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
                setResultado({
                    erro: '',
                    sucesso: true,
                    resposta: respostaConvertida.token,
                    usertype: respostaConvertida.tipoUser,
                });
                localStorage.setItem('token', respostaConvertida.token);
                localStorage.setItem('autenticacao', JSON.stringify({ autenticado: true, tipoUser: respostaConvertida.tipoUser, userId: respostaConvertida.userId }));
            } else {
                setResultado({
                    erro: `Erro ${respostaConvertida}: ${resposta.statusText}`,
                    sucesso: false,
                    resposta: '',
                    usertype: 0, 
                });
            }
        }
        catch (erro) {

            console.log("Não foi possível enviar os dados'");
        }
    }
    return { cadastrarDados, ...resultado };
}