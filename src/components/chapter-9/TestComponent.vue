<script setup lang="ts">
import { additionNumber } from '@/utils/chapter-9/test';

const isClicked = ref(false);

const handleClick01 = () => {
  additionNumber(1, 2);
};

const handleClick02 = () => {
  isClicked.value = !isClicked.value;
};
</script>
<template>
  <button data-testid="button01" @click="handleClick01">Button</button>
  <button data-testid="button02" @click="additionNumber(3, 3)">Button</button>
  <button data-testid="button03" @click="handleClick02">Button</button>
</template>
