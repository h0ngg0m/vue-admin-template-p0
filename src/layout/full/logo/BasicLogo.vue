<template>
  <div>
    <div class="logo">
      <RouterLink to="/">
        <img :src="logo" alt="home" />
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from '/asset/image/logo/logo-dark.svg'
import { RouterLink } from 'vue-router'
</script>
