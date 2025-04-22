import { afterEach, describe, expect, test, vi } from 'vitest';
import TestComponent from '@/components/chapter-5/TestComponent.vue';
import { mountComponent } from '@/helpers/test';

// モック関数を作成
const handleClickMock = vi.fn();

describe('src/components/chapter-5/TestComponent.vue', () => {
  // 各テスト実行後にモックをリセットして、テスト間の影響を防ぐ
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('親から受け取ったPropsを適切に処理できるか', async () => {
    // テスト用のpropsを準備
    const props = {
      name: 'test',
      handleClick: handleClickMock,
    };

    // コンポーネントをマウント（レンダリング）
    const wrapper = mountComponent(TestComponent, { props });

    // find()メソッドでdata-testid属性を持つ要素を取得
    const nameDisplayArea = wrapper.find('[data-testid="props-name"]');
    const button = wrapper.find('[data-testid="props-handle-click"]');

    // exists()でその要素が存在するか確認
    expect(nameDisplayArea.exists()).toBe(true);
    // text()メソッドで要素のテキスト内容を取得し、期待値と比較
    expect(nameDisplayArea.text()).toBe('test');

    expect(button.exists()).toBe(true);

    // trigger()メソッドでクリックイベントをシミュレート
    // awaitを使用してイベント処理の完了を待機
    await button.trigger('click');

    // モック関数が呼び出されたか回数を確認
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  test('親からPropsを受け取らなかった場合、デフォルト値で適切に処理されるか', async () => {
    // テスト用のpropsを準備
    const props = {
      handleClick: handleClickMock,
    };
    const wrapper = mountComponent(TestComponent, { props });
    // find()で要素を取得：CSSセレクタと同様の記法
    const nameDisplayArea = wrapper.find('[data-testid="props-name"]');

    expect(nameDisplayArea.exists()).toBe(true);
    // text()でテキスト内容を取得：デフォルト値が正しく表示されているか確認
    expect(nameDisplayArea.text()).toBe('default');
  });
});
