import { useDispatch, useSelector } from "react-redux"
import {calendarApi} from "../api";

export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const starLogin = async({ email, password }) => {
        console.log({ email, password });
        try {
            const resp = await calendarApi.post('/auth',{email,password})
            console.log({resp});
        } catch (error) {
            // console.log("Error en login:", error.response?.data || error.message);
            console.log({error});
        }
    }

    return {
        //* Propiedades
        status,
        user,
        errorMessage,
        //* Metodos
        starLogin
    }
}