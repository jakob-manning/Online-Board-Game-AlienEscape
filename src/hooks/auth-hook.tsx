import {useCallback, useEffect, useState} from "react";

let logoutTimer: NodeJS.Timeout;

interface authenticationData {
    userID: string
    token: string
    expiration: string
}

export const useAuth = () => {
    const [token, setToken] = useState<string|null>(null);
    const [tokenExpiration, setTokenExpiration] = useState<Date|null>( null);
    const [userID, setUserID] = useState<string|null>(null);

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        setUserID(uid);
        const tokenExpirationDate =  expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 6);
        setTokenExpiration(tokenExpirationDate);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userID: uid,
                token: token,
                expiration: tokenExpirationDate.toISOString()
            }))
    }, []);

    const logout = useCallback((history) => {
        setToken(null);
        setUserID(null);
        setTokenExpiration(null);
        localStorage.removeItem("userData");
    }, []);

    useEffect( () => {
        if(token && tokenExpiration){
            const remainingTime = tokenExpiration.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        }
        else {
            clearTimeout(logoutTimer);
        }
    } ,[token, logout, tokenExpiration]);

    useEffect(() => {
        let dataString = localStorage.getItem("userData")
        let storedData: authenticationData | null = null
        if(dataString){
            storedData = JSON.parse(dataString) as authenticationData
        }
        if ( storedData && storedData.token && new Date(storedData.expiration) > new Date() ) {
            login(storedData.userID, storedData.token, new Date(storedData.expiration));
        }
        else if (storedData){
            localStorage.removeItem("userData");
        }
    }, [login]);

    return { token, login, logout, userID };
}