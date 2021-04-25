import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigation/Navigation';
import {AuthProvider} from './src/context/auth/AuthContext';

const AppState = ({children}: any) => {
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
