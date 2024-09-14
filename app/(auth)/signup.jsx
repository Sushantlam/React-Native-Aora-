import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { image, images } from "../../constants";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const signup = () => {
  const [field, setField] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSumbiting, setIsSumbiting] = useState(false);
  const handleLogin = async () => {
    if (field.email === "" || field.password === "" || field.username === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setIsSumbiting(true);
    try {
      const user = await createUser(
        field.email,
        field.password,
        field.username
      );
      console.log("user", user);
      if (user) {
        router.replace("/home");
      }
    } catch (error) {
      console.log("error", error);
      
      Alert.alert("Error", error.message);
    } finally {
      setIsSumbiting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[60px]"
            resizeMode="contain"
          />
          <Text className="text-3xl text-white font-psemibold mt-5">
            Signup
          </Text>
          <Formfield
            title="Username"
            value={field.username}
            handleChangeText={(e) => setField({ ...field, username: e })}
            otherStyles="mt-7"
          />
          <Formfield
            title="Email"
            value={field.email}
            handleChangeText={(e) => setField({ ...field, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <Formfield
            title="Password"
            value={field.password}
            handleChangeText={(e) => setField({ ...field, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign up"
            containerStyles="mt-7"
            handlePress={handleLogin}
          />

          <Text className="text-lg font-psemibold text-gray-100 mt-7 text-center">
            Already have account?
            <Link
              href="/signin"
              className="text-lg font-psemibold text-secondary"
            >
              Signin
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signup;
