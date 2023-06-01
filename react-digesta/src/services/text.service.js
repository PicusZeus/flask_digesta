const addItalicTags = (text) => {
  const reStart = new RegExp("<it>");
  const reItEnd = new RegExp("<\\/it>");

  const splitOnIt = text.split(reStart);
  const jsx = [splitOnIt[0]];
  for (let i = 1; i < splitOnIt.length; i++) {
    const rest = splitOnIt[i].split(reItEnd);
    jsx.push(<i key={i}>{rest[0]}</i>);
    jsx.push(rest[1]);
  }
  return jsx;
};
const addRowTags = (text) => {
  const rowStart = new RegExp("<tr>");
  const rowEnd = new RegExp("<\\/tr>");

  const splitOnRow = text.split(rowStart);
  const jsx = [splitOnRow[0]];
  for (let i = 1; i < splitOnRow.length; i++) {
    const rest = splitOnRow[i].split(rowEnd);

    const row = rest[0].split("|").filter((i) => i);

    const cells = [];
    for (let c = 0; c < row.length; c++) {
      cells.push(<td key={c}>{row[c]}</td>);
    }
    jsx.push(<tr key={i}>{cells}</tr>);
    jsx.push(rest[1]);
  }
  return jsx;
};
export const addTags = (text) => {
  const tableStart = new RegExp("<table>");
  const tableEnd = new RegExp("<\\/table>");

  const splitOnTable = text.split(tableStart);
  const jsx = [...addItalicTags(splitOnTable[0])];
  for (let i = 1; i < splitOnTable.length; i++) {
    const rest = splitOnTable[i].split(tableEnd);

    jsx.push(
      <table key={i}>
        <tbody>{addRowTags(rest[0])}</tbody>
      </table>
    );
    jsx.push(rest[1]);
  }
  return jsx;
};
