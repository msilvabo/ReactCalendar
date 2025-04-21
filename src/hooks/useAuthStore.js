import { useDispatch, useSelector } from "react-redux"
import {calendarApi} from "../api";
import { clearErrorMessage, onLogin, onLogout } from "../store/auth/authSlice";
import { onLogOutCalendar } from "../store/calendar/calendarSlice";

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

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch( onLogout());
        try {
            const {data} = await calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout());
        }
    }

    const starLogout = () => {
        localStorage.clear();
        dispatch ( onLogout());
        dispatch(onLogOutCalendar());
    }


    return {
        //* Propiedades
        status,
        user,
        errorMessage,

        //* Metodos
        starLogin,
        checkAuthToken,
        starLogout
    }
}