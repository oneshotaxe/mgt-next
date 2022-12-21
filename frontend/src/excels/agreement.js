import Excel from 'exceljs';

const months = [
  'январе',
  'феврале',
  'марте',
  'апреле',
  'мае',
  'июне',
  'июле',
  'августе',
  'сентябре',
  'октябре',
  'ноябре',
  'декабре',
];

export default async function (template, drivers, month) {
  const wb = new Excel.Workbook();
  await wb.xlsx.load(template);
  const ws = wb.getWorksheet('main');

  const [y, m] = month.split('-');
  const text = `Мы, нижеподписавшиеся водители автобуса регулярных городских пассажирских маршрутов 9-ой колонны филиала Юго-западный ГУП "Мосгортранс", в соответствии со ст.ст. 113, 99 ТК РФ выражаем свое согласие на привлечение к работе в выходные и праздничные дни, на привлечение к выполнению сверхурочной работы за пределами установленной продолжительности рабочего времени (баланса), а также на разделение рабочего дня (смены) на части в ${
    months[m - 1]
  } ${y}. С правом отказаться от работы в выходные и праздничные дни, а также отказаться от сверхурочной работы ознакомлены.`;
  ws.getCell(2, 1).value = text;

  drivers
    .sort((a, b) => (a.num === b.num ? 0 : a.num < b.num ? -1 : 1))
    .forEach((driver, index) => {
      ws.getCell(4 + (index % 48), 2 + 4 * Math.floor(index / 48)).value = driver.num.slice(3);
      ws.getCell(4 + (index % 48), 3 + 4 * Math.floor(index / 48)).value = driver.shortName;
    });

  return await wb.xlsx.writeBuffer();
}
