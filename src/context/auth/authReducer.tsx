import {User} from '../../interfaces/User.interface';

export interface AuthState {
	status: 'checking' | 'authenticated' | 'not-authenticated';
	user: User | null;
	errorMessage: string;
}

type AuthAction =
	| {type: 'notAuthenticated'}
	| {type: 'signUp'; payload: {user: User}}
	| {type: 'addError'; payload: string}
	| {type: 'removeError'}
	| {type: 'logout'};

export const authReducer = (
	state: AuthState,
	action: AuthAction
): AuthState => {
	switch (action.type) {
		case 'logout':
		case 'notAuthenticated':
			return {
				...state,
				status: 'not-authenticated',
				user: null
			};

		case 'addError':
			return {
				...state,
				user: null,
				status: 'not-authenticated',
				errorMessage: action.payload
			};

		case 'removeError':
			return {
				...state,
				errorMessage: ''
			};

		case 'signUp':
			return {
				...state,
				errorMessage: '',
				status: 'authenticated',
				user: action.payload.user
			};

		default:
			return state;
	}
};
