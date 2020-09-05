<template>
  <div>
    <div class="startButton" @click="startGame">start</div>
    <li v-for="(message, index) in messages" :key=index>
      {{ message }}
    </li>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import io from 'socket.io-client'


@Component
export default class extends Vue{

  socket = io.connect('http://localhost:8080');  
  startGame() {
    this.socket.emit('send-message', {message: 'aaa'})
    this.socket.on('new-message', (data: any) => {
      this.$store.commit('socket/addMessage', data.message)
    })
  }

  get messages() {
    return this.$store.state.socket.message
  }
 
}
</script>
