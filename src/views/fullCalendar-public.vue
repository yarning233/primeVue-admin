<script lang='ts'>
import { defineComponent } from 'vue'
import { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '@/event-utils'
import locale from "@fullcalendar/core/locales/zh-cn"

export default defineComponent({
	components: {
		FullCalendar
	},
	data() {
		return {
			matchList: [
				{
					id: "1",
					title: "第一个任务",
					start: "2023-05-26 13:22:24",
					allDay: true,
					color: "#FECACA",
					textColor: "#6B7280"
				},
				{
					id: "11",
					title: "第二个任务",
					start: "2023-05-26 13:22:24",
					allDay: true,
					color: "#6EE7B7"
				},
				{
					id: "12",
					title: "第三个任务",
					start: "2023-05-26 13:22:24",
					allDay: true,
					color: "#93C5FD"
				},
				{
					id: "13",
					title: "劳动节",
					start: "2023-05-01 00:00:00",
					allDay: true,
					color: "#F59E0B",
					editable: false
				},
				{
					id: "2",
					title: "第二个任务",
					start: "2023-05-27 13:22:24",
					end: "2023-04-27 23:22:24",
					allDay: true,
					color: "#FBCFE8"
				},
				{
					id: "4",
					title: "第三个任务",
					start: "2023-05-28 13:22:24",
					end: "2023-04-28 23:22:24",
					allDay: true,
					color: "#EDE9FE"
				}
			],
			calendarOptions: {
				plugins: [
					dayGridPlugin,
					timeGridPlugin,
					interactionPlugin // needed for dateClick
				],
				headerToolbar: {
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay'
				},
				initialView: 'dayGridMonth',
				initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
				editable: true,
				selectable: true,
				selectMirror: true,
				dayMaxEvents: true,
				weekends: true,
				select: this.handleDateSelect,
				eventClick: this.handleEventClick,
				eventsSet: this.handleEvents,
				/* you can update a remote database when these fire:
				eventAdd:
				eventChange:
				eventRemove:
				*/
				locale: locale
			} as CalendarOptions,
			currentEvents: [] as EventApi[],
		}
	},
	methods: {
		handleWeekendsToggle() {
			this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
		},
		handleDateSelect(selectInfo: DateSelectArg) {
			let title = prompt('Please enter a new title for your event')
			let calendarApi = selectInfo.view.calendar

			calendarApi.unselect() // clear date selection

			if (title) {
				calendarApi.addEvent({
					id: createEventId(),
					title,
					start: selectInfo.startStr,
					end: selectInfo.endStr,
					allDay: selectInfo.allDay
				})
			}
		},
		handleEventClick(clickInfo: EventClickArg) {
			if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
				clickInfo.event.remove()
			}
		},
		handleEvents(events: EventApi[]) {
			this.currentEvents = events
		},
	}
})

</script>

<template>
	<div class='demo-app'>
		<div class='demo-app-sidebar'>
			<div class='demo-app-sidebar-section'>
				<h2>Instructions</h2>
				<ul>
					<li>Select dates and you will be prompted to create a new event</li>
					<li>Drag, drop, and resize events</li>
					<li>Click an event to delete it</li>
				</ul>
			</div>
			<div class='demo-app-sidebar-section'>
				<label>
					<input
						type='checkbox'
						:checked='calendarOptions.weekends'
						@change='handleWeekendsToggle'
					/>
					toggle weekends
				</label>
			</div>
			<div class='demo-app-sidebar-section'>
				<h2>All Events ({{ currentEvents.length }})</h2>
				<ul>
					<li v-for='event in currentEvents' :key='event.id'>
						<b>{{ event.startStr }}</b>
						<i>{{ event.title }}</i>
					</li>
				</ul>
			</div>
		</div>
		<div class='demo-app-main'>
			<FullCalendar
				class='demo-app-calendar'
				:options='calendarOptions'
			>
				<template v-slot:eventContent='arg'>
					<b>{{ arg.timeText }}</b>
					<i>{{ arg.event.title }}</i>
				</template>
			</FullCalendar>
		</div>
	</div>
</template>

<style lang='css'>

h2 {
	margin: 0;
	font-size: 16px;
}

ul {
	margin: 0;
	padding: 0 0 0 1.5em;
}

li {
	margin: 1.5em 0;
	padding: 0;
}

b { /* used for event dates/times */
	margin-right: 3px;
}

.demo-app {
	display: flex;
	min-height: 100%;
	font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
	font-size: 14px;
}

.demo-app-sidebar {
	width: 300px;
	line-height: 1.5;
}

.demo-app-sidebar-section {
	padding: 2em;
}

.demo-app-main {
	flex-grow: 1;
	padding: 3em;
}

.fc { /* the calendar root */
	max-width: 1100px;
	margin: 0 auto;
}

</style>
