import { createContext,useState } from "react";

const AppContext = createContext();

function AppProvider ({children}) {
    const [userUID,setUserUID] = useState('you you');
    const [userBioData,setUserBioDat] = useState({email:'',firstName:'',lastName:''});

    return (
        <AppContext.Provider value={{userUID,userBioData}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext,AppProvider}