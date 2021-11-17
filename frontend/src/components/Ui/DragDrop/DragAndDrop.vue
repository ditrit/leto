<template>
	<div>
		<div class="row wrap justify-around q-px-md q-pt-md">
			<ul
				v-mutation="handler1"
				@dragenter="onDragEnter"
				@dragleave="onDragLeave"
				@dragover="onDragOver"
				@drop="onDrop"
				class="drop-target rounded-borders overflow-hidden"
			>
				<li
					v-for="item in childs"
					:key="item.id"
					draggable="true"
					@dragstart="onDragStart"
					:class="item.class"
					:id="item.id"
				/>
			</ul>

			<div
				v-mutation="handler2"
				@dragenter="onDragEnter"
				@dragleave="onDragLeave"
				@dragover="onDragOver"
				@drop="onDrop"
				class="drop-target rounded-borders overflow-hidden"
			/>
		</div>

		<!-- <div class="row justify-around items-start">
			<div class="col row justify-center q-pa-md">
				<div class="text-subtitle1">Mutation Info</div>
				<div v-for="status in status1" :key="status">
					{{ status }}
				</div>
			</div>

			<div class="col row justify-center q-pa-md">
				<div class="text-subtitle1">Mutation Info</div>
				<div v-for="status in status2" :key="status">
					{{ status }}
				</div>
			</div>
		</div> -->
	</div>
</template>
<script>
import { ref } from "vue";
export default {
	props: {
		childItems: {
			type: Array,
		},
	},
	setup() {
		const status1 = ref([]);
		const status2 = ref([]);
		const childs = ref([
			{ id: "box1", class: "box navy", label: "Box One" },
			{ id: "box2", class: "box orange", label: "Box Two" },
			{ id: "box3", class: "box green", label: "Box Three" },
			{ id: "box4", class: "box navy", label: "Box Four" },
			{ id: "box5", class: "box orange", label: "Box Five" },
			{ id: "box6", class: "box green", label: "Box Six" },
			{ id: "box7", class: "box orange", label: "Box Seven" },
			{ id: "box8", class: "box green", label: "Box Eigth" },
		]);

		return {
			status1,
			status2,
			childs,

			handler1(mutationRecords) {
				status1.value = [];
				for (const index in mutationRecords) {
					const record = mutationRecords[index];
					const info = `type: ${record.type}, nodes added: ${
						record.addedNodes.length > 0 ? "true" : "false"
					}, nodes removed: ${
						record.removedNodes.length > 0 ? "true" : "false"
					}, oldValue: ${record.oldValue}`;
					status1.value.push(info);
				}
			},

			handler2(mutationRecords) {
				status2.value = [];
				for (const index in mutationRecords) {
					const record = mutationRecords[index];
					const info = `type: ${record.type}, nodes added: ${
						record.addedNodes.length > 0 ? "true" : "false"
					}, nodes removed: ${
						record.removedNodes.length > 0 ? "true" : "false"
					}, oldValue: ${record.oldValue}`;
					status2.value.push(info);
				}
			},

			// store the id of the draggable element
			onDragStart(e) {
				e.dataTransfer.setData("text", e.target.id);
				e.dataTransfer.dropEffect = "move";
			},

			onDragEnter(e) {
				// don't drop on other draggables
				if (e.target.draggable !== true) {
					e.target.classList.add("drag-enter");
				}
			},

			onDragLeave(e) {
				e.target.classList.remove("drag-enter");
			},

			onDragOver(e) {
				e.preventDefault();
			},

			onDrop(e) {
				e.preventDefault();

				// don't drop on other draggables
				if (e.target.draggable === true) {
					return;
				}

				const draggedId = e.dataTransfer.getData("text");
				const draggedEl = document.getElementById(draggedId);

				// check if original parent node
				if (draggedEl.parentNode === e.target) {
					e.target.classList.remove("drag-enter");
					return;
				}

				// make the exchange
				draggedEl.parentNode.removeChild(draggedEl);
				e.target.appendChild(draggedEl);
				e.target.classList.remove("drag-enter");
			},
		};
	},
};
</script>
<style scoped lang="sass">
.drop-target
  height: 400px
  width: 200px
  min-width: 200px
  background-color: gainsboro

.drag-enter
  outline-style: dashed

.box
  width: 100px
  height: 100px
  float: left
  cursor: pointer

@media only screen and (max-width: 500px)
  .drop-target
    height: 200px
    width: 100px
    min-width: 100px
    background-color: gainsboro

  .box
    width: 50px
    height: 50px

.box:nth-child(3)
  clear: both

.navy
  background-color: navy

.red
  background-color: firebrick

.green
  background-color: darkgreen

.orange
  background-color: orange
</style>
