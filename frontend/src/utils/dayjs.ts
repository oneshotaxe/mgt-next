import dayjs from 'dayjs';

const formatDateTime = (value?: string) => {
  return value ? dayjs(value).format('DD.MM.YYYY HH:mm:ss') : '';
};

export { formatDateTime };
