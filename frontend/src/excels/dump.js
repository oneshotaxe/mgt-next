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
    console.log(groups);
    let graphic = `${driver.graphic.name}.${groups
      .map((g) => g.join(","))
      .join("|")}`;

    ws.getCell(2 + i, 1).value = driver.num;
    ws.getCell(2 + i, 2).value = driver.fullName;
    ws.getCell(2 + i, 3).value = driver.bus?.num;
    ws.getCell(2 + i, 4).value = graphic;
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
    ws.getCell(2 + i, 1).value = dump.gates[i].route?.num;
    ws.getCell(2 + i, 2).value = dump.gates[i].num;
    ws.getCell(2 + i, 3).value = dump.gates[i].durationFirstSmene;
    ws.getCell(2 + i, 4).value = dump.gates[i].durationSecondSmene;
    ws.getCell(2 + i, 5).value = dump.gates[i].outPark;
    ws.getCell(2 + i, 6).value = dump.gates[i].change;
    ws.getCell(2 + i, 7).value = dump.gates[i].endWork;
    ws.getCell(2 + i, 8).value = dump.gates[i].lunchFirstSmene;
    ws.getCell(2 + i, 9).value = dump.gates[i].lunchSecondSmene;
  }

  return await wb.xlsx.writeBuffer();
}
