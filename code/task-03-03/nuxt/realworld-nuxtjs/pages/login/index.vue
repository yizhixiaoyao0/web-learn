<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center"> {{ isLogin ? 'Sign in': 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link to='/login' v-if='!isLogin'>Have an account?</nuxt-link>
            <nuxt-link to='/register' v-else>Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template 
            v-for='(msg, field) in errors'>
              <li 
              v-for='(m, index) in msg' 
              :key='index'>{{field}}{{m}}</li>
            </template>
          </ul>

          <form @submit.prevent = 'onSubmit'>
            <fieldset class="form-group" v-if='!isLogin'>
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model='user.userName'
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                v-model='user.email'
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                  v-model='user.password'
                placeholder="Password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in': 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {login, register} from '@/api/user'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'noAuth',
  name: 'LoginIndex',
  data () {
    return {
      user: {
        userName: '',
        email: '',
        password: ''
      },
      errors: {
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        const {data} = this.isLogin ? await login({
          user: this.user
        }) : await register({
          user: this.user
        })

        this.$store.commit('setUser', data.user);

        Cookie.set('user', data.user);

        this.$router.push('/');
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    }
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login';
    }
  }
};
</script>

<style></style>
