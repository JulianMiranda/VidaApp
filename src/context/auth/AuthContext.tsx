import React, {createContext, useEffect, useReducer} from 'react';

import {authReducer, AuthState} from './authReducer';

type AuthContextProps = {
	status: 'checking' | 'authenticated' | 'not-authenticated';
};

const authInicialState: AuthState = {
	status: 'checking'
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
	const [state, dispatch] = useReducer(authReducer, authInicialState);

	return (
		<AuthContext.Provider
			value={{
				...state
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
