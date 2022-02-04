<template>
  <section class="myPage h-100" style="background-color: #eee">
    <div class="container">
      <div class="profile d-flex mt-sm-5 mt-2 flex-column flex-sm-row">
        <div>
          <figure class="d-flex avatar_wrapper m-auto">
            <img class="avatar" :src="user.img" alt="Avatar" />
          </figure>
        </div>

        <div class="ms-sm-2 mt-sm-0 mt-2">
          <h1 class="fw-bold">{{ user.name }}</h1>
          <p>{{ user.profile }}</p>
          <div class="d-flex justify-content-sm-start justify-content-center">
            <a href="https://twitter.com/" target="_blank">
              <i class="fab fa-twitter pe-2"></i>
            </a>
          </div>
        </div>

        <div
          class="d-flex align-items-center ms-sm-auto mx-sm-0 mx-auto mt-sm-0 mt-2"
        >
          <button
            type="button"
            class="btn btn-light"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            ユーザー編集
          </button>
        </div>

        <!-- Modal -->
        <div
          class="modal"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  プロフィールの編集
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div
                  class="d-flex flex-row justify-content-sm-start justify-content-center align-items-center mb-4"
                >
                  <label class="img_edit_wrapper">
                    <input
                      accept="image/jpeg, image/png"
                      type="file"
                      autocomplete="off"
                      tabindex="-1"
                      style="display: none"
                    />
                    <img :src="user.img" class="img_edit" alt="ユーザー画像" />
                    <i
                      class="fas fa-camera img_edit_icon"
                      style="color: #fff"
                    ></i>
                  </label>
                </div>
                <div class="d-flex flex-row align-items-center mb-4">
                  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                  <div class="form-outline flex-fill mb-0">
                    <input
                      v-model="user.name"
                      type="text"
                      id="form3Example1c"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center mb-4">
                  <i class="fas fa-pen fa-lg me-3 fa-fw"></i>
                  <div class="form-outline flex-fill mb-0">
                    <textarea
                      v-model="user.profile"
                      type="text"
                      id="form3Example1c"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="social_links">
                  <p class="text-start">SNSリンク</p>
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fab fa-twitter fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input
                        v-model="user.twitterAccount"
                        type="text"
                        id="form3Example1c"
                        class="form-control"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  キャンセル
                </button>
                <button type="button" class="btn btn-primary">更新する</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Modal -->

      <div class="posts my-5">
        <h3 class="text-start">POST</h3>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          <div class="col" v-for="(post, index) in posts" :key="index">
            <div class="card rounded routerLink">
              <img :src="post.img" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../store'
import { User } from '../model/user'

export default defineComponent({
  name: 'MyPage',
  setup() {
    const store = useStore()
    let user: User = store.state.user

    let posts = [
      {
        img: 'https://cdn.pixabay.com/photo/2021/08/03/20/36/plants-6520443_960_720.jpg'
      },
      {
        img: 'https://cdn.pixabay.com/photo/2022/01/06/06/08/katun-river-6918707_960_720.jpg'
      },
      {
        img: 'https://cdn.pixabay.com/photo/2021/09/12/18/07/robin-6619184_960_720.jpg'
      },
      {
        img: 'https://cdn.pixabay.com/photo/2021/11/21/22/08/british-shorthair-6815375_960_720.jpg'
      }
    ]

    return {
      user,
      posts
    }
  }
})
</script>

<style scoped>
.avatar_wrapper {
  width: 150px;
  height: 150px;
  margin: 0;
  border-radius: 50%;
  border: 4px solid #fff;
}
@media screen and (max-width: 480px) {
  .avatar_wrapper {
    width: 120px;
    height: 120px;
  }
}
.avatar {
  vertical-align: middle;
  width: 95%;
  height: 95%;
  margin: auto;
  border-radius: 50%;
}

.img_edit {
  filter: brightness(50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background-color: rgb(255, 255, 255);
}
.img_edit_wrapper {
  cursor: pointer;
  position: relative;
  width: 144px;
  height: 144px;
  border-radius: 50%;
  border: 3px solid rgb(255, 255, 255);
}
.img_edit_icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
