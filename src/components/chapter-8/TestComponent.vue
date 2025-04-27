<script setup lang="ts">
type EmitsType = {
  emitTest: [value: boolean];
};
const emit = defineEmits<EmitsType>();

const isClick = ref(false);

const handleClick = () => {
  isClick.value = !isClick.value;
  emit('emitTest', isClick.value);
};
</script>
<template>
  <button @click="handleClick">Button</button>
</template>
