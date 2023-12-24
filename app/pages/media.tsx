/** @format */

import {
	Alert,
	Image,
	ImageBackground,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoList from '../../components/vidoe/Video';
import DownloadModal from '../../components/modal/DownloadModal';
import Loading from '../../components/modal/Loading';
import {
	BannerAd,
	BannerAdSize,
	TestIds,
} from 'react-native-google-mobile-ads';


export default function home() {
	const [url, setUrl] = useState('');
	const [data, setData] = useState<any>([]);
	const [progressState, setProgressState] = useState('');
	const [layout, setLayout] = useState(true);
	const [loading, setLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	const adUnitId:any = __DEV__
		? TestIds.ADAPTIVE_BANNER
		: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

	const handleLink = async () => {
		if (!url) {
			Alert.alert('Error', 'Please enter a valid URL');
			return;
		}

		if (url.includes('instagram')) {
			setLoading(true);

			const options = {
				method: 'GET',
				url: 'https://social-media-video-downloader.p.rapidapi.com/api/getSocialVideo',
				params: {
					url,
				},
				headers: {
					'X-RapidAPI-Key':
						'd0fb1dfbf3msh4173863f2b0ae9dp1cea2cjsn30d32e2b6680',
					'X-RapidAPI-Host':
						'social-media-video-downloader.p.rapidapi.com',
				},
			};

			try {
				const response = await axios.request(options);
				console.log(response.data);
				setData(response.data);
				setLayout(false);
				setLoading(!true);

				// console.log(response.data.media);

				// Handle the response, you may want to display the downloaded content
			} catch (error) {
				console.error(error);
				Alert.alert(
					'Error',
					'Failed to download. Please try again.',
				);
			}
		} else {
			Alert.alert('Error', 'Please enter a valid URL');
		}
	};

	function bytesToMegabytes(bytes: number) {
		return bytes / (1024 * 1024);
	}

	// Exa
	const downloadVideo = async (
		videoUrl: string,
		fileName: string,
		image: string,
	) => {
		// const random8DigitNumber = Math.floor(
		// 	10000 + Math.random() * 90000,
		// );

		try {
			// Define the file name and destination

			const fileUri =
				FileSystem.documentDirectory + fileName + '.mp4';

			// Create a download resumable with a callback for progress
			const callback = (downloadProgress: {
				totalBytesWritten: number;
				totalBytesExpectedToWrite: number;
			}) => {
				const progress =
					downloadProgress.totalBytesWritten /
					downloadProgress.totalBytesExpectedToWrite;

				const fileSizeInMegabytes = bytesToMegabytes(
					downloadProgress.totalBytesExpectedToWrite,
				);
				setModalVisible(true);
				const num = progress * 100;
				setProgressState(num.toFixed(2));
				if (num === 100) {
					setLayout(true);
				}
			};

			const downloadResumable =
				FileSystem.createDownloadResumable(
					videoUrl,
					fileUri,
					{},
					callback,
				);

			// Start the download
			const { uri }: any =
				await downloadResumable.resumeAsync();
			const existingVideos = await AsyncStorage.getItem(
				'videoUri',
			);
			const videos = existingVideos
				? JSON.parse(existingVideos)
				: [];

			// Add the new video to the array
			videos.push({
				id: fileName,
				uri: uri,
				image: image,
			});

			// Save the updated array back to AsyncStorage
			await AsyncStorage.setItem(
				'videoUri',
				JSON.stringify(videos),
			);

			await AsyncStorage.setItem(
				'videoUri',
				JSON.stringify(videos),
			);

			console.log('Finished downloading to:', uri);

			// Optionally, share the downloaded video
			Sharing.shareAsync(uri);
		} catch (error) {
			console.error('Error during download:', error);
		}
	};

	const VideoDetails = () => {
		return (
			<View className='bg-gray-100 flex-row w-full items-center justify-center rounded-md overflow-hidden  mt-5'>
				<Image
					source={{ uri: data.picture }}
					className='w-2/5 h-36 rounded-md object-contain'
				/>
				<View className='p-4 gap-3'>
					<View className='flex-row'>
						<Text>ID : </Text>
						<Text>{data.a}</Text>
					</View>
					<View className='flex-row'>
						<Text>Media : </Text>
						<Text>All media </Text>
					</View>
					<View className='flex-row'>
						<Text>Type : </Text>
						<Text> Video </Text>
					</View>

					{data.links.map((video: any) => (
						<TouchableOpacity
							key={video.a}
							onPress={() =>
								downloadVideo(
									video.link,
									data.a,
									data.picture,
								)
							}
							className=' overflow-hidden rounded-md '>
							<ImageBackground
								source={require('../../assets/images/btn.png')}
								className='h-10 w-44 rounded-md justify-center items-center'>
								<Text className='text-white font-bold text-lg text-center'>
									Download {video.quality}
								</Text>
							</ImageBackground>
						</TouchableOpacity>
					))}
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView className='flex-1 bg-white p-4 items-center'>
			<View className='mb-8 mt-12'>
				<Image
					source={require('../../assets/images/media.png')}
					className='h-6 object-contain w-48'
				/>
			</View>
			<View className='flex-row items-center mb-4'>
				<View className='border overflow-hidden relative border-gray-400 flex-row items-center w-4/5 rounded-full px-4  h-12'>
					<Image
						source={require('../../assets/images/paste.png')}
						className='h-5 object-contain w-5 mr-4'
					/>
					<TextInput
						className='mr-2'
						placeholderTextColor='#959090'
						placeholder='Paste link here ...'
						onChangeText={setUrl}
						value={url}
					/>
				</View>
				<TouchableOpacity onPress={handleLink}>
					<Image
						source={require('../../assets/images/btndwn.png')}
						className='h-14 object-contain w-14'
					/>
				</TouchableOpacity>
			</View>

			{layout ? (
				<View>
					<Text className='px-6 text-lg text-gray-800 font-semibold mb-5'>
						History by Applications{' '}
					</Text>
					<View className='flex-row justify-between items-center  gap-6 w-full px-6'>
						<TouchableOpacity className='items-center'>
							<View className='bg-[#1877F2]/20 p-2 rounded-md'>
								<Image
									source={require('../../assets/images/facebook.png')}
									className='h-10 object-contain w-10'
								/>
							</View>
							<Text className='text-[#1877F2] mt-1'>
								Facebook{' '}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity className='items-center'>
							<View className='bg-[#FF543E]/20 p-2 rounded-md'>
								<Image
									source={require('../../assets/images/instagram.png')}
									className='h-10 object-contain w-10'
								/>
							</View>
							<Text className='text-[#FF543E] mt-1'>
								Instagram{' '}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity className='items-center'>
							<View className='bg-[#00F2EA]/20 p-2 px-4 rounded-md'>
								<Image
									source={require('../../assets/images/tiktok.png')}
									className='h-10 object-cover w-8'
								/>
							</View>
							<Text className='text-[#000] mt-1'>
								Tiktok{' '}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity className='items-center'>
							<View className='bg-[#FF0000]/20 px-1  rounded-md'>
								<Image
									source={require('../../assets/images/yout.png')}
									className='h-14 object-contain w-12'
								/>
							</View>
							<Text className='text-[#FF0000] mt-1'>
								Youtube{' '}
							</Text>
						</TouchableOpacity>
					</View>
					<View className=' rounded-md mx-4  mt-10 p-2 h-4/5  '>
						<Text className='mb-5 font-semibold text-lg'>
							Downloads
						</Text>
						<VideoList modalVisible={modalVisible} />
					</View>
				</View>
			) : (
				<View>
					<VideoDetails />
				</View>
			)}
			<DownloadModal
				setModalVisible={setModalVisible}
				progressState={progressState}
				modalVisible={modalVisible}
			/>
			<View className='absolute bottom-4'>
			  	<BannerAd
				unitId={adUnitId}
				size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
			/>
			</View>
			<Loading loading={loading} setLoading={setLoading} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});
