<template>
  <section class="signIn h-100" style="background-color: #eee">
    <div class="container h-100">
      <div
        class="row d-flex justify-content-center align-items-center h-100 my-4"
      >
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    新規登録
                  </p>

                  <form class="mx-1 mx-md-4">
                    <InputText
                      v-for="(ele, index) in inputs"
                      :props="ele"
                      :key="index"
                    />

                    <div class="form-check d-flex justify-content-center mb-5">
                      <input
                        class="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3c"
                      />
                      <label class="form-check-label" for="form2Example3">
                        <a href="#!">利用規約</a>の全ての記載事項に同意します
                      </label>
                    </div>

                    <div class="text-center mb-3 mb-lg-4">
                      <ConfirmButton :text="confirmText" />

                      <div class="mt-5">
                        <p class="small fw-bold mt-2 pt-1 mb-0 text-end">
                          ログインは<router-link aria-current="page" to="/login"
                            >こちら</router-link
                          >
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    class="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputText from './../components/common/InputText.vue'
import ConfirmButton from './../components/common/ConfirmButton.vue'

export default defineComponent({
  name: 'SignIn',
  components: {
    InputText,
    ConfirmButton
  },
  setup() {
    const inputs: { icon: string; inputType: string; placeholder: string }[] = [
      {
        icon: 'fa-user',
        inputType: 'text',
        placeholder: 'Your Name'
      },
      {
        icon: 'fa-envelope',
        inputType: 'email',
        placeholder: 'Your Email'
      },
      {
        icon: 'fa-lock',
        inputType: 'password',
        placeholder: 'Your Password'
      },
      {
        icon: 'fa-key',
        inputType: 'password',
        placeholder: 'Conform Your Password'
      }
    ]
    const confirmText = '新規登録'
    return {
      inputs,
      confirmText
    }
  }
})
</script>
