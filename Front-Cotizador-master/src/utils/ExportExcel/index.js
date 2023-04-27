import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportExcel = ({ items }) => {
  const headers = [];
  headers.push(...Object.keys(items[0]));
  for (const key in items[0]) {
    if (Array.isArray(items[0][key])) {
      const subHeaders = Object.keys(items[0][key][0]).map(
        (subKey) => `${key}.${subKey}`
      );
      headers.push(...subHeaders);
    }
  }

  const convertToXLSX = (data) => {
    const sheetName = "Document";
    const sheetData = items.map((item) => {
      const rowData = {};
      headers.forEach((header) => {
        if (header.includes(".")) {
          const [parentKey, childKey] = header.split(".");
          rowData[header] = item[parentKey]?.[0][childKey] || "";
        } else {
          rowData[header] = item[header] || "";
        }
      });
      return rowData;
    });

    const sheet = XLSX.utils.json_to_sheet(sheetData, { header: headers });
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, sheetName);
    const excelBuffer = XLSX.write(book, { bookType: "xlsx", type: "array" });
    return excelBuffer;
  };

  const exportToExcel = () => {
    const excelBuffer = convertToXLSX(items);
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "document.xlsx");
  };

  return (
    <Button onClick={exportToExcel} style={{ marginLeft: "4px" }}>
      <DownloadOutlined />
    </Button>
  );
};

export default ExportExcel;
