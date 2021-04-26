import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthContext} from '../context/auth/AuthContext';

import {LoginScreen} from '../screens/Login/LoginScreen';
import {Loading} from '../components/Loading';
import {HomeScreen} from '../screens/Home/HomeScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
	const {status} = useContext(AuthContext);

	if (status === 'checking') return <Loading />;

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				cardStyle: {
					backgroundColor: 'white'
				}
			}}
		>
			{status !== 'authenticated' ? (
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
			) : (
				<Stack.Screen name="HomeScreen" component={HomeScreen} />
			)}
		</Stack.Navigator>
	);
};
