import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { getEnvVariables } from "../helpers";

export const AppRouter = () => {

    const autStatus = 'not-autenticated';
    
  return (
    <Routes>
        {
            autStatus === 'not-autenticated'
                ? <Route path="auth/*" element ={<LoginPage/>}/>
                : <Route path="/*" element ={<CalendarPage/>}/>
        }
        <Route path="/*" element ={<Navigate to="/auth/login"/>}/>
    </Routes>
  );
};
