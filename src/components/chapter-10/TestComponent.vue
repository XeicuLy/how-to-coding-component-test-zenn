<script setup lang="ts">
import { useTestStore } from '@/store/chapter-10/testStore';

const testStore = useTestStore();
const { count: countState, isEven } = storeToRefs(testStore);
const { incrementCount } = testStore;

const evenOddText = computed(() => (isEven.value ? 'Even' : 'Odd'));
</script>
<template>
  <div data-testid="test1">{{ countState }}</div>
  <div data-testid="test2">{{ evenOddText }}</div>
  <button data-testid="test3" @click="incrementCount">Increment Button</button>
</template>
