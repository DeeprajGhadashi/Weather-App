import { Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Image } from "react-native";
import { theme, themes } from '../theme';
import { CalendarDaysIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { StatusBar } from 'expo-status-bar';
import { MapPinIcon } from 'react-native-heroicons/solid'
import { debounce } from 'lodash'
import { fetchLocations, fetchWetherForecast } from '../api/weather';
import { weatherImages } from '../constants';
import * as Progress from 'react-native-progress';

function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLocation = (loc) => {
    //console.log('location:', loc);
    setLocations([]);
    setLoading(true);
    toggleSearch(false);
    fetchWetherForecast({
      cityName: loc.name,
      days: '7'
    }).then(data => {
      setWeather(data);
      setLoading(false);
     // console.log('got forcast:', data);
    })
  }

  const handleSearch = value => {
    //fetch locations
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then(data => {
        setLocations(data);
      })
    }
  }

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    fetchWetherForecast({
      cityName: 'Pune',
      days: '7'
    }).then(data => {
      setWeather(data);
      setLoading(false); // loading complete then fatch data
    })
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  return (
    <View className='flex-1 relative'>
      <StatusBar style='light' />
      <Image blurRadius={70} className='h-full w-full absolute'
        source={require('../assets/images/background.png')} />
      {
        loading ? (
          <View className='flex-1 flex-row justify-center items-center'>
           <Text className='text-cyan text-4xl'>Loading...</Text>
          </View>
        ): (
            <SafeAreaView className = "flex flex-1 pt-14 ">
              {/*Search Section */ }
             <View style={{ height: '7%' }} className="mx-4 relative z-50 ">
        <View className="flex-row  justify-end items-center rounded-full"
          style={{ backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' }}>
          {
            showSearch ? (
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder='Search City '
                placeholderTextColor={'lightgray'}
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
                let showBorder = index + 1 != locations.length;
                let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : ''
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className={'flex-row items-center border-0 p-3 px-4 mb-1 ' + borderClass}>
                    {/* Display the location data */}
                    <MapPinIcon size='20' color='gray' />
                    <Text className='text-black text-lg ml-2'>{loc?.name},{loc?.country}</Text>
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
          {location?.name}, {''}
          <Text className='text-gray-300 text-lg font-bold'>
            {location?.country}
          </Text>
        </Text>
        {/*wether Image */}
        <View className="flex-row justify-center ">
          <Image
            source={weatherImages[current?.condition?.text]}
            // source={require('../assets/images/partlycloudy.png')}
            className='w-52 h-52 rounded-xl'>
          </Image>
        </View>
        {/*Degree celcius */}
        <View className='space-y-2'>
          <Text className='text-center font-bold text-black text-4xl ml-5'>
            {current?.temp_c}&#176;
          </Text>
          <Text className='text-center text-black text-xl tracking-widest'>
            {current?.condition?.text}
          </Text>
        </View>
        {/*Other stats*/}
        <View className='flex-row justify-between w-full rounded-xl py-3 space-y-2 bg-gray-200'>
          <View className='flex-row space-x-2 items-center'>
            <Image
              source={require('../assets/images/wind.png')}
              className='h-6 w-6 ml-1' />
            <Text className='text-black font-semibold text-base'>
              {current?.wind_kph} kph
            </Text>
          </View>
          <View className='flex-row space-x-2 items-center'>
            <Image source={require('../assets/images/drop.png')}
              className='h-6 w-6' />
            <Text className='text-black font-semibold text-base'>
              {current?.humidity}%
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
             </View>
             {/*forecast for next day*/}
             <View className='mb-2 space-y-3'>
        <View className='flex-row items-center mx-5 space-x-2 '>
          <CalendarDaysIcon size='22' color='black' />
          <Text className='text-black text-base'>Daily Forecast</Text>
        </View>
        <ScrollView
          horizontal contentContainerStyle={{ paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}>
          {
            weather?.forecast?.forecastday?.map((item, index) => {
              let date = new Date(item.date);
              let options = { weekday: 'long' };
              let dayName = date.toLocaleDateString('en-US', options);
              dayName = dayName.split(',')[0]
              return (
                <View
                  key={index}
                  className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-3  bg-sky-300 mr-3'>
                  <Image source={weatherImages[current?.condition?.text]}
                    //source={require('../assets/images/heavyrain.png')} 
                    className='h-12 w-12 rounded-3xl' />
                  <Text className='text-white'>{dayName}</Text>
                  <Text className='text-white text-xl font-semibold'> {item?.day?.avgtemp_c}&#176;</Text>
                </View>
              )
            })
          }
        </ScrollView>
             </View>
            </SafeAreaView>
          )
        }
    
    </View >

  )
}

export default HomeScreen