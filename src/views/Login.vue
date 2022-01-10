<template>
  <section class="login h-100" style="background-color: #eee;">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100 my-4">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px;">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center">

                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image">

                </div>
                <div class="col-md-10 col-lg-6 col-xl-5">

                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">ログイン</p>

                  <form class="mx-1 mx-md-4">
                    <!-- twitterでログイン -->
                    <div class="mb-4">
                      <button type="button" class="btn btn-lg w-100 text-light" style="padding-right: 2.5rem; background-color: #1DA1F2"><i class="fab fa-twitter" style="padding-right: 2.5rem;"></i>Twitterでログイン</button>
                    </div>

                    <!-- googleでログイン -->
                    <div class="mb-4">
                      <button type="button" class="btn btn-lg w-100 text-light" style="padding-right: 2.5rem; background-color: #DB4437"><i class="fab fa-google" style="padding-right: 2.5rem;"></i>Googleでログイン</button>
                    </div>

                    <div class="dropdown-divider mb-3"></div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="email" id="form3Example3c" class="form-control" placeholder="Your Email" />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="password" id="form3Example4c" class="form-control" placeholder="Password" />
                      </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                      <!-- Checkbox -->
                      <div class="form-check mb-0">
                        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                        <label class="form-check-label" for="form2Example3">
                          Remember me
                        </label>
                      </div>

                    </div>

                    <div class="text-center text-lg-start mt-4 pt-2">
                      <button type="button" class="btn btn-primary btn-lg" style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
                      <div class="mt-4">
                        <p class="small fw-bold mt-2 pt-1 mb-0 text-end">
                          新規登録は<router-link aria-current="page" to="/sign_up">こちら</router-link>
                        </p>
                        <p class="small fw-bold mt-2 pt-1 mb-0 text-end">
                          パスワードを忘れた方は <router-link aria-current="page" to="/">こちら</router-link>
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  components: {
  },
});
</script>
