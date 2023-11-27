import axios, { AxiosPromise } from "axios"
import { IFood } from "../components/interface/IFood";
import { useQuery } from "react-query";

const API_URL = 'https://localhost:7260';
//const API_URL = 'http://localhost:5228';
//const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<IFood[]> => {
    const response = axios.get(API_URL + '/food');
    return response;
}

export function useFoodData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['food-data'],
        retry: 2
    })
    return {
        ...query,
        data: query.data?.data
    }
    
}