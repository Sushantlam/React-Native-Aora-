import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyContent = ({title,subTitle}) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{subTitle}</Text>
      <CustomButton title="Create Videos" handlePress={()=>router.push("/create")}/>
    </View>
  )
}

export default EmptyContent