<template>
  <section class="login h-100" style="background-color: #eee">
    <div class="container h-100">
      <div
        class="row d-flex justify-content-center align-items-center h-100 my-4"
      >
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    class="img-fluid"
                    alt="Sample image"
                  />
                </div>
                <div class="col-md-10 col-lg-6 col-xl-5">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    ログイン
                  </p>

                  <form class="mx-1 mx-md-4">
                    <AuthLoginButton
                      v-for="(ele, index) in auths"
                      :post="ele"
                      :key="index"
                    />

                    <div class="dropdown-divider mb-3"></div>

                    <InputText
                      v-for="(ele, index) in inputs"
                      :post="ele"
                      :key="index"
                    />

                    <div
                      class="d-flex justify-content-between align-items-center mb-3"
                    >
                      <!-- Checkbox -->
                      <div class="form-check mb-0">
                        <input
                          class="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3"
                        />
                        <label class="form-check-label" for="form2Example3">
                          Remember me
                        </label>
                      </div>
                    </div>

                    <div class="text-center mb-3 mb-lg-4">
                      <ConfirmButton :text="confirm" />

                      <div class="mt-4">
                        <p class="small fw-bold mt-2 pt-1 mb-0 text-end">
                          新規登録は<router-link
                            aria-current="page"
                            to="/sign_up"
                            >こちら</router-link
                          >
                        </p>
                        <p class="small fw-bold mt-2 pt-1 mb-0 text-end">
                          パスワードを忘れた方は
                          <router-link aria-current="page" to="/"
                            >こちら</router-link
                          >
                        </p>
                      </div>
                    </div>
                  </form>
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
import AuthLoginButton from './../components/common/AuthLoginButton.vue'
import ConfirmButton from './../components/common/ConfirmButton.vue'

export default defineComponent({
  name: 'Login',
  components: {
    AuthLoginButton,
    InputText,
    ConfirmButton
  },
  setup() {
    const auths: { icon: string; color: string; text: string }[] = [
      {
        icon: 'fa-twitter',
        color: 'background-color: #1da1f2',
        text: 'Twitter'
      },
      {
        icon: 'fa-google',
        color: 'background-color: #db4437',
        text: 'Google'
      }
    ]
    const inputs: { icon: string; inputType: string; placeholder: string }[] = [
      {
        icon: 'fa-envelope',
        inputType: 'email',
        placeholder: 'Type Your Email'
      },
      {
        icon: 'fa-lock',
        inputType: 'password',
        placeholder: 'Type Your Password'
      }
    ]
    const confirm = 'Login'

    return {
      auths,
      inputs,
      confirm
    }
  }
})
</script>
