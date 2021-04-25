import React, {useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthContext} from '../context/auth/AuthContext';

import {LoginScreen} from '../screens/Login/LoginScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
	const {status} = useContext(AuthContext);

	/* if (status === 'checking') return <ActivityIndicator />; */

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				cardStyle: {
					backgroundColor: 'white'
				}
			}}
		>
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
		</Stack.Navigator>
	);
};
