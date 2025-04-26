import { describe, expect, test } from 'vitest';
import TestComponent from '@/components/chapter-6/TestComponent.vue';
import { mountComponent } from '@/helpers/test';

describe('src/components/chapter-6/TestComponent.vue', () => {
  test('単一の子コンポーネントが正しくレンダリングされているか', () => {
    // スタブ: 実際のコンポーネントの代わりに単純な要素を使用
    // 自動スタブ化では、コンポーネント名-stubとしてレンダリングされる
    const wrapper = mountComponent(TestComponent, { stubs: { Button: true } });

    // find(): セレクタに一致する最初の要素を取得
    // exists(): 要素が存在するかをブール値で返すマッチャー
    // toBe(): 値が完全に一致するかを検証するマッチャー
    expect(wrapper.find('button-stub').exists()).toBe(true);
  });

  test('複数ある同名の子コンポーネントが正しくレンダリングされているか', () => {
    const wrapper = mountComponent(TestComponent, { stubs: { ChildComponent: true } });

    // findAll(): セレクタに一致するすべての要素を配列で取得
    expect(wrapper.findAll('child-component-stub').length).toBe(2);
  });

  test('子コンポーネントに正しく Props を渡すことができているか', async () => {
    // 手動スタブでは、propsの定義とレンダリングするテンプレートを指定する
    const Button = {
      props: ['handleClick'],
      template: '<button></button>',
    };
    const ChildComponent = {
      props: ['label'],
      template: '<div></div>',
    };

    const wrapper = mountComponent(TestComponent, { stubs: { Button, ChildComponent } });

    // findComponent(): 特定のコンポーネントを検索
    const buttonComponent = wrapper.findComponent(Button);
    // findAllComponents(): 特定のコンポーネントをすべて検索
    const childComponents = wrapper.findAllComponents(ChildComponent);

    // props(): コンポーネントのプロパティを取得
    // toBeDefined(): 値が未定義でないことを検証するマッチャー
    expect(buttonComponent.props('handleClick')).toBeDefined();

    expect(childComponents[0].props('label')).toBe('Label 1');
    expect(childComponents[1].props('label')).toBe('Label 2');

    // trigger(): イベントをシミュレートするメソッド
    await buttonComponent.trigger('click');
    // emitted(): 発行されたイベントを取得
    // toBeTruthy(): 値が真（true、非nullなど）であることを検証
    expect(buttonComponent.emitted('click')).toBeTruthy();
  });
});
