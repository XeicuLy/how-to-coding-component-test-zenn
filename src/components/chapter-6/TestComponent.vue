<script setup lang="ts">
import Button from './Button.vue';
import ChildComponent from './ChildComponent.vue';

const labelList = [
  { id: 1, label: 'Label 1' },
  { id: 2, label: 'Label 2' },
];

const handleClick = () => {
  console.log('Button clicked');
};
</script>
<template>
  <section>
    <div>Chapter 6</div>
    <ul>
      <template v-for="({ id, label }, index) in labelList" :key="`${id}-${index}`">
        <li>
          <ChildComponent :label="label" />
        </li>
      </template>
    </ul>
    <Button :handle-click>Click Me</Button>
  </section>
</template>
