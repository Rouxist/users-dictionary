import { createContext, useMemo, useState } from "react";

export const userDataContext = createContext();

const UserData = (props) => {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [name, setName] = useState('');
    const [userId, setUserId] = useState(' ');
    const [wordSetData, setWordSetData] = useState([]);

    const uesr = {
        isSignedIn: isSignedIn,
        name: name,
        userId: userId,
        wordSetData: wordSetData,

        setIsSignedIn: (bool) => {
            setIsSignedIn(bool);
        },

        setName: (name) => {
            setName(name);
        },

        setUserId: (id) => {
            setUserId(id);
        },

        setWordSetData: (data) => {
            setWordSetData(data);
        },

        addWordSetData: (data) => {
            setWordSetData(...wordSetData, data);
        },
    }

    //useMemo : 최적화 관련
    const value = useMemo(() => (uesr), [uesr]); //record가 아니라 여러 개 넣을 때는 {}로 감싸서

    return <userDataContext.Provider value={value}>{props.children}</userDataContext.Provider>;
}

export default UserData;