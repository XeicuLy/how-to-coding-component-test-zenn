<script setup lang="ts">
import { useTestStore } from '@/store/chapter-11/testStore';

const testStore = useTestStore();
const { title: titleState } = storeToRefs(testStore);
const { fetchTitle } = testStore;

await fetchTitle();
</script>
<template>
  <h1>{{ titleState }}</h1>
</template>
