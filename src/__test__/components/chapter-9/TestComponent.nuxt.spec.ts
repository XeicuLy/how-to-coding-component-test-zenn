import { afterEach, describe, expect, test, vi } from 'vitest';
import TestComponent from '@/components/chapter-9/TestComponent.vue';
import { mountComponent } from '@/helpers/test';
import { additionNumber } from '@/utils/chapter-9/test';

// vi.mock(): 指定したモジュールをモック化するための関数
// ここでは外部の関数をviのモック関数に置き換えている
vi.mock('@/utils/chapter-9/test', () => ({
  additionNumber: vi.fn(),
}));

describe('src/components/chapter-9/TestComponent.vue', () => {
  // afterEach(): 各テストケース実行後に実行される関数を定義
  // ここではすべてのモックの状態をリセットしている
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('ボタンがクリックされたときに、イベントが適切に発火するか(外部定義を関節的に呼び出す)', async () => {
    const wrapper = mountComponent(TestComponent);
    // data-testid属性を使って特定の要素を検索
    const target = wrapper.find('[data-testid="button01"]');

    // exists(): 要素が存在するかを検証するマッチャー
    expect(target.exists()).toBe(true);

    // trigger(): 指定したイベントを発火させるメソッド
    await target.trigger('click');

    // toHaveBeenCalledTimes(): モック関数が指定回数呼び出されたかを検証するマッチャー
    expect(additionNumber).toHaveBeenCalledTimes(1);
    // toHaveBeenCalledWith(): モック関数が指定した引数で呼び出されたかを検証するマッチャー
    expect(additionNumber).toHaveBeenCalledWith(1, 2);
  });

  test('ボタンがクリックされたときに、イベントが適切に発火するか(外部定義を直接的に呼び出す)', async () => {
    const wrapper = mountComponent(TestComponent);
    const target = wrapper.find('[data-testid="button02"]');

    expect(target.exists()).toBe(true);

    await target.trigger('click');

    expect(additionNumber).toHaveBeenCalledTimes(1);
    expect(additionNumber).toHaveBeenCalledWith(3, 3);
  });

  test('ボタンがクリックされたときに、イベントが適切に発火するか(コンポーネント内定義を呼び出す)', async () => {
    // コンポーネントのvmプロパティ型を指定
    const wrapper = mountComponent<{ isClicked: boolean }>(TestComponent);
    const target = wrapper.find('[data-testid="button03"]');

    expect(target.exists()).toBe(true);

    // vm: コンポーネントのインスタンスにアクセスするためのプロパティ
    // isClickedの初期値がfalseであることを検証
    expect(wrapper.vm.isClicked).toBe(false);

    await target.trigger('click');

    // クリック後にisClickedがtrueに変わったことを検証
    expect(wrapper.vm.isClicked).toBe(true);
  });
});
