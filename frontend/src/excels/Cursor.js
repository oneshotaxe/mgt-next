export default class Cursor {
  constructor(worksheet, startR = 1, startC = 1) {
    this.worksheet = worksheet;
    this.startR = startR;
    this.startC = startC;
  }
  createCursor(r = 1, c = 1) {
    return new Cursor(this.worksheet, this.nr(r), this.nc(c));
  }
  setPosition(r, c) {
    this.startR = r;
    this.startC = c;
  }
  getRow(rowNumber) {
    return this.worksheet.getRow(this.nr(rowNumber));
  }
  getColumn(columnNumber) {
    return this.worksheet.getColumn(this.nc(columnNumber));
  }
  getCell(r, c) {
    return this.worksheet.getCell(this.nr(r), this.nc(c));
  }
  setColumnWidth(width, columnNumbers = undefined) {
    if (!columnNumbers) {
      columnNumbers = new Array(width.length).fill(0).map((value, index) => index + 1);
    }
    for (let i = 0; i < columnNumbers.length; i++) {
      this.getColumn(this.nc(columnNumbers[i])).width = width[i];
    }
  }
  setRowHeight(height, rowNumbers = undefined) {
    if (!rowNumbers) {
      rowNumbers = new Array(height.length).fill(0).map((value, index) => index + 1);
    }
    for (let i = 0; i < rowNumbers.length; i++) {
      this.getRow(rowNumbers[i]).height = height[i];
    }
  }
  getArea(r1, c1, r2, c2) {
    const cells = [];
    for (let rowNumber = r1; rowNumber <= r2; rowNumber++) {
      for (let columnNumber = c1; columnNumber <= c2; columnNumber++) {
        cells.push(this.getCell(rowNumber, columnNumber));
      }
    }
    return cells;
  }
  setBordersOnArea(style, r1, c1, r2, c2) {
    this.getArea(r1, c1, r2, c2).forEach(
      (cell) =>
        (cell.border = {
          left: { style: style },
          right: { style: style },
          top: { style: style },
          bottom: { style: style },
        })
    );
  }
  setBordersAroundArea(style, r1, c1, r2, c2) {
    this.getArea(r1, c1, r2, c1).forEach((cell) => {
      cell.border ? null : (cell.border = {});
      cell.border.left ? (cell.border.left.style = style) : (cell.border.left = { style: style });
    });
    this.getArea(r1, c2, r2, c2).forEach((cell) => {
      cell.border ? null : (cell.border = {});
      cell.border.right
        ? (cell.border.right.style = style)
        : (cell.border.right = { style: style });
    });
    this.getArea(r1, c1, r1, c2).forEach((cell) => {
      cell.border ? null : (cell.border = {});
      cell.border.top ? (cell.border.top.style = style) : (cell.border.top = { style: style });
    });
    this.getArea(r2, c1, r2, c2).forEach((cell) => {
      cell.border ? null : (cell.border = {});
      cell.border.bottom
        ? (cell.border.bottom.style = style)
        : (cell.border.bottom = { style: style });
    });
  }
  mergeCells(r1, c1, r2, c2) {
    this.worksheet.mergeCells(this.nr(r1), this.nc(c1), this.nr(r2), this.nc(c2));
  }
  // Normalized row
  nr(rowNumber) {
    return this.startR + rowNumber - 1;
  }
  // Normalized column
  nc(columnNumber) {
    return this.startC + columnNumber - 1;
  }
}
