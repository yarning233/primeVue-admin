import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Theme',
			component: () => import('@/views/theme.vue') // 需要配置tsconfig中的paths
		},
		{
			path: '/fullCalendar-public',
			name: 'FullCalendarPublic',
			component: () => import('@/views/fullCalendar-public.vue')
		},
		{
			path: '/fullCalendar-simple',
			name: 'FullCalendarSimple',
			component: () => import('@/views/fullCalendar-simple.vue')
		}
	]
})

export default router
