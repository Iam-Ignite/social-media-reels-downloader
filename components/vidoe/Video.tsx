import React, { useEffect, useState } from 'react';
import { View, SectionList, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResizeMode, Video } from 'expo-av';
import * as Sharing from 'expo-sharing';

const VideoList = ({ modalVisible }: any) => {
  const [videos, setVideos] = useState<any>([]);

  useEffect(() => {
    loadVideos();
  }, [modalVisible]);

  const loadVideos = async () => {
    try {
      const storedVideos = await AsyncStorage.getItem('videoUri');

      if (storedVideos) {
        const parsedVideos = JSON.parse(storedVideos);
        setVideos(parsedVideos.reverse());
      }
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  };



  const removeVideo = async (videoId: string) => {
    // Remove the selected video from AsyncStorage and update the state
    const updatedVideos = videos.filter((video: any) => video.id !== videoId);
    setVideos(updatedVideos);
    await AsyncStorage.setItem('videoUri', JSON.stringify(updatedVideos));
  };

  const RenderItem = ({ item }: any) => (
    <View className='pb-6'>
      <TouchableOpacity className="">
        <Video
          source={{ uri: item.uri }}
          style={{ height: 320 }}
          className="rounded-md bg-gray-100  w-full"
          resizeMode={ResizeMode.COVER}
          useNativeControls
        />
      </TouchableOpacity>
      <View className="flex-row mt-3 justify-between">
        <TouchableOpacity onPress={() => removeVideo(item.id)}>
          <Image
            source={require('../../assets/images/rash.png')}
            className="h-6 object-contain w-6"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Sharing.shareAsync(item.uri)}>
          <Image
            source={require('../../assets/images/share.png')}
            className="h-8 object-contain w-8"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className='flex-1 h-screen  pb-20'>
      <SectionList
        sections={[{ data: videos, title: 'Videos' }]}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <RenderItem item={item} />}
		showsVerticalScrollIndicator={false} 
		
      />
    </View>
  );
};

export default VideoList;
