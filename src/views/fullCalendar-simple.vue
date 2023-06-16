<script setup lang="ts">
	import Button from 'primevue/button'
	import FullCalendar from "@fullcalendar/vue3"
	import locale from "@fullcalendar/core/locales/zh-cn"
	import multiMonthPlugin from '@fullcalendar/multimonth'
	import dayGridPlugin from '@fullcalendar/daygrid'
	import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
	import timeGridPlugin from '@fullcalendar/timegrid'
	import listPlugin from '@fullcalendar/list'

	import { ref, onMounted } from 'vue'

	const fullCalendarRef = ref()
	const eventListItems = ref()
	const dialogVisible = ref<boolean>(false) // 是否可拖拽

	// 日历事件数组
	const matchList = ref([
		{
			id: "1",
			title: "第一个任务",
			start: "2023-05-26 13:22:24",
			allDay: true,
			color: "#FECACA",
			textColor: "#6B7280",
			editable: true
		},
		{
			id: "2",
			title: "第二个任务",
			start: "2023-05-26 13:22:24",
			allDay: true,
			color: "#6EE7B7",
			editable: true
		},
		{
			id: "3",
			title: "第三个任务",
			start: "2023-05-26 13:22:24",
			allDay: true,
			color: "#93C5FD",
			editable: true
		},
		{
			id: "4",
			title: "劳动节",
			start: "2023-05-01 00:00:00",
			allDay: true,
			color: "#F59E0B",
			editable: false,
		},
		{
			id: "5",
			title: "第二个任务",
			start: "2023-05-27 13:22:24",
			end: "2023-04-27 23:22:24",
			allDay: true,
			color: "#FBCFE8",
			editable: true
		},
		{
			id: "6",
			title: "第三个任务",
			start: "2023-05-28 13:22:24",
			end: "2023-04-28 23:22:24",
			allDay: true,
			color: "#EDE9FE",
			editable: true
		},
		{
			id: "7",
			title: "Play Cyberpunk 2077",
			start: "2023-06-15 19:00:00",
			end: "2023-06-24 20:22:24",
			allDay: false,
			color: "#93C5FD",
			editable: true
		},
		{
			id: "8",
			title: "Play Gwent Card",
			start: "2023-06-15 20:00:00",
			end: "2023-06-24 21:22:24",
			allDay: false,
			color: "#f100e5",
			editable: true
		},
		{
			id: "9",
			title: "Play The Witcher 3",
			start: "2023-06-15 22:00:00",
			end: "2023-06-24 23:22:24",
			allDay: false,
			color: "#3ac569",
			editable: true
		}
	])

	// 外部事件数组
	const planList = ref([
		{
			planId: 10,
			colorClass: 'darkcyan',
			color: 'darkcyan',
			planName: 'Study Vue3 Course'
		},{
			planId: 11,
			colorClass: 'darkblue',
			color: 'darkblue',
			planName: 'Study TypeScript Course'
		}
	])

	// 点击某一日触发
	const handleDateClick = arg => {
		console.log(`data click ${arg.dateStr}`)
	}

	// 获取calendar实例
	const getCalendarApi = () => {
		return fullCalendarRef!.value.getApi()
	}

	// 动态设置calendar配置
	const updateCalendarOptions = option => {
		const calendarApi = getCalendarApi()

		calendarApi.setOption('events', option)
	}

	// 外部拖拽事件触发
	const dropItem = info => {
		const obj = {
			id: info.draggedEl.id,
			title: info.draggedEl.firstChild.innerHTML,
			start: info.dateStr,
			allDay: true,
			color: info.draggedEl.firstChild.id,
			editable: true
		}
		matchList.value.push(obj)
	}

	// 内部事件拖拽设置日期触发
	const handleEventChange = info => {
		const { event, oldEvent } = info
		const { id: oldId } = oldEvent
		const { id, title, start, end, allDay, backgroundColor: color, durationEditable: editable } = event

		matchList.value.map((item, key) => {
			if (item.id === oldId) {
				matchList.value[key] = {
					id, title, start, end, allDay, color, editable
				}
			}
		})

		console.log('handleEventChange!!!')
	}

	// 日历配置项
	const calendarOptions = ref({
		plugins: [multiMonthPlugin, dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin], // 需要加载的插件
		multiMonthMaxColumns: 2, // 多月显示时最多几个月一行
		initialView: 'dayGridMonth', // 初始视图
		selectable: true,
		editable: true,
		droppable: true,
		dropAccept: ".eventListItems", //可被拖进的元素 css 选择器
		dayMaxEventRows: 2.0, //事件最大展示列数
		drop: dropItem, //外部拖拽进的事件方法
		handleWindowResize: true,
		windowResizeDelay: 100,
		aspectRatio: 2, //宽高比
		dateClick: handleDateClick, // 点击日历单元格触发
		events: matchList.value, // 绑定展示事件内容
		eventClick: info => {
			console.log(info);
			dialogVisible.value = true;
		}, //事件的点击回调
		eventChange: handleEventChange, // 拖拽设置截至日期的回调
		select: selectionInfo  => {
			console.log(selectionInfo)
		}, // 选择日期回调
		locale, // 显示语言
		weekends: true, // 周末开关
		headerToolbar: {
			left: 'prevYear,prev,next,nextYear today',
			center: 'title',
			right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listDay'
		}, // 日历上方的按钮
	})

	// 动态设置是否显示周末
	const toggleWeekends = () => calendarOptions.value.weekends = !calendarOptions.value.weekends

	// 进入页面就设置外部事件可以拖拽到日历，并约定css选择器
	onMounted(() => {
		new Draggable(eventListItems.value, {
			itemSelector: ".eventListItems"
		})
	})
</script>

<template>
	<div class="flex align-center justify-between mt-10 mr-5">
		<div
			class="h-[350px] space-y-2 mr-5 ml-5"
			id="eventListItems"
			ref="eventListItems"
		>
			<Button @click="toggleWeekends">
				{{ calendarOptions.weekends ? '不显示周末' : '全部显示'}}
			</Button>

			<div
				v-for="(item,index) in planList"
				class="rounded p-1 text-white pl-2 eventListItems"
				:class="item.colorClass"
				:draggable="true"
				:key="index"
				:id="item.planId"
				:style="{background: item.colorClass}"
			>
				<span :id="item.color">{{ item.planName }}</span>
			</div>
		</div>
		<div class="flex-1">
			<FullCalendar :options="calendarOptions" ref="fullCalendarRef" />
		</div>
	</div>
</template>
