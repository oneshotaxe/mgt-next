import Excel from "exceljs";

export default async function (template, dump) {
  const wb = new Excel.Workbook();
  await wb.xlsx.load(template);

  let ws = wb.getWorksheet("Водители");
  for (let i = 0; i < dump.drivers.length; i++) {
    ws.getCell(2 + i, 1 + i).value = dump.drivers[i].num;
    ws.getCell(2 + i, 2 + i).value = dump.drivers[i].fullName;
    ws.getCell(2 + i, 3 + i).value = dump.drivers[i].bus?.num;
  }

  ws = wb.getWorksheet("Автобусы");
  for (let i = 0; i < dump.buses.length; i++) {
    ws.getCell(2 + i, 1 + i).value = dump.buses[i].num;
    ws.getCell(2 + i, 2 + i).value = dump.buses[i].gate?.num;
    ws.getCell(2 + i, 3 + i).value = dump.buses[i].gate?.route?.num;
  }

  ws = wb.getWorksheet("Маршруты");
  for (let i = 0; i < dump.routes.length; i++) {
    ws.getCell(2 + i, 1 + i).value = dump.routes[i].num;
  }

  ws = wb.getWorksheet("Выходы");
  for (let i = 0; i < dump.gates.length; i++) {
    ws.getCell(2 + i, 1 + i).value = dump.gates[i].route?.num;
    ws.getCell(2 + i, 2 + i).value = dump.gates[i].num;
    ws.getCell(2 + i, 3 + i).value = dump.gates[i].durationFirstSmene;
    ws.getCell(2 + i, 4 + i).value = dump.gates[i].durationSecondSmene;
    ws.getCell(2 + i, 5 + i).value = dump.gates[i].outPark;
    ws.getCell(2 + i, 6 + i).value = dump.gates[i].change;
    ws.getCell(2 + i, 7 + i).value = dump.gates[i].endWork;
    ws.getCell(2 + i, 8 + i).value = dump.gates[i].lunchFirstSmene;
    ws.getCell(2 + i, 9 + i).value = dump.gates[i].lunchSecondSmene;
  }

  return await wb.xlsx.writeBuffer();
}
