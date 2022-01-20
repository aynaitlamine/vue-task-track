<template>
  <AddTask v-if="showAddTask" />
  <Tasks :tasks="$store.state.tasks" />
</template>

<script>
import AddTask from "../components/AddTask.vue";
import Tasks from "../components/Tasks.vue";
export default {
  name: "Home",
  components: {
    AddTask,
    Tasks,
  },
  props: {
    showAddTask: Boolean,
  },

  async created() {
    this.$store.dispatch("fetchTasks");
  },
};
</script>
