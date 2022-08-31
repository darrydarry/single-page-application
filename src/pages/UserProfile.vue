<template>
  <div v-if="isLoad">
    <div>
      <button @click="() => $router.go(-1)">Вернуться</button>
    </div>

    <div class="title">
      <h1>{{ user.name }}</h1>
    </div>

    <div>
      <input v-model="isAlbums" type="checkbox" name="" id="" />
      <span>Click me</span>
    </div>

    <div v-if="isAlbums" class="photo-wrapp">
      <h2>{{ user.name }} Albums</h2>

      <div class="albums-wrapp">
        <div class="albums-title" v-for="album in albums" :key="album.id">
          <h3>Album's {{ album.title }}</h3>

          <div v-for="photo in album.photos" :key="photo.id">
            <img class="album-img" :src="photo.url" alt="image" />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="users-posts">
      <h2>{{ user.name }} Post</h2>

      <div v-for="post in posts" :key="post.id">
        <p class="latest-posts">{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",

  data() {
    return {
      user: {},
      albums: [],
      posts: [],
      isLoad: false,
      isAlbums: true,
    };
  },

  computed: {
    userId(){
      return this.$route.params.id
    }
  },

  created() {
    const userId = this.userId;
    this.isLoad = false;
    //запрос на 1 пользователя
    const userUrl = "https://jsonplaceholder.typicode.com/users/" + userId;
    fetch(userUrl)
      .then((res) => res.json())
      .then((res) => (this.user = res));

    // запрос альбомов пользователя

    const albumUrl =
      "https://jsonplaceholder.typicode.com/albums?userId=" + userId;
    fetch(albumUrl)
      .then((result) => result.json())
      .then((albums) => {
        this.albums = albums;
        const albumsIds = [];
        for (let i = 0; i < albums.length; i++) {
          albumsIds.push(albums[i].id);
        }
        return albumsIds;
      })
      .then((ids) => {
        //запрос фото по айди альбомов

        const photoUrl =
          "https://jsonplaceholder.typicode.com/photos?albumIds=" + ids;
        fetch(photoUrl)
          .then((res) => res.json())
          .then((photos) => {
            for (let i = 0; i < this.albums.length; i++) {
              for (let j = 0; j < photos.length; j++) {
                if (this.albums[i].id === photos[j].albumId) {
                  if (this.albums[i].photos) {
                    if (this.albums[i].photos.length === 5) {
                      break;
                    }

                    this.albums[i].photos = [
                      ...this.albums[i].photos,
                      photos[j],
                    ];
                  } else {
                    this.albums[i].photos = [photos[j]];
                  }
                }
              }
            }

            this.isLoad = true;
          });
      });

    // запрос постов
    const postsUrl =
      "https://jsonplaceholder.typicode.com/posts?userId=" + userId;
    fetch(postsUrl)
      .then((res) => res.json())
      .then((posts) => (this.posts = posts));
  },
};
</script>

<style lang="scss">
.user-photo {
  width: 200px;
  height: 180px;
}

.album-img {
  height: 100px;
  width: 100px;
}

.albums-wrapp {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.albums-title h3 {
  white-space: nowrap;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.users-posts {
  display: flex;
  flex-direction: column;
}

.latest-posts {
  padding: 20px;
  display: flex;
  box-shadow: 0px 0px 6px 1px rgba(34, 60, 80, 0.2);
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 16px;
  transition-property: padding, font-size;
  transition-duration: 0.3s, 1s;

  &:hover {
    color: #42ab44;
  }
}
</style>