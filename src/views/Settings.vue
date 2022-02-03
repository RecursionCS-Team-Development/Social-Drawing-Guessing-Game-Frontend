<template>
  <section
    class="settings py-5 justify-content-start"
    style="background-color: #eee"
  >
    <div class="container">
      <div
        class="row d-flex justify-content-md-around align-items-md-start align-items-center flex-md-row flex-column"
      >
        <div
          class="col-md-3 col-10 py-2 px-0 rounded"
          style="background-color: #fff"
        >
          <ul class="list-group">
            <li
              v-for="(sidebarItem, index) in sidebarItems"
              :key="index"
              :aria-disabled="sidebarItem.ariaDisabled"
              class="list-group-item list-group-item-action border-0 rounded-0"
              :class="{ active: sidebarItem.isActive }"
              @click="changeItem(sidebarItem)"
              style="cursor: pointer"
            >
              {{ sidebarItem.name }}
            </li>
          </ul>
        </div>

        <div
          class="content col-md-8 col-10 mt-md-0 mt-4 rounded"
          style="background-color: #fff"
        >
          <div class="">
            <form class="m-md-5 m-3">
              <div
                v-for="(contentsItem, index) in contentsItems"
                :key="index"
                class="mb-4"
              >
                <label
                  class="form-label d-flex justify-content-start"
                  :for="contentsItem.id"
                  >{{ contentsItem.label }}</label
                >
                <input
                  :value="user[contentsItem.model]"
                  :type="contentsItem.type"
                  :id="contentsItem.id"
                  autocomplete="off"
                  class="form-control"
                />
              </div>

              <div class="mt-3">
                <button class="btn btn-primary" type="submit">更新する</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '../store'
import { User } from '../model/user'

interface SidebarItem {
  name: string
  isActive: boolean
  ariaDisabled: boolean
}

interface ContentsItem {
  label: string
  type: string
  id: string
  model: string
}

export default defineComponent({
  name: 'Settings',
  setup() {
    const store = useStore()
    let user: User = store.state.user

    let sidebarItems = ref([
      {
        name: 'メールアドレス',
        isActive: true,
        ariaDisabled: true
      } as SidebarItem,
      {
        name: 'パスワード',
        isActive: false,
        ariaDisabled: false
      } as SidebarItem
    ])

    let contentsMailItems = [
      {
        label: 'メールアドレス',
        type: 'email',
        id: 'mail',
        model: 'mail'
      } as ContentsItem
    ]

    let contentsPasswordItems = [
      {
        label: '現在のパスワード',
        type: 'password',
        id: 'currPassword',
        model: 'password'
      } as ContentsItem,
      {
        label: '新しいパスワード',
        type: 'password',
        id: 'newPassword',
        model: ''
      } as ContentsItem,
      {
        label: '新しいパスワード(確認)',
        type: 'password',
        id: 'confirmPassword',
        model: ''
      } as ContentsItem
    ]

    let contentsItems = ref(contentsMailItems)

    const changeItem = (item: SidebarItem) => {
      for (let val of sidebarItems.value) {
        val.isActive = val === item
        val.ariaDisabled = val === item
      }

      if (item.name === 'メールアドレス') {
        contentsItems.value = contentsMailItems
      } else contentsItems.value = contentsPasswordItems
    }

    return {
      user,
      sidebarItems,
      contentsItems,
      contentsMailItems,
      contentsPasswordItems,
      changeItem
    }
  }
})
</script>

<style></style>
