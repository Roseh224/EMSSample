import { useContext } from "react";
import { AuthContext } from "../Components/context/AuthProvider";

export default function useAuth () {
    return useContext(AuthContext);
}
