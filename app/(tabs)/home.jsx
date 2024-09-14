import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyContent from "../../components/EmptyContent";
import { getAllVideos, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppWrite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: post, refetch } = useAppwrite(getAllVideos);
  const { data: video } = useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    //it will fetch he data from backend
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={post}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            className="text-3xl text-white"
            title={item.title}
            thumbnail={item.thumnail}
            video={item.video}
            creator={item?.users?.username}
            avatar={item?.users?.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className=" flex my-6 px-4 space-y-3">
            <View className="flex justify-between items-start flex-row">
              <View>
                <Text className=" font-pregular text-gray-100">Welcome</Text>
                <Text className="font-pbold text-white">Sushant Lama</Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View>
              <Text className=" text-2xl text-white font-pmedium">
                Latest Videos
              </Text>
              <Trending video={video} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyContent
            title="No videos found"
            subTitle="Be the first one to upload the videos"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
