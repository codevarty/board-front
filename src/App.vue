<script setup>
import DefaultLayout from './layouts/DefaultLayout.vue';
import { shallowRef } from 'vue';

const current = shallowRef(DefaultLayout); 

</script>

<template>
  <component :is="current"/>
</template>