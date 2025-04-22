<script setup lang="ts">
type Props = {
  name?: string;
  handleClick: (_event: Event) => void;
};

withDefaults(defineProps<Props>(), {
  name: 'default',
});
</script>
<template>
  <div data-testid="props-name">{{ name }}</div>
  <button data-testid="props-handle-click" @click.prevent="handleClick">Button</button>
</template>
