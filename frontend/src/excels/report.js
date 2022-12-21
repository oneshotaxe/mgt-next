import Excel from 'exceljs';
import Cursor from './Cursor';

export default async function (report) {
  const wb = new Excel.Workbook();
  const worksheets = createWorksheets(wb);

  printWork(new Cursor(worksheets[0]), report);
  printWeekends(new Cursor(worksheets[1]), report);
  printHospital(new Cursor(worksheets[2]), report);
  printVacation(new Cursor(worksheets[3]), report);

  return await wb.xlsx.writeBuffer();
}

function createWorksheets(wb) {
  return [
    wb.addWorksheet('Рабочие', {
      pageSetup: {
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 1000,
        paperSize: 9,
        horizontalCentered: true,
        verticalCentered: true,
        orientation: 'landscape',
        margins: {
          left: 0.2,
          right: 0.2,
          top: 0.2,
          bottom: 0.2,
          header: 0,
          footer: 0,
        },
      },
    }),
    wb.addWorksheet('Выходные'),
    wb.addWorksheet('Больничные'),
    wb.addWorksheet('Отпуск'),
  ];
}

function printWork(cursor, report) {
  cursor.setColumnWidth([15, 60, 60, 60, 60]);

  cursor.setBordersOnArea('medium', 1, 1, 1, 5);

  cursor.getArea(1, 1, 1, 5).forEach((cell) => {
    cell.alignment = {
      horizontal: 'center',
    };
    cell.font = {
      size: 18,
      bold: true,
    };
  });

  cursor.getArea(2, 1, 200, 5).forEach((cell) => {
    cell.font = {
      size: 18,
    };
  });

  cursor.getCell(1, 1).value = 'Автобус';
  cursor.getCell(1, 2).value = 'Двухсменка';
  cursor.getCell(1, 3).value = 'Первая смена';
  cursor.getCell(1, 4).value = 'Вторая смена';
  cursor.getCell(1, 5).value = 'Выходной';

  for (let i = 0; i < report.rows.length; i++) {
    cursor.setBordersOnArea('medium', i + 2, 1, i + 2, 5);

    cursor.getCell(i + 2, 1).value = report.rows[i].bus?.num || '';
    cursor.getCell(i + 2, 2).value = getDriverIdentity(report.rows[i].full);
    cursor.getCell(i + 2, 3).value = getDriverIdentity(report.rows[i].first);
    cursor.getCell(i + 2, 4).value = getDriverIdentity(report.rows[i].second);
    cursor.getCell(i + 2, 5).value = getDriverIdentity(report.rows[i].weekday);
  }
}

function getDriverIdentity(driver) {
  if (!driver) return '';

  return `${driver.num}    (${driver.name})`;
}

function printWeekends(cursor, report) {
  let column = 1;
  let row = 1;
  for (const driver of report.drivers['В']) {
    cursor.getCell(row, column).value = driver.num;

    column++;
    if (column === 8) {
      column = 1;
      row++;
    }
  }
}

function printHospital(cursor, report) {
  let column = 1;
  let row = 1;
  for (const driver of report.drivers['Б']) {
    cursor.getCell(row, column).value = driver.num;

    column++;
    if (column === 8) {
      column = 1;
      row++;
    }
  }
}

function printVacation(cursor, report) {
  let column = 1;
  let row = 1;
  for (const driver of report.drivers['О']) {
    cursor.getCell(row, column).value = driver.num;

    column++;
    if (column === 8) {
      column = 1;
      row++;
    }
  }
}
