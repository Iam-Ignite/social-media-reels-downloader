/** @format */

import {
	Image,
	ImageBackground,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
	RewardedAd,
	RewardedAdEventType,
	TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
	? TestIds.REWARDED
	: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
	keywords: ['fashion', 'clothing'],
});

const VideoDetails = ({ video, downloadVideo }: any) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const unsubscribeLoaded = rewarded.addAdEventListener(
			RewardedAdEventType.LOADED,
			() => {
				setLoaded(true);
			},
		);
		const unsubscribeEarned = rewarded.addAdEventListener(
			RewardedAdEventType.EARNED_REWARD,
			(reward) => {
				console.log('User earned reward of ', reward);
			},
		);

		// Start loading the rewarded ad straight away
		rewarded.load();

		// Unsubscribe from events on unmount
		return () => {
			unsubscribeLoaded();
			unsubscribeEarned();
		};
	}, []);

      if (!loaded) {
	return (
		<View className='bg-gray-100 flex-row w-full items-center justify-center rounded-md overflow-hidden  mt-5'>
			<Image
				source={{ uri: video.image }}
				className='w-2/5 h-44 rounded-md object-contain'
			/>
			<View className='p-4 gap-3'>
				<View className='flex-row'>
					<Text>ID : </Text>
					<Text>{video.id}</Text>
				</View>
				<View className='flex-row'>
					<Text>Media : </Text>
					<Text>Facebook </Text>
				</View>
				<View className='flex-row'>
					<Text>Type : </Text>
					<Text> {video.type} </Text>
				</View>
				<TouchableOpacity
					onPress={() =>{
                        rewarded.show()
						downloadVideo(
							video.sd_url,
							video.id,
							video.image,
						)}
					}
					className=' overflow-hidden rounded-md '>
					<ImageBackground
						source={require('../../assets/images/btn.png')}
						className='h-10 w-44 rounded-md justify-center items-center'>
						<Text className='text-white font-bold text-lg text-center'>
							Download SD
						</Text>
					</ImageBackground>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() =>{
                        rewarded.show()
						downloadVideo(
							video.hd_url,
							video.id,
							video.image,
						)}
					}
					className='border border-[#FF543E] h-10 items-center justify-center overflow-hidden  rounded-md '>
					<Text className='text-[#FF543E] font-bold text-lg text-center'>
						Download HD
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
      }
};

export default VideoDetails;
