export default function ({ $axios }, inject) {
  
  const token = localStorage.getItem('crstore-api-token') || '';

  const api = $axios.create({
    headers: {
      common: {
        Authorization: `Bearer ${token}`
      }
    }
  })

  api.setBaseURL('http://localhost:5555')

  inject('api', api)
}