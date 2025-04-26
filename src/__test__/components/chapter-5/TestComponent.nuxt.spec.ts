import { afterEach, describe, expect, test, vi } from 'vitest';
import TestComponent from '@/components/chapter-5/TestComponent.vue';
import { mountComponent } from '@/helpers/test';

// vi.fn(): モック関数を作成（関数の呼び出しを監視できる特殊な関数）
const handleClickMock = vi.fn();

describe('src/components/chapter-5/TestComponent.vue', () => {
  // afterEach: 各テスト実行後に行う処理を定義
  afterEach(() => {
    // clearAllMocks(): すべてのモック関数の情報をリセット
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

    // find(): 属性セレクタを使って要素を取得
    // data-testid属性はテスト専用の識別子として使用される
    const nameDisplayArea = wrapper.find('[data-testid="props-name"]');
    const button = wrapper.find('[data-testid="props-handle-click"]');

    // exists(): 要素が存在するかをブール値で返すマッチャー
    expect(nameDisplayArea.exists()).toBe(true);
    // text(): 要素のテキスト内容を取得
    expect(nameDisplayArea.text()).toBe('test');
    expect(button.exists()).toBe(true);

    // trigger(): クリックイベントをシミュレート
    await button.trigger('click');

    // toHaveBeenCalledTimes(): モック関数が指定回数呼ばれたか検証
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  test('親からPropsを受け取らなかった場合、デフォルト値で適切に処理されるか', async () => {
    // nameプロパティを省略してデフォルト値の動作をテスト
    const props = {
      handleClick: handleClickMock,
    };

    const wrapper = mountComponent(TestComponent, { props });
    const nameDisplayArea = wrapper.find('[data-testid="props-name"]');

    expect(nameDisplayArea.exists()).toBe(true);
    // デフォルト値が正しく使用されているか検証
    expect(nameDisplayArea.text()).toBe('default');
  });
});
