import io from 'socket.io-client'

var socket = io.connect('http://0.0.0.0:8080')

export const state = () => ({
  message: []
})

export const mutations = {
  addMessage(state: any, message: any) {
    state.message.push(message)
  }
}


