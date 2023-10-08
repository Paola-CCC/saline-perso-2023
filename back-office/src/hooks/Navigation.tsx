
import { useNavigate } from "react-router-dom";

const useGoNavigate = () => {

    const navigate = useNavigate();

    const goTo = ( path : any ,Id : any) => {
        navigate(`${path}/${Id} `);
    }
    return { goTo };
}

export { useGoNavigate }