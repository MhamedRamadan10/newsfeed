import React, {Component} from 'react'
import { G } from './../../core/Global'
import Adaptor from './../Adaptor'


export default class Services extends Component {

  static getNews(query, callBack) {
    Adaptor.get(`${G.baseURL}top-headlines${query}`).then(callBack)
  }

}
