import { Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { View, Image } from "react-native";
import { theme, themes } from '../theme';
import { CalendarDaysIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { StatusBar } from 'expo-status-bar';
import {MapPinIcon} from 'react-native-heroicons/solid'

function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);
  
  const handleLocation = (loc) => {
    console.log('location:' , loc);
  }

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
                      onPress={()=> handleLocation()}
                      key={index}
                      className= {'flex-row items-center border-0 p-3 px-4 mb-1 ' +borderClass }>
                      {/* Display the location data */}
                      <MapPinIcon size='20' color='gray' />
                      <Text className='text-black text-lg ml-2'>London, United Kingdom</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            ) : null
          }
        </View>
        {/* Forecast Section */}
        <View className='mx-4 flex justify-around flex-1 mb-2'>
           {/* Location */}
           <Text className='text-white text-center text-2xl font-bold'>
            London,
            <Text className='text-gray-300 text-lg font-bold'>
            United Kingdom
           </Text>
           </Text>
           {/*wether Image */}
           <View className="flex-row justify-center">
            <Image  source={require('../assets/images/sun.png')}
            className='w-52 h-52 '>
            </Image> 
           </View>
           {/*Degree celcius */}
           <View className='space-y-2'>
            <Text className='text-center font-bold text-black text-4xl ml-5'>
             23&#176;
            </Text>
            <Text className='text-center text-black text-xl tracking-widest'>
             partly cloudy
            </Text>
           </View>
          {/*Other stats*/}
          <View className='flex-row justify-between w-full rounded-xl py-3 space-y-2 bg-gray-200'>
            <View className='flex-row space-x-2 items-center'>
              <Image source={require('../assets/images/wind.png')} 
              className='h-6 w-6 ml-1' />
              <Text className='text-black font-semibold text-base'>
               22Km
              </Text>
            </View>
            <View className='flex-row space-x-2 items-center'>
              <Image source={require('../assets/images/drop.png')} 
              className='h-6 w-6' />
              <Text className='text-black font-semibold text-base'>
               23%
              </Text>
            </View>
            <View className='flex-row space-x-2 items-center'>
              <Image source={require('../assets/images/sunrise.png')} 
              className='h-6 w-6 ' />
              <Text className='text-black font-semibold text-base mr-1'>
               6:05 AM
              </Text>
            </View>
          </View>
        {/*forecast for next day*/}
          <View className='mb-2 space-y-3'>
            <View className='flex-row items-center mx-5 space-x-2 '>
              <CalendarDaysIcon size='22' color='black'/>
              <Text className='text-black text-base'>Daily Forecast</Text>
            </View>
            <ScrollView
            horizontal contentContainerStyle={{paddingHorizontal:10}}
            showsHorizontalScrollIndicator={false}>
             <View
              className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-3 bg-sky-300 mr-3'>
              <Image source={require('../assets/images/heavyrain.png')} 
              className='h-11 w-11' />
              <Text className='text-white'>Monday</Text>
              <Text className='text-white text-xl font-semibold'> 23&#176;</Text>
             </View>
             <View
              className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-3 bg-sky-300 mr-3'>
              <Image source={require('../assets/images/heavyrain.png')} 
              className='h-11 w-11' />
              <Text className='text-white'>Tuesday</Text>
              <Text className='text-white text-xl font-semibold'> 23&#176;</Text>
             </View>
             <View
              className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-3 bg-sky-300 mr-3'>
              <Image source={require('../assets/images/heavyrain.png')} 
              className='h-11 w-11' />
              <Text className='text-white'>Wednesday</Text>
              <Text className='text-white text-xl font-semibold'> 23&#176;</Text>
             </View>
             <View
              className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-3 bg-sky-300 mr-3'>
              <Image source={require('../assets/images/heavyrain.png')} 
              className='h-11 w-11' />
              <Text className='text-white'>Thursday</Text>
              <Text className='text-white text-xl font-semibold'> 23&#176;</Text>
             </View>
             <View
              className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-3 bg-sky-300 mr-3'>
              <Image source={require('../assets/images/heavyrain.png')} 
              className='h-11 w-11' />
              <Text className='text-white'>Friday</Text>
              <Text className='text-white text-xl font-semibold'> 23&#176;</Text>
             </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>

  )
}

export default HomeScreen