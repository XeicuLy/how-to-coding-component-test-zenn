import { describe, expect, test } from 'vitest';
import TestComponent from '@/components/chapter-7/TestComponent.vue';
import { mountComponent } from '@/helpers/test';

describe('src/components/chapter-7/TestComponent.vue', () => {
  test('slotのコンテンツが正しくレンダリングされるか(DOM)', () => {
    // スロット: 親コンポーネントから子コンポーネントに渡すコンテンツ
    // h関数: 仮想DOMノードを作成する関数（vueの関数）
    const slots = {
      default: () => h('div', { id: 'slot-content' }, 'Slot Test'),
    };
    const wrapper = mountComponent(TestComponent, { slots });

    // スロットとして渡したDOM要素が正しく表示されているか検証
    // find(): セレクタに一致する最初の要素を取得
    // exists(): 要素が存在するかをブール値で返すマッチャー
    // toBe(): 値が完全に一致するかを検証するマッチャー
    // text(): 要素のテキスト内容を取得
    expect(wrapper.find('#slot-content').exists()).toBe(true);
    expect(wrapper.find('#slot-content').text()).toBe('Slot Test');
  });

  test('slotのコンテンツが正しくレンダリングされるか(テキスト)', () => {
    // テキストのみのスロットコンテンツを設定
    const slots = {
      default: () => 'Slot Test',
    };
    const wrapper = mountComponent(TestComponent, { slots });

    // toContain(): 指定された文字列が含まれているかを検証するマッチャー
    expect(wrapper.text()).toContain('Slot Test');
  });
});
