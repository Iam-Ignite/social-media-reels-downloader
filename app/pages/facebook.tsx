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
import React, { useEffect, useState } from 'react';
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
	InterstitialAd,
	AdEventType,
} from 'react-native-google-mobile-ads';
import VideoDetails from '../../components/vidoe/Videodetail';



const adUnit = __DEV__
	? TestIds.INTERSTITIAL
	: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const adUnitId: any = __DEV__
	? TestIds.ADAPTIVE_BANNER
	: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(
	adUnit,
	{
		keywords: ['fashion', 'clothing'],
	},
);

export default function home() {
	const [url, setUrl] = useState('');
	const [data, setData] = useState<any>([]);
	const [progressState, setProgressState] = useState('');
	const [layout, setLayout] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);
	  const [pageReloaded, setPageReloaded] = useState(false);


		const handleLink = async () => {
		if (!url) {
			Alert.alert('Error', 'Please enter a valid URL');
			return;
		}
		const options = {
			method: 'GET',
			url: 'https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php',
			params: {
				url,
			},
			headers: {
				'X-RapidAPI-Key':
					'7cc361e202msh2b055fbf6365b7ep10456fjsn73d878075aa9',
				'X-RapidAPI-Host':
					'facebook-reel-and-video-downloader.p.rapidapi.com',
			},
		};
		interstitial.show()
		setLoading(!false);

		if (url.includes('facebook')) {
			try {
				const response = await axios.request(options);
				setData(response.data.media);
				setLayout(false);
				setLoading(false);
			} catch (error) {
				console.error(error);
				Alert.alert(
					'Error',
					'Failed to download. Please check your internet connection and try again.',
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
			// Save the updated array back to AsyncStorage
			await AsyncStorage.setItem(
				'videoUri',
				JSON.stringify(videos),
			);

			// Optionally, share the downloaded video
			Sharing.shareAsync(uri);
		} catch (error) {
			console.error('Error during download:', error);
		}
	};

 
   
	useEffect(() => {
		const unsubscribe = interstitial.addAdEventListener(
			AdEventType.LOADED,
			() => {
				setLoaded(true);
			},
		);

		// Start loading the interstitial straight away
		interstitial.load();

		// Unsubscribe from events on unmount
		return unsubscribe;
	}, []);

	 useEffect(() => {
  setTimeout(()=>{

    setPageReloaded(true);

  },3000)
     
  }, []); 
  

	// No advert ready to show yet
	if (!loaded) {
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
				<View className=''>
					<Text className='px-6 text-lg text-gray-800 font-semibold mb-5'>
						History by Applications
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
					{data.map((video: any, index: any) => (
						<VideoDetails key={index} video={video} downloadVideo={downloadVideo} />
					))}
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

}
