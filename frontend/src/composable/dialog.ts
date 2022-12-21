import { reactive, provide, inject, ref, shallowRef } from 'vue';
import DialogConfirm from '@/components/DialogConfirm.vue';

const DIALOG_KEY = Symbol();

const provideDialog = (): DialogProvider => {
  const dialog = shallowRef<DialogOptions | null>(null);

  const open = (options: DialogOptions) => {
    dialog.value = options;
  };
  const close = () => {
    dialog.value?.onClose?.();
    dialog.value = null;
  };
  const apply = (...args: any[]) => {
    dialog.value?.onClose?.();
    dialog.value?.onApply?.(...args);
    dialog.value = null;
  };

  const confirm = (text: string, onApply?: () => void, onClose?: () => void) => {
    open({
      component: DialogConfirm,
      attrs: {
        text,
      },
      width: 350,
      onApply,
      onClose,
    });
  };

  const provider: DialogProvider = reactive({
    dialog,
    open,
    close,
    apply,
    confirm,
  });

  provide(DIALOG_KEY, provider);

  return provider;
};

const injectDialog = (): DialogProvider => {
  const provider = inject<DialogProvider>(DIALOG_KEY);
  if (!provider) {
    throw new Error('dialog not provided');
  }
  return provider;
};

type DialogProvider = {
  dialog: DialogOptions | null;
  open: (options: DialogOptions) => void;
  close: () => void;
  apply: () => void;
  confirm: (text: string, onApply?: () => void, onClose?: () => void) => void;
};

type DialogOptions = {
  component: unknown;
  on?: any;
  attrs?: any;
  width?: number;
  onClose?: () => void;
  onApply?: (...args: any[]) => void;
};

export { provideDialog, injectDialog };
