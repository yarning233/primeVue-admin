<script setup lang="ts">
  import { LinkHTMLAttributes, onMounted } from 'vue'
  import Button from 'primevue/button'
  import { Themes } from './themes'

  onMounted(() => {
    const link = document.createElement('link')
    link.id = 'theme'
    link.type = 'text/css'
    link.href = Themes[0].url
    link.rel = 'stylesheet'

    document.getElementsByTagName('head')[0].appendChild(link)
  })

  const toggleTheme = (url: string) => {
    const link = document.getElementById('theme') as HTMLLinkElement

    link.href = url
  }
</script>

<template>
  <h5>Severities</h5>
  
  <Button v-for="item in Themes" label="Primary" @click="toggleTheme(item.url)" />

</template>

<style scoped>
  button {
    margin-right: 10px;
  }
</style>
