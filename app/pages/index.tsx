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
import { router } from 'expo-router';

export default function selectpage() {
	return (
		<View className='flex-1 justify-center items-center bg-[#FF543E]/90'>
    	<Text className='text-[#fff] font-semibold text-xl mb-6'>
						  Downloading from...
						</Text>
			<ImageBackground
				source={require('../../assets/images/bg-s.png')}
				className='h-80 w-80  rounded-xl overflow-hidden  object-cover justify-center items-center'>
				<View className='flex-row flex-wrap justify-center pt-7 items-center  gap-8 w-full px-6'>
					<TouchableOpacity className='items-center' onPress={() => router.push("/pages/facebook")}>
						<View className='bg-[#fff]/20 p-2 rounded-md'>
							<Image
								source={require('../../assets/images/facebook.png')}
								className='h-20 object-contain w-20'
							/>
						</View>
						<Text className='text-[#fff] mt-1'>
							Facebook{' '}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity className='items-center' onPress={() => router.push("/pages/media")}>
						<View className='bg-[#fff]/20 p-2 rounded-md'>
							<Image
								source={require('../../assets/images/instagram.png')}
								className='h-20 object-contain w-20'
							/>
						</View>
						<Text className='text-[#fff] mt-1'>
							Instagram{' '}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity className='items-center' onPress={() => router.push("/pages/tiktok")}>
						<View className='bg-[#fff]/20 p-2 px-4 rounded-md'>
							<Image
								source={require('../../assets/images/tiktok.png')}
								className='h-20 object-cover w-16'
							/>
						</View>
						<Text className='text-[#fff] mt-1'>
							Tiktok{' '}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity className='items-center' onPress={() => router.push("/pages/yt")}>
						<View className='bg-[#fff]/20 px-1  rounded-md'>
							<Image
								source={require('../../assets/images/yout.png')}
								className='h-24 object-contain w-24'
							/>
						</View>
						<Text className='text-[#fff] mt-1'>
							Youtube{' '}
						</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({});
