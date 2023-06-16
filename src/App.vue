<template>
	<router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { Themes } from "@/themes"

onMounted(() => {
	const link = document.createElement('link')
	link.id = 'theme'
	link.type = 'text/css'
	link.href = Themes[0].url
	link.rel = 'stylesheet'

	document.getElementsByTagName('head')[0].appendChild(link)
})
</script>

<style scoped>

</style>
