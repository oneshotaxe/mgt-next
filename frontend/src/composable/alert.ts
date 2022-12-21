import { reactive, provide, inject, ref } from 'vue';

const ALERT_KEY = Symbol();

const provideAlert = (): AlertProvider => {
  let seq = 1;
  const alerts = ref<AlertOptions[]>([]);

  const open = (options: AlertOptions) => {
    options.id = seq;
    alerts.value.unshift(options);
    setTimeout(() => close(options.id!), 3000);
    seq++;
  };
  const close = (id: number) => {
    alerts.value = alerts.value.filter((a) => a.id !== id);
  };
  const success = (text: string) => {
    open({
      text,
      type: 'success',
    });
  };
  const warning = (text: string) => {
    open({
      text,
      type: 'warning',
    });
  };
  const error = (text: string) => {
    open({
      text,
      type: 'error',
    });
  };

  const provider: AlertProvider = reactive({
    alerts,
    open,
    close,
    success,
    warning,
    error,
  });

  provide(ALERT_KEY, provider);

  return provider;
};

const injectAlert = (): AlertProvider => {
  const provider = inject<AlertProvider>(ALERT_KEY);
  if (!provider) {
    throw new Error('alert not provided');
  }
  return provider;
};

type AlertProvider = {
  alerts: AlertOptions[];
  open: (options: AlertOptions) => void;
  close: (id: number) => void;
  success: (text: string) => void;
  warning: (text: string) => void;
  error: (text: string) => void;
};

type AlertOptions = {
  id?: number;
  text: string;
  type: 'error' | 'success' | 'warning' | 'info' | undefined;
};

export { provideAlert, injectAlert };
