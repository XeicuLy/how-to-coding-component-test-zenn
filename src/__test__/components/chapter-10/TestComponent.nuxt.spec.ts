import { beforeEach, describe, expect, test } from 'vitest';
import TestComponent from '@/components/chapter-10/TestComponent.vue';
import { setupTestingPinia, mountComponent } from '@/helpers/test';
import { useTestStore } from '@/store/chapter-10/testStore';

describe('src/components/chapter-10/TestComponent.vue', () => {
  // テスト用の変数を宣言
  // ReturnType<typeof ...>: 関数の戻り値の型を取得するTypeScript型ユーティリティ
  let testingPinia: ReturnType<typeof setupTestingPinia>;
  let testStore: ReturnType<typeof useTestStore>;

  beforeEach(() => {
    // 各テスト実行前にPiniaをセットアップ
    // setupTestingPinia: テスト用のPiniaインスタンスを作成するヘルパー関数
    testingPinia = setupTestingPinia();
    testStore = useTestStore();
  });

  test('ボタンをクリックしたときに、適切に表示が切り替わるか', async () => {
    // テスト対象のコンポーネントをマウント（Piniaインスタンスを渡す）
    // mountComponent: コンポーネントをテスト用にマウントするヘルパー関数
    const wrapper = mountComponent(TestComponent, { testingPinia });
    // data-testid属性を使って特定の要素（ボタン）を取得
    // find(): セレクタに一致する最初の要素を取得
    const target = wrapper.find('[data-testid="test3"]');

    // ボタンが存在することを確認
    // exists(): 要素が存在するかをブール値で返すマッチャー
    expect(target.exists()).toBe(true);

    // ボタンのクリックイベントを発火
    // trigger(): 指定したイベントを発火させるメソッド
    await target.trigger('click');

    // actionsのincrementCountメソッドが1回呼ばれたことを確認
    // toHaveBeenCalledTimes(): メソッドが指定した回数だけ呼ばれたかを検証
    expect(testStore.incrementCount).toHaveBeenCalledTimes(1);
    // カウントが1になり、「Odd」と表示されることを確認
    // text(): 要素のテキスト内容を取得
    expect(wrapper.find('[data-testid="test1"]').text()).toBe('1');
    expect(wrapper.find('[data-testid="test2"]').text()).toBe('Odd');

    // 再度ボタンをクリック
    await target.trigger('click');

    // ストアのincrementCountメソッドが合計2回呼ばれたことを確認
    expect(testStore.incrementCount).toHaveBeenCalledTimes(2);
    // カウントが2になり、「Even」と表示されることを確認
    expect(wrapper.find('[data-testid="test1"]').text()).toBe('2');
    expect(wrapper.find('[data-testid="test2"]').text()).toBe('Even');
  });
});
