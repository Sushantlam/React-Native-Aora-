import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
const TrendinItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const zoomIn = {
    0: {
      scale: 0.9,
    },
    1: {
      scale: 1.1,
    },
  };

  const zoomOut = {
    0: {
      scale: 1,
    },
    1: {
      scale: 0.8,
    },
  };
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item?.video }}
          className="relative w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              console.log(status);

              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative w-52 h-72 flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumnail,
            }}
            className="w-full h-full rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
const Trending = ({ video }) => {
  const [activeItem, setActiveItem] = useState(video[0]);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0]?.key);
    }
  });
  return (
    <FlatList
      data={video}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendinItem
          className="text-3xl text-white"
          activeItem={activeItem}
          item={item}
        />
      )}
      onViewableItemsChanged={viewableItemsChanged.current}
    //   onViewableItemsChanged={viewableItemsChanged}
      horizontal
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
