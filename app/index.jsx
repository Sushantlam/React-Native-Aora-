import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
   const {isLoggedin, isLoading} = useGlobalContext()
   if(isLoggedin) return(<Redirect href="/home"/>)
   
  return (
    <SafeAreaView className="bg-primary h-full">
      {/* scroll view vaneko chae that can store multiple component which is view*/}
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full w-full px-4  justify-center items-center">
          <Image
            source={images.logo}
            className="w-[150px] h-[150px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="nax-w-[350px] w-full h-[350px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-center text-3xl text-white font-bold">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[135px] h-[20px] absolute -bottom-4 -right-9"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm text-gray-100 mt-7 font-pregular text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton 
          title="Continue with your email"
          handlePress={()=>router.push("/signup")}
          containerStyles= "w-full mt-7"
          />          
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
