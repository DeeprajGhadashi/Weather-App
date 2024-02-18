import { Text, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { View, Image } from "react-native";
import { theme } from '../theme';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import { StatusBar } from 'expo-status-bar';

function HomeScreen() {
    const [ showSearch, toggleSearch] = useState(false);
  return (
    <View className='flex-1 relative'>
    <StatusBar style='light'/>
    <Image blurRadius={70} className='h-full w-full absolute'
     source={require('../assets/images/background.png')} />
     
    <SafeAreaView className="flex flex-1 pt-14 ">
      {/*Search Section */}
      <View style={{height:'7%'}} className="mx-4 relative z-50 ">
        <View className="flex-row  justify-end items-center rounded-full" 
              style={{backgroundColor: showSearch? theme.bgWhite(0.2): 'transparent'}}>
                {
                    showSearch? (
                        <TextInput placeholder='Search City ' placeholderTextColor={'lightgray'}
                        className="pl-6 h-10 pb-1 flex-1 text-base text-white"/>
                    ):null
                }
         
          <TouchableOpacity 
          onPress={() => toggleSearch(!showSearch)}
          style={{backgroundColor: theme.bgWhite(0.3)}}
           className="rounded-full p-2 m-1 ">
           <MagnifyingGlassIcon size='25' color='white' />
          </TouchableOpacity>
        </View>

      </View> 
    </SafeAreaView>
   </View>

  )
}

export default HomeScreen