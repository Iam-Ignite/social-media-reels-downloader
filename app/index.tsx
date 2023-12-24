/** @format */

import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import {  router } from 'expo-router';

export default function index() {
	return (
		<View className='flex-1 relative bg-white justify-center flex-col gap-5 items-center'>
			<View>
				<Image
					source={require('../assets/images/hero.png')}
					className='h-44 w-44'
				/>
			</View>
			<View className='mt-5'>
				<Image
					source={require('../assets/images/font.png')}
					className='h-5 object-contain w-72'
				/>
			</View>
			<Text className='text-center text-gray-500 text-lg px-6'>
				Download Videos from multiple online platforms with
				ease
			</Text>
            <TouchableOpacity onPress={() => router.push("/pages")} className='absolute bottom-24 overflow-hidden rounded-md '>
				<ImageBackground
					source={require('../assets/images/btn.png')} className='h-10 w-44 rounded-md justify-center items-center'>
					<Text className='text-white font-bold text-sm text-center'>Get Started</Text>
				</ImageBackground>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({});
