import { flushPromises } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import TestComponent from '@/components/chapter-11/TestComponent.vue';
import { mountSuspendedComponent, setupTestingPinia } from '@/helpers/test';
import { useTestStore } from '@/store/chapter-11/testStore';

// モックオブジェクトをhoistして、テスト全体で使用できるようにする
// vi.hoisted(): モックをファイルスコープでアクセス可能にするVitest関数
const { fetchTitleMock } = vi.hoisted(() => ({
  fetchTitleMock: vi.fn(),
}));

// 外部サービスをモック化
// vi.mock(): モジュールをモック化するVitest関数
vi.mock('@/services/chapter-11/useTitleService.ts', () => ({
  fetchTitle: fetchTitleMock,
}));

describe('src/components/chapter-11/TestComponent.vue', () => {
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

  // afterEach(): 各テストケース実行後に実行される関数を定義
  afterEach(() => {
    // ここではすべてのモックの状態をリセットしている
    vi.clearAllMocks();
  });

  test('fetchTitleが正しく呼ばれ、テキストが正しく表示されるか', async () => {
    // モックが返す値を設定
    // mockResolvedValue(): 非同期関数が解決する値を設定するモックメソッド
    fetchTitleMock.mockResolvedValue('Test Title');

    // ストアからfetchTitle関数を取得
    const { fetchTitle } = testStore;

    // Suspenseを含むコンポーネントをマウント（Piniaインスタンスを渡す）
    // mountSuspendedComponent: Suspenseを持つコンポーネントをテスト用にマウントするヘルパー関数
    const wrapper = await mountSuspendedComponent(TestComponent, { testingPinia });
    // 非同期操作の完了を待機
    // flushPromises(): すべての保留中のPromiseを解決するユーティリティ関数
    await flushPromises();

    // fetchTitle関数が1回呼ばれたことを確認
    // toHaveBeenCalledTimes(): メソッドが指定した回数だけ呼ばれたかを検証
    expect(fetchTitle).toHaveBeenCalledTimes(1);
    // h1要素のテキストが期待通りであることを確認
    // find(): セレクタに一致する最初の要素を取得し、text()でテキスト内容を取得
    expect(wrapper.find('h1').text()).toBe('Test Title');
  });
});
