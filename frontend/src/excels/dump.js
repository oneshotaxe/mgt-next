import Excel from "exceljs";

export default async function (template, dump) {
  const wb = new Excel.Workbook();
  await wb.xlsx.load(template);

  let ws = wb.getWorksheet("Водители");
  for (let i = 0; i < dump.drivers.length; i++) {
    const driver = dump.drivers[i];

    const defaultItems = driver.graphic.format.split("");
    if (driver.graphic.items.length % defaultItems.length !== 0) {
      continue;
    }
    const groups = [];
    for (let i = 0; i < driver.graphic.items.length; i += defaultItems.length) {
      groups.push(
        driver.graphic.items.slice(i, i + defaultItems.length).map((ch) => {
          switch (ch) {
            case "Р":
              return "F";
            case "1":
              return "1";
            case "2":
              return "2";
            case "В":
              return "W";
            case "О":
              return "O";
          }
        })
      );
    }
    ws.getCell(2 + i, 1).value = driver.num;
    ws.getCell(2 + i, 2).value = driver.fullName;
    ws.getCell(2 + i, 3).value = driver.bus?.num;
    ws.getCell(2 + i, 4).value = driver.graphic.name;
    ws.getCell(2 + i, 5).value = groups.map((g) => g.join(",")).join("|");
  }

  ws = wb.getWorksheet("Автобусы");
  for (let i = 0; i < dump.buses.length; i++) {
    ws.getCell(2 + i, 1).value = dump.buses[i].num;
    ws.getCell(2 + i, 2).value = dump.buses[i].gate?.route?.num;
    ws.getCell(2 + i, 3).value = dump.buses[i].gate?.num;
  }

  ws = wb.getWorksheet("Маршруты");
  for (let i = 0; i < dump.routes.length; i++) {
    ws.getCell(2 + i, 1).value = dump.routes[i].num;
  }

  ws = wb.getWorksheet("Выходы");
  for (let i = 0; i < dump.gates.length; i++) {
    ws.getCell(3 + i, 1).value = dump.gates[i].route?.num;
    ws.getCell(3 + i, 2).value = dump.gates[i].num;
    const isTwoShifts =
      dump.gates[i].change &&
      dump.gates[i].durationSecondSmene &&
      dump.gates[i].lunchSecondSmene;

    ws.getCell(3 + i, 3).value = isTwoShifts ? "Да" : "Нет";
    ws.getCell(3 + i, 4).value = dump.gates[i].outPark;
    ws.getCell(3 + i, 5).value = dump.gates[i].durationFirstSmene;
    ws.getCell(3 + i, 6).value = dump.gates[i].lunchFirstSmene;
    if (isTwoShifts) {
      ws.getCell(3 + i, 7).value = dump.gates[i].change;
      ws.getCell(3 + i, 8).value = dump.gates[i].durationSecondSmene;
      ws.getCell(3 + i, 9).value = dump.gates[i].lunchSecondSmene;
    }
    ws.getCell(3 + i, 10).value = dump.gates[i].endWork;
  }

  return await wb.xlsx.writeBuffer();
}
