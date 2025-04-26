<script setup lang="ts">
type Props = {
  handleClick: () => void;
};
defineProps<Props>();
</script>
<template>
  <button @click="handleClick">
    <slot />
  </button>
</template>
