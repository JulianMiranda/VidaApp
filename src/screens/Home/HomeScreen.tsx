import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../context/auth/AuthContext';

export const HomeScreen = () => {
	const {user, logOut} = useContext(AuthContext);
	return (
		<View>
			<Text>{JSON.stringify(user, null, 2)}</Text>
			<TouchableOpacity
				onPress={logOut}
				style={{
					backgroundColor: 'black',
					marginTop: 15,
					marginLeft: 100,
					padding: 7,
					alignItems: 'center',
					width: 90,
					borderWidth: 1,
					borderRadius: 60
				}}
			>
				<Text style={{color: 'white', textAlign: 'center'}}>Log Out</Text>
			</TouchableOpacity>
		</View>
	);
};
