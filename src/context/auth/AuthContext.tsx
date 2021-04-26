import React, {createContext, useEffect, useReducer} from 'react';
import firebase from 'firebase';

import {getHeaders} from '../../api/getHeaders';

import vidaApi from '../../api/vidaApi';
import {User, LoginData, RegisterData} from '../../interfaces/User.interface';

import {authReducer, AuthState} from './authReducer';

type AuthContextProps = {
	status: 'checking' | 'authenticated' | 'not-authenticated';
	user: User | null;
	errorMessage: string;
	signUp: (registerData: RegisterData) => void;
	signIn: (loginData: LoginData) => void;
	logOut: () => void;
	removeError: () => void;
};

const authInicialState: AuthState = {
	status: 'checking',
	user: null,
	errorMessage: ''
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
	const [state, dispatch] = useReducer(authReducer, authInicialState);

	useEffect(() => {
		checkToken();
	}, []);

	const checkToken = async () => {
		const headers = await getHeaders();

		// No token, no autenticado
		if (!headers.get('x-token')) return dispatch({type: 'notAuthenticated'});

		// Hay token
		try {
			const resp = await vidaApi.get('/login');
			if (resp.status !== 200) {
				return dispatch({type: 'notAuthenticated'});
			}
			dispatch({
				type: 'signUp',
				payload: {
					user: resp.data
				}
			});
		} catch (error) {
			console.log('Error Login', error);
			return dispatch({type: 'notAuthenticated'});
		}
	};

	const signIn = async ({email, password}: LoginData) => {
		try {
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then((res) => {
					console.log('res', res);
					checkToken();
				})
				.catch((err) => {
					dispatch({
						type: 'addError',
						payload: 'Usuario o contraseña incorrecta'
					});
					console.log('err', err);
				});
		} catch (error) {
			console.log('catch', error);
			dispatch({
				type: 'addError',
				payload: 'Error Catch'
			});
		}
	};

	const signUp = async ({name, email, password}: RegisterData) => {};

	const logOut = async () => {
		firebase.auth().signOut();
		dispatch({type: 'logout'});
	};

	const removeError = () => {
		dispatch({type: 'removeError'});
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				signUp,
				signIn,
				logOut,
				removeError
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
