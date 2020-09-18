import axios from 'axios'
import 'lib-flexible'
// const baseUrl = "http://101.7.187.58:8080/data.json"
const baseUrl="http://localhost:3000/data.json"
// const baseUrl="http://192.168.1.105:3000/data.json"
export const getInfo = () => {
  return new Promise((resolve, reject) => {
    axios.get(baseUrl)
      .then(res => {
        if(res.status===200){
          resolve(res)
        }else{
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}