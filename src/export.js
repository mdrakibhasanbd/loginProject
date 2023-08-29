// // exportFile.js
// export function exportToCSV(data, fileName) {
//   // Add your CSV export logic here
//   console.log('Export to CSV:', data, fileName);
// }

// export function exportToXLSX(data, sheetName, fileName) {
//   // Add your XLSX export logic here
//   console.log('Export to XLSX:', data, sheetName, fileName);
// }

// export function exportToJSON(data, fileName) {
//   // Add your JSON export logic here
//   console.log('Export to JSON:', data, fileName);
// }

// export function printDocument(data, fileName) {
//   // Add your print logic here
//   console.log('Printing document...');
// }


import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'; // Use the named import for XLSX

export function exportToCSV(data, fileName) {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `${fileName}.csv`);
}

export function exportToXLSX(data, sheetName, fileName) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

export function exportToJSON(data, fileName) {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
  saveAs(blob, `${fileName}.json`);
}

export function printDocument() {
  // Add your print logic here
  window.print();
}

// Helper function to convert data to CSV format
function convertToCSV(data) {
  const header = Object.keys(data[0]).join(',');
  const rows = data.map((entry) => Object.values(entry).join(','));
  return [header, ...rows].join('\n');
}
