<template>
  <div>
    <div class="title">
      <h1>List of users</h1>
    </div>

    <div class="users-list" @click="onClickUser">
      <div
        v-for="user in users"
        :key="user.id"
        class="user-item"
        :data-user-id="user.id"
      >
        {{ user.id + ". " + user.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsersList",
  data() {
    return {
      users: [],
    };
  },
  created() {
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((res) => res.json())
      .then((res) => (this.users = res));
  },
  methods: {
    onClickUser(ev) {
      const target = ev.target;

      if (!target.classList.contains("user-item")) {
        return;
      }
      const userId = target.getAttribute("data-user-id");
      console.log(userId);
      this.$router.push({ name: "profile",params: { id: userId } });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  padding: 20px;
}

.user-item {
  padding: 20px;
  display: flex;
  box-shadow: 0px 0px 6px 1px rgba(34, 60, 80, 0.2);
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 16px;
  transition-property: padding, font-size;
  transition-duration: 0.3s, 1s;

  &:hover {
    padding-left: 25px;
    color: #42ab44;
    font-size: 18px;
  }
}
</style>
