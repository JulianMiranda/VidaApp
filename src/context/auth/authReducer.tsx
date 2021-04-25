import {User} from '../../interfaces/User.interface';

export interface AuthState {
	status: 'checking' | 'authenticated' | 'not-authenticated';
}

type AuthAction = {type: 'notAuthenticated'};

export const authReducer = (
	state: AuthState,
	action: AuthAction
): AuthState => {
	switch (action.type) {
		case 'notAuthenticated':
			return {
				...state,
				status: 'not-authenticated'
			};

		default:
			return state;
	}
};
