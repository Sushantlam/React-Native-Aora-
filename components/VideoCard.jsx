import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
// import { ResizeMode, Video } from "expo-av";

const VideoCard = ({ avatar, title, thumbnail, video, creator }) => {
  const [play,setPlay]= useState(false)
  return (
    <View className="flex flex-col gap-2 mb-3 px-4 ">
      <View className="flex justify-between  w-full items-center flex-row">
        <View className="flex justify-center items-center gap-3 flex-row">
          <View className="w-[46px] h-[46px] rounded-lg flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar || "S" }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View>
            <Text className="text-white font-psemibold">
              {title || "Sushant"}
            </Text>

            <Text className="text-gray-200">{creator}</Text>
          </View>
        </View>
        <View>
          <Image
            source={icons?.menu}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </View>
      </View>
      <View className="w-full rounded-xl">
        {play?(
           <Text>playing</Text>
        ): ( <TouchableOpacity
        activeOpacity={0.7}
        className="w-full h-60 relative flex justify-center items-center"
        >
        <Image
        source={{ uri: thumbnail }}
        className=" w-full h-60 rounded-xl"
        resizeMode="cover"
      />
       <Image
        source={icons?.play}
        className=" absolute w-10 h-10"
        resizeMode="contain"
      />
      </TouchableOpacity>)
    
        }
       
      </View>
    </View>
  );
};

export default VideoCard;
