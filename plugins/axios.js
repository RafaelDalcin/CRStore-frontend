export default function ({ $axios }, inject) {

  const api = $axios.create()

  api.onRequest(() => {
    const token = localStorage.getItem('crstore-api-token') || '';
    api.setHeader('Authorization', `Bearer ${token}`)
  })

  api.onResponse(resp => resp.data)

  api.setBaseURL('http://localhost:5555')

  inject('api', api)
}