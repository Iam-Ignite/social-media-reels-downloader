/** @format */

import {
	Modal,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import React, { useEffect, useState } from 'react';


export default function DownloadModal({
	setModalVisible,
	modalVisible,
	progressState,
}: any) {
	const [msg, setMsg] = useState('Downloading ...');

	useEffect(() => {
		if (progressState === '100.00') {
			setMsg('Download Completed');
			setTimeout(() => {
				setModalVisible(false);
			}, 2000);
		}
	}, [progressState]);

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible);
			}}>
			<View className='flex-1 justify-center items-center bg-[#000000a3]'>
				<View className='h-2/5 w-4/5 relative rounded-xl justify-center items-center bg-[#ff543e]/90'>
					<Text className='text-white absolute font-bold text-2xl'>
						{progressState}%
					</Text>
					<Progress.Circle
						size={150}
						borderWidth={8}
						color='#FEA95F'
						indeterminate={true}
					/>

					<Text className='text-white absolute bottom-12  font-bold text-2xl'>{msg}</Text>
				</View>
			</View>
		</Modal>
	);
}

