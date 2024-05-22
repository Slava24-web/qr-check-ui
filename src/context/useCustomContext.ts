import React, { useContext } from 'react';

const CustomContext = React.createContext({});

export function useCustomContext() {
    return useContext(CustomContext);
}

export default CustomContext;