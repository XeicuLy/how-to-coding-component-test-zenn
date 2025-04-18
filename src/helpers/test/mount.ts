import { mountSuspended } from '@nuxt/test-utils/runtime';
import { mount, RouterLinkStub, type VueWrapper } from '@vue/test-utils';
import type { setupTestingPinia } from './setupTestingPinia';
import type { Component, ComponentPublicInstance, DefineComponent, Slots } from 'vue';

interface MountOptions {
  /** テスト用のPiniaインスタンス（setupTestingPinia関数で作成したもの） */
  testingPinia?: ReturnType<typeof setupTestingPinia>;
  /** コンポーネントをマウントするDOM要素 */
  attachTo?: Element | string;
  /** コンポーネントに渡すprops */
  props?: Record<string, unknown>;
  /** コンポーネントのスロット */
  slots?: Record<string, () => VNode | VNode[] | string> | Slots;
  /** shallowレンダリングを行うかどうか */
  shallow?: boolean;
  /** 子コンポーネントをスタブ化するためのオブジェクト */
  stubs?: Record<string, Component | boolean>;
  /** モックオブジェクト */
  mocks?: Record<string, unknown>;
  /** グローバルコンフィグ */
  config?: Record<string, unknown>;
  /** その他追加マウントオプション */
  options?: Record<string, unknown>;
}

const DEFAULT_STUBS = {
  NuxtLink: RouterLinkStub,
} as const;

const DEFAULT_OPTIONS = {
  testingPinia: undefined,
  attachTo: undefined,
  props: {},
  slots: {},
  shallow: false,
  stubs: DEFAULT_STUBS,
  mocks: {},
  config: {},
  options: {},
} as const satisfies MountOptions;

/**
 * Vueコンポーネントをテスト用にマウントするヘルパー関数
 *
 * @template VMValue - コンポーネントインスタンスの型。コンポーネントのプロパティやメソッドへの型安全なアクセスをするために使用
 * @param component - テスト対象のVueコンポーネント
 * @param options {@link MountOptions} - マウントオプション（任意）
 * @returns テスト用のVueラッパーオブジェクト
 */
export const mountComponent = <VMValue>(
  component: Component,
  options: Partial<MountOptions> = DEFAULT_OPTIONS,
): VueWrapper<ComponentPublicInstance & VMValue & DefineComponent> => {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const {
    testingPinia,
    attachTo,
    props,
    slots,
    shallow,
    stubs,
    mocks,
    config,
    options: additionalOptions,
  } = mergedOptions;

  return mount(component, {
    ...additionalOptions,
    attachTo,
    props,
    slots,
    shallow,
    global: {
      plugins: testingPinia ? [testingPinia] : [],
      stubs: { ...DEFAULT_STUBS, ...stubs },
      mocks,
      config,
    },
  });
};

/**
 * Vueコンポーネントをテスト用に非同期マウントするヘルパー関数
 *
 * @template VMValue - コンポーネントインスタンスの型。コンポーネントのプロパティやメソッドへの型安全なアクセスをするために使用
 * @param component - テスト対象のVueコンポーネント
 * @param options {@link MountOptions} - マウントオプション（任意）
 * @returns テスト用のVueラッパーオブジェクト
 */
export const mountSuspendedComponent = async <VMValue>(
  component: Component,
  options: Partial<MountOptions> = DEFAULT_OPTIONS,
): Promise<VueWrapper<ComponentPublicInstance & VMValue & DefineComponent>> => {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const {
    testingPinia,
    attachTo,
    props,
    slots,
    shallow,
    stubs,
    mocks,
    config,
    options: additionalOptions,
  } = mergedOptions;

  return await mountSuspended(component, {
    ...additionalOptions,
    attachTo,
    props,
    slots,
    shallow,
    global: {
      plugins: testingPinia ? [testingPinia] : [],
      stubs: { ...DEFAULT_STUBS, ...stubs },
      mocks,
      config,
    },
  });
};
