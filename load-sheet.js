/**
 * Googleスプレッドシートのデータを読み込み、HTMLのtableに表示する関数
 * 
 * @param {string} sheetName - スプレッドシート内のシート名
 * @param {string} range - 読み込みたいセル範囲（例: "A1:H20"）
 * @param {string} tableId - 表を表示するHTML要素のid
 */
function loadSheet(sheetName, range, tableId) {
  const sheetId = "1Hon85uZqMAEe4Od54YcJAJ7Lyb2GeF0w7ElP3eLFDcc"; // 固定ID（このスプレッドシート専用）

  // Google Sheets APIのURLを作成
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${encodeURIComponent(sheetName)}&range=${range}`;

  fetch(url)
    .then(res => res.text())
    .then(rep => {
      const jsonData = JSON.parse(rep.substring(47, rep.length - 2)); // JSONP→JSON
      const table = document.getElementById(tableId);
      const rows = jsonData.table.rows;

      // 表をクリア（再読み込み対応）
      table.innerHTML = "";

      rows.forEach(row => {
        const tr = document.createElement("tr");
        row.c.forEach(cell => {
          const td = document.createElement("td");
          td.textContent = cell ? cell.v : ""; // nullの場合は空
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("データの読み込みに失敗しました:", err);
    });
}

