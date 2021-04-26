import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import firebase from 'firebase';
import {Navigator} from './src/navigation/Navigation';
import {AuthProvider} from './src/context/auth/AuthContext';
import {firebaseConfig} from './src/utils/firebaseConfig';

const AppState = ({children}: any) => {
	if (firebase.apps.length === 0) {
		firebase.initializeApp(firebaseConfig);
	}
	return <AuthProvider>{children}</AuthProvider>;
};

const App = () => {
	return (
		<NavigationContainer>
			<AppState>
				<Navigator />
			</AppState>
		</NavigationContainer>
	);
};
export default App;
