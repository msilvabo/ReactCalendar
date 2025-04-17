import { useAuthStore } from "../../hooks/useAuthStore";

export const NavBar = () => {

  const {starLogout, user} = useAuthStore();
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4 fixed-top">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;&nbsp;&nbsp;
            {user.name}
        </span>
        <button 
          className="btn btn-outline-danger"
          onClick={starLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  );
};
