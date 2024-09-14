import { View, Text, TextInput, Touchable, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const SearchInput= ({title, handleChangeText, value, otherStyles, placeholder,...props}) => {
    const [showpassword, setShowPassword] = useState(false)
  return (
    <View className={` ${otherStyles}`}>
      <Text className="text-gray-100 text-base font-pmedium">{title}</Text>
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-red-200 focus:border-secondary flex flex-row items-center">
      <TextInput
        onChangeText={handleChangeText}
        className="text-white flex-1 font-semibold"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        secureTextEntry={title==="Password" && !showpassword}
        />
        {title==="Password" && (
            <TouchableOpacity onPress={()=>setShowPassword(!showpassword)}>
                <Image source={!showpassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain' />
                </TouchableOpacity>
            
        )}

      </View>
    </View>
  )
}

export default SearchInput