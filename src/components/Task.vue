<template>
  <div
    @dblclick="toggleReminder(task.id)"
    :class="[task.reminder ? 'task reminder' : 'task']"
  >
    <h3>
      {{ task.text }}
      <i @click="deleteTask(task.id)" class="fas fa-times"></i>
    </h3>
    <p>{{ task.day }}</p>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: Object,
  },

  methods: {
    async deleteTask(id) {
      this.$store.dispatch("deleteTask", id);
    },
    async toggleReminder(id) {
      this.$store.dispatch("updateTask", id);
    },
  },
};
</script>

<style scope>
.fas {
  color: #ef476f;
}

.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.task.reminder {
  border-left: 5px solid #06d6a0;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
