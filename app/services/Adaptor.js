import {Component} from 'react'
import axios from 'axios'

export default class Adaptor extends Component {

  // get requests
  static async get(api) {
    return await axios.get(api)
  }

  // post requests
  static async post(api, data) {
    return await axios.post(api, data)
  }

  // put requests
  static async put(api, data) {
    return await axios.put(api, data)
  }

  // patch requests
  static async patch(api, data) {
    return await axios.patch(api, data)
  }

  // delete requests
  static async delete(api) {
    return await axios.delete(api)
  }

}
