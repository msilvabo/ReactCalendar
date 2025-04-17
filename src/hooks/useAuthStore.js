import { useDispatch, useSelector } from "react-redux"
import {calendarApi} from "../api";
import { clearErrorMessage, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const starLogin = async({ email, password }) => {
        try {
            const {data} = await calendarApi.post('/auth',{email,password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.UID}));

        } catch (error) {
            dispatch(onLogout('credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
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