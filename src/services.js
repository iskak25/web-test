import Endpoints from './api/Endpoints'
import axios from 'axios'

export class Services {
  static async GetState() {
    return await axios.get(`${Endpoints.BASE_URL}`, {
      headers: {
        'Content-type': 'application/json',
      },
    })
  }
}
