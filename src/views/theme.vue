<script setup lang="ts">
  import Button from 'primevue/button'
  import { Themes } from '@/themes'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const toggleTheme = (url: string) => {
    const link = document.getElementById('theme') as HTMLLinkElement

    link.href = url
  }
</script>

<template>
  <h5>Severities</h5>
  <Button v-for="item in Themes" :label="item.label" @click="toggleTheme(item.url)" />
	<Button @click="router.push('/fullCalendar-public')">fullCalendar官方示例</Button>
	<Button @click="router.push('/fullCalendar-simple')">fullCalendarDemo</Button>
</template>

<style scoped>
  button {
    margin-right: 10px;
  }
</style>
