import axios, { AxiosPromise } from "axios"
import { useQuery } from "react-query";
import { IRestaurant } from "../components/interface/IRestaurant";

const API_URL = 'http://localhost:5228';

const fetchData = async (): AxiosPromise<IRestaurant[]> => {
    const response = axios.get(API_URL + '/restaurant/');
    return response;
}

export function useRestaurant() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['restaurant-data'],
        retry: 2
    })
    return {
        ...query,
        data: query.data?.data
    }

}