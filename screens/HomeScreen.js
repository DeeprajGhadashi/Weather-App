import { Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { View, Image } from "react-native";
import { theme } from '../theme';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { StatusBar } from 'expo-status-bar';
import {MapPinIcon} from 'react-native-heroicons/solid'

function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);
  return (
    <View className='flex-1 relative'>
      <StatusBar style='light' />
      <Image blurRadius={70} className='h-full w-full absolute'
        source={require('../assets/images/background.png')} />

      <SafeAreaView className="flex flex-1 pt-14 ">
        {/*Search Section */}
        <View style={{ height: '7%' }} className="mx-4 relative z-50 ">
          <View className="flex-row  justify-end items-center rounded-full"
            style={{ backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' }}>
            {
              showSearch ? (
                <TextInput placeholder='Search City ' placeholderTextColor={'lightgray'}
                  className="pl-6 h-10 pb-1 flex-1 text-base text-white" />
              ) : null
            }

            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-2 m-1 ">
              <MagnifyingGlassIcon size='25' color='white' />
            </TouchableOpacity>
          </View>

          {
            locations.length > 0 && showSearch ? (
              <View className='absolute w-full bg-gray-300 top-16 rounded-3xl'>
                {locations.map((loc, index) => {
                  let showBorder = index+1 != locations.length;
                  let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : ''
                  return (
                    <TouchableOpacity
                      key={index}
                      className= {'flex-row items-center border-0 p-3 px-4 mb-1 ' +borderClass }>
                      {/* Display the location data */}
                      <MapPinIcon size='20' color='gray' />
                      <Text>London, United Kingdom</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            ) : null
          }
        </View>
      </SafeAreaView>
    </View>

  )
}

export default HomeScreen