import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { image, images } from "../../constants";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { currentAccount, login } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const signin = () => {
  const [field, setField] = useState({
    email: "",
    password: "",
  });
const {setIsUser, setIsLoggedIn}= useGlobalContext()
  const [isSumbiting, setIsSumbiting] = useState(false);
  const handleLogin = async () => {
    if (field.email === "" || field.password === "" ) {
      Alert.alert("Error", "Please fill in all fields");
    }
    setIsSumbiting(true);
    try {
      await login(field.email,field.password );
      const result = await currentAccount()
      setIsUser(result)
       router.replace("/home");

    } catch (error) {
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
          <Text className="text-3xl text-white font-psemibold mt-5">Login</Text>

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

          <CustomButton title="Sign in" containerStyles="mt-7" handlePress={handleLogin}/>
          <Text className="text-lg font-psemibold text-gray-100 mt-7 text-center">Don't have account?{""}
            <Link href="/signup"  className="text-lg font-psemibold text-secondary"> Signup</Link>
            </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signin;
