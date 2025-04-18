import { describe, expect, test } from 'vitest';
import TestComponent from '@/components/chapter-4/TestComponent.vue';
import { mountComponent } from '@/helpers/test';

describe('src/components/chapter-4/TestComponent.vue', () => {
  test('必要な要素がレンダリングされているか', () => {
    const wrapper = mountComponent(TestComponent);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="chapter-4"]').exists()).toBe(true);
  });
});
