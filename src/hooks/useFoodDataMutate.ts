import axios, { AxiosPromise } from "axios"
import { IFood } from "../components/interface/IFood";
import { useMutation, useQueryClient } from "react-query";

const API_URL = 'https://localhost:7260';
//const API_URL = 'http://localhost:8080';

const postData = async (data: IFood): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/food', data);
    return response;
}

export function useFoodDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSucess: () => {
            queryClient.invalidateQueries(['food-data'])
        }
    })
    return mutate;

}