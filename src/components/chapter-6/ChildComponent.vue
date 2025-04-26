<script setup lang="ts">
type Props = {
  label: string;
};
defineProps<Props>();
</script>
<template>
  <div>{{ label }}</div>
</template>
