import React from 'react';
import { Dimensions } from 'react-native'


export class G {

  static H = Dimensions.get('window').height
  static W = Dimensions.get('window').width

  static baseURL = `https://newsapi.org/v2/`
  // static baseURL = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=`
  static apiKey = '2e89225fbca0414384a1b000abe514cd'

  static baseColor = '#0e69b4'
  static baseColor2 = '#2d89ce'

}
