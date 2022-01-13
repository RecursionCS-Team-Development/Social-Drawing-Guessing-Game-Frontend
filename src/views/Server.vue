<template>
  <section class="server h-100 mt-3 mt-md-0" style="background-color: #fff">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <div class="col" v-for="(card, index) in cards" :key="index">
          <router-link
            :to="card.link"
            tag="div"
            class="card rounded routerLink"
          >
            <div
              class="card-body d-flex justify-content-around align-items-center d-sm-block"
            >
              <h5 class="card-title">{{ card.name }}</h5>
              <p class="card-text text-end mt-sm-5">
                {{ card.now }} / {{ card.max }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Server',
  components: {},
  setup() {
    let cards = [
      {
        name: 'ロビー1',
        max: 6,
        now: 6,
        link: '/room'
      },
      {
        name: 'ロビー2',
        max: 6,
        now: 1,
        link: '/room'
      },
      {
        name: 'ロビー3',
        max: 6,
        now: 3,
        link: '/room'
      },
      {
        name: 'ロビー4',
        max: 6,
        now: 1,
        link: '/room'
      },
      {
        name: 'ロビー5',
        max: 6,
        now: 2,
        link: '/room'
      },
      {
        name: 'ロビー6',
        max: 6,
        now: 0,
        link: '/room'
      }
    ]

    return {
      cards
    }
  }
})
</script>

<style>
.routerLink {
  text-decoration: none;
  color: #000;
}
</style>
