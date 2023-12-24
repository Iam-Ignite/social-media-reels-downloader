
import {
	Modal,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React from 'react';

export default function Loading({
	setLoading,
	loading,
}: any) {

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={loading}
			onRequestClose={() => {
				setLoading(!loading);
			}}>
			<View className='flex-1 justify-center items-center bg-[#000000a3]'>
				<View className='h-2/5 w-4/5 relative rounded-xl justify-center items-center bg-[#ff543e]/90'>

					<Text className='text-white absolute bottom-12  font-bold text-2xl'>Loading link ...</Text>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({});
