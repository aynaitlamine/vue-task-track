import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";

const store = createStore({
  state() {
    return {
      tasks: [],
    };
  },
  mutations: {
    FETCH_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task) {
      state.tasks = [...state.tasks, task];
    },

    DELETE_TASK(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    UPDATE_TASK(state, task) {
      state.tasks = state.tasks.map((t) =>
        t.id === task.id ? { ...t, reminder: task.reminder } : t
      );
    },
  },

  actions: {
    async fetchTasks(context) {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      context.commit("FETCH_TASKS", data);
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`);
      const data = await res.json();
      return data;
    },
    async addTask(context, task) {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();
      context.commit("ADD_TASK", data);
    },
    async updateTask(context, id) {
      const taskToToggle = await store.getters.getSingleTask(id);
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
      const res = await fetch(`api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });

      const data = await res.json();
      context.commit("UPDATE_TASK", data);
    },
    async deleteTask(context, id) {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      res.status === 200
        ? context.commit("DELETE_TASK", id)
        : alert("Error deleting task");
    },
  },
  getters: {
    getSingleTask: (state) => (id) => {
      return state.tasks.find((task) => task.id === id);
    },
  },
});

createApp(App).use(store).use(router).mount("#app");
