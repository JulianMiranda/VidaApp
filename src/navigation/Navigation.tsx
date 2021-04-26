import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthContext} from '../context/auth/AuthContext';

import {LoginScreen} from '../screens/Login/LoginScreen';
import {Loading} from '../components/Loading';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {RegisterScreen} from '../screens/Login/RegisterScreen';

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
				<>
					<Stack.Screen name="LoginScreen" component={LoginScreen} />
					<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
				</>
			) : (
				<Stack.Screen name="HomeScreen" component={HomeScreen} />
			)}
		</Stack.Navigator>
	);
};
