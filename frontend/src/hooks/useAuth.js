import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();
    const current_time = Math.floor(Date.now() / 1000);
    let access_token = localStorage.getItem("access_token")
    let claims = ''
    if (access_token) {
        claims = jwtDecode(access_token);

        if (claims.exp<current_time) {
            access_token= null
            navigate("/")
        }
    }
    else {
        access_token=null
        navigate("/");
    }

    return  { 
                access_token,
                user: claims.user_name, 
                role: claims.role 
            };
};

export default useAuth;