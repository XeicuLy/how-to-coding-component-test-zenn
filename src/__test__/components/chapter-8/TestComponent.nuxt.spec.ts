import { describe, expect, test } from 'vitest';
import TestComponent from '@/components/chapter-8/TestComponent.vue';
import { mountComponent } from '@/helpers/test';

describe('src/components/chapter-8/TestComponent.vue', () => {
  test('ボタンをクリックしたとき、emitイベントが発火するか', async () => {
    // コンポーネントをマウント
    const wrapper = mountComponent(TestComponent);
    // find(): セレクタに一致する最初の要素を取得
    const target = wrapper.find('button');

    // exists(): 要素が存在するかをブール値で返すマッチャー
    // toBe(): 値が完全に一致するかを検証するマッチャー
    expect(target.exists()).toBe(true);

    // trigger(): イベントをシミュレートするメソッド
    await target.trigger('click');

    // emitted(): 発行されたイベントを取得
    // toEqual(): オブジェクトや配列の内容が一致するかを検証するマッチャー
    expect(wrapper.emitted('emitTest')?.[0]).toEqual([true]);

    // 2回目のクリック
    await target.trigger('click');

    // 2回目の発火で値が[false]に変わることを検証
    expect(wrapper.emitted('emitTest')?.[1]).toEqual([false]);
  });
});
