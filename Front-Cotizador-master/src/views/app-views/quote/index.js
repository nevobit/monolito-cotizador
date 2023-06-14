import React, { useEffect, useState, useContext } from "react";
import { Table, Input, Button, Popconfirm, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH, API_BASE_URL } from "configs/AppConfig";
import axios from "axios";
import Loading from "components/shared-components/Loading";
import searchTextInArray from "utils/search";
import antdTableSorter from "utils/sort";
import { jsPDF } from "jspdf";
import moment from "moment";
import "moment/locale/es";
import { UserContext } from "contexts/UserContext";
import ExportExcel from "utils/ExportExcel";
moment.locale("es");

const toDataURL = (url) =>
  fetch(url, { mode: "cors" })
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

const pdfGenerator = async (quote, user, setLoading) => {
  setLoading(true);
  //GET CUSTOMER
  let customer = quote.customer;
  try {
    const jwt = localStorage.getItem("jwt");
    const options = {
      url: API_BASE_URL + "/customer/" + customer._id,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "jwt-token": jwt,
      },
    };
    let res = await axios.request(options);
    customer = res.data;
  } catch (error) {
    console.log(error);
  }
  let doc = new jsPDF("p", "pt", "letter", true);
  //HEADER
  try {
    const logo = await toDataURL(`${API_BASE_URL}/image/${user.logo}`);
    doc.addImage(logo, "jpeg", 10, 10, 100, 100, undefined, "FAST");
  } catch {}
  try {
    const logo2 = await toDataURL(`${API_BASE_URL}/image/${user.logo2}`);
    doc.addImage(logo2, "jpeg", 250, 10, 350, 100, undefined, "FAST"); //7:2
  } catch {}
  doc.setFont("Helvetica");
  doc.setFontSize(10);
  if (user.mainColor) doc.setTextColor(user.mainColor);
  else doc.setTextColor("#000b57");
  doc.text(120, 20, user.name);
  if (user.businessName) doc.text(120, 35, user.businessName);
  if (user.phone) doc.text(120, 50, `Cel ${user.phone}`);
  if (user.address) doc.text(120, 65, user.address);
  if (user.webAddress) doc.text(120, 80, user.webAddress);
  doc.text(120, 95, user.email);
  if (user.nit) doc.text(120, 110, `NIT ${user.nit}`);
  //Customer and quote info
  doc.setFontSize(8);
  doc.rect(10, 130, 590, 65);
  doc.setFont("Helvetica", "bold");
  doc.text(15, 145, "FECHA:");
  doc.text(15, 160, "RAZON SOCIAL:");
  doc.text(15, 175, "CONTACTO:");
  doc.text(15, 190, "TELEFONO:");
  doc.text(200, 145, "CIUDAD:");
  doc.text(320, 145, "NIT:");
  doc.text(220, 175, "E-MAIL:");
  doc.text(220, 190, "VENDEDOR:");
  doc.text(425, 160, "TIEMPO DE ENTREGA:");
  doc.text(425, 175, "VALIDEZ DE LA PROPUESTA:");
  doc.text(425, 190, "FORMA DE PAGO:");
  if (user.secondaryColor) doc.setTextColor(user.secondaryColor);
  else doc.setTextColor("#fc6100");
  doc.text(425, 145, `COTIZACION No.${quote.quoteNumber}`);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor("#000");
  doc.text(
    80,
    145,
    moment(quote.createdAt).format("MMMM DD [DEL AÑO] YYYY").toUpperCase()
  );
  if (customer.businessName)
    doc.text(80, 160, customer.businessName.toUpperCase());
  if (customer.name) doc.text(80, 175, customer.name.toUpperCase());
  if (customer.phone)
    doc.text(80, 190, customer.phone.toString().toUpperCase());
  if (customer.address)
    doc.text(250, 145, customer.address.toString().toUpperCase());
  if (customer.nit) doc.text(350, 145, customer.nit.toString().toUpperCase());
  if (customer.email?.length > 28) doc.setFontSize(5.6);
  if (customer.email)
    doc.text(270, 175, customer.email.toString().toUpperCase());
  doc.setFontSize(8);
  if (customer.seller?.length > 28) doc.setFontSize(5.6);
  if (quote.seller) doc.text(270, 190, quote.seller.toString().toUpperCase());
  doc.setFontSize(8);
  if (
    quote.deliveryTime?.length > 12 ||
    quote.validityPeriod?.length > 12 ||
    quote.wayToPay?.length > 12
  )
    doc.setFontSize(6);
  if (quote.deliveryTime)
    doc.text(540, 160, quote.deliveryTime.toString().toUpperCase());
  if (quote.validityPeriod)
    doc.text(540, 175, quote.validityPeriod.toString().toUpperCase());
  if (quote.wayToPay)
    doc.text(540, 190, quote.wayToPay.toString().toUpperCase());
  doc.setFontSize(8);
  // Table with products
  doc.rect(10, 200, 190, 20);
  doc.rect(200, 200, 200, 20);
  doc.rect(400, 200, 50, 20);
  doc.rect(450, 200, 80, 20);
  doc.rect(530, 200, 70, 20);
  if (user.mainColor) doc.setTextColor(user.mainColor);
  else doc.setTextColor("#000b57");
  doc.setFont("Helvetica", "bold");
  doc.text(85, 212, "IMAGEN");
  doc.text(280, 212, "DESCRIPCIÓN");
  doc.text(405, 212, "CANTIDAD");
  doc.text(455, 212, "PRECIO UNITARIO");
  doc.text(535, 212, "PRECIO TOTAL");
  doc.setTextColor("#000");
  let height = 220;
  for (const item of quote.products) {
    if (height > 550) {
      doc.addPage();
      height = 15;
    }
    try {
      const logo = await toDataURL(
        `${
          item.product.photo[0] === "/"
            ? "https://catalogospromocionales.com" + item.product.photo
            : item.product.photo
        }`
      );
      doc.addImage(logo, "jpeg", 45, height + 15, 120, 120, undefined, "FAST");
    } catch {}
    doc.setFont("Helvetica", "bold");
    let height2 = height + 10;
    if (item.product.name) {
      let des = item.product.name;
      while (des.length > 45) {
        let j = 0;
        while (des[45 - j] !== " " && j < 45) {
          j++;
        }
        height2 += 10;
        doc.text(220, height2, des.slice(0, 45 - j));
        des = des.replace(des.slice(0, 45 - j + 1), "");
      }
      height2 += 10;
      doc.text(220, height2, des);
    }
    height2 += 10;
    if (item.product.sku) doc.text(220, height2, item.product.sku.toString());
    doc.setFont("Helvetica", "normal");
    let height3 = height + 20;
    if (item.product?.description) {
      let aux = item.product.description.replace(/&aacute;/gi, "á");
      aux = aux.replace(/&eacute;/gi, "é");
      aux = aux.replace(/&iacute;/gi, "í");
      aux = aux.replace(/&oacute;/gi, "ó");
      aux = aux.replace(/&uacute;/gi, "ú");
      aux = aux.replace(/&ntilde;/gi, "ñ");
      aux = aux.replace(/(<a)([\s\S]*?)(<\/a>)/gi, "");
      aux = aux.replace(/&nbsp;/gi, "");
      aux = aux.replace(/<span[\s\S]*?>|<\/span>/gi, "");
      aux = aux.replace(/<strong>|<\/strong>/gi, "");
      aux = aux.split("<br />\r\n");
      let aux2 = [];
      for (const text of aux) {
        aux2 = aux2.concat(text.split("\n"));
      }
      aux = aux2;
      height2 += 20;
      for (let i = 0; i < aux.length; i++) {
        let des = aux[i];
        while (des.length > 40) {
          let j = 0;
          while (des[40 - j] !== " " && j < 40) {
            j++;
          }
          height2 += 10;
          doc.text(220, height2, des.slice(0, 40 - j));
          des = des.replace(des.slice(0, 40 - j + 1), "");
        }
        height2 += 10;
        doc.text(220, height2, des);
      }
      doc.setTextColor("#ff0000");
      height2 += 5;
      aux = item.observations !== "" ? `Observacion: ${item.observations}` : "";
      aux = aux.split("\n");
      for (let i = 0; i < aux.length; i++) {
        let des = aux[i];
        while (des.length > 45) {
          height2 += 10;
          let j = 0;
          while (des[45 - j] !== " " && j < 45) {
            j++;
          }
          doc.text(220, height2, des.slice(0, 45 - j));
          des = des.replace(des.slice(0, 45 - j), "");
        }
        height2 += 10;
        doc.text(220, height2, des);
      }
      if (height2 - height > 150) {
        height3 = height2;
      }
    }
    doc.setTextColor("#000000");
    if (item.markings) {
      let height2 = height;
      for (const mark of item.markings) {
        doc.rect(400, height2, 200, 10);
        if (user.secondaryColor) doc.setTextColor(user.secondaryColor);
        else doc.setTextColor("#fc6100");
        if (mark.name) {
          if (mark.ink?.name) {
            doc.text(
              502,
              height2 + 8,
              `${mark.name} - ${mark.ink.name}`,
              "center"
            );
          } else doc.text(502, height2 + 8, mark.name, "center");
        } else doc.text(502, height2 + 8, "Sin marcacion", "center");
        height2 += 10;
        doc.setTextColor("#000");
        doc.text(445, height2 + 8, `${mark.amount}`, "right");
        if (mark.unitPrice !== null)
          doc.text(
            525,
            height2 + 8,
            `$ ${parseInt(mark.unitPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
            "right"
          );
        else doc.text(525, height2 + 8, `$ 0`, "right");
        if (mark.totalPrice !== null)
          doc.text(
            595,
            height2 + 8,
            `$ ${parseInt(mark.totalPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
            "right"
          );
        else doc.text(595, height2 + 8, `$ 0`, "right");
        height2 += 10;
      }
      if (height2 - height > 150) {
        height3 = height2;
      }
    }
    if (height3 - height > 150) {
      doc.rect(10, height, 190, height3 - height + 10);
      doc.rect(200, height, 200, height3 - height + 10);
      doc.rect(400, height, 200, height3 - height + 10);
      height += height3 - height + 10;
    } else {
      doc.rect(10, height, 190, 150);
      doc.rect(200, height, 200, 150);
      doc.rect(400, height, 200, 150);
      height += 150;
    }
  }
  height += 15;
  if (user.secondaryColor) doc.setTextColor(user.secondaryColor);
  else doc.setTextColor("#fc6100");
  doc.setFontSize(10);
  let aux = quote.generalObservations;
  aux = aux.split("\n");
  for (let i = 0; i < aux.length; i++) {
    let des = aux[i];
    while (des.length > 125) {
      height += 10;
      let j = 0;
      while (des[125 - j] !== " " && j < 125) {
        j++;
      }
      doc.text(10, height, des.slice(0, 125 - j));
      des = des.replace(des.slice(0, 125 - j), "");
      if (height >= 780) {
        doc.addPage();
        height = 10;
      }
    }
    if (height >= 780) {
      doc.addPage();
      height = 10;
    }
    height += 10;
    doc.text(10, height, des);
  }
  doc.save();
  setLoading(false);
};

const Actions = (_id, quote, user, deleteQuote, editQuote) => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading ? (
        <LoadingOutlined style={{ fontSize: "25px", marginRight: "15px" }} />
      ) : (
        <DownloadOutlined
          onClick={() => pdfGenerator(quote, user, setLoading)}
          style={{ fontSize: "25px", marginRight: "15px" }}
        />
      )}
      <EditOutlined
        onClick={() => editQuote(_id)}
        style={{ fontSize: "25px", marginRight: "15px" }}
      />
      <Popconfirm title="Sure to delete?" onConfirm={() => deleteQuote(_id)}>
        <DeleteOutlined style={{ fontSize: "25px" }} />
      </Popconfirm>
    </div>
  );
};
const Quotes = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [allQuotes, setAllQuotes] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const init = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const options = {
          url: API_BASE_URL + "/quote/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "jwt-token": jwt,
          },
        };
        const res = await axios.request(options);
        const reversedData = res.data.reverse();
        setQuotes(reversedData);
        setAllQuotes(reversedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    init();
    /* return () => {
      cleanup
    } */
  }, []);

  const editQuote = async (_id) => {
    history.push(APP_PREFIX_PATH + "/editquote/" + _id);
  };

  const deleteQuote = async (_id) => {
    setQuotes(quotes.filter((p) => p._id !== _id));
    try {
      const jwt = localStorage.getItem("jwt");
      const options = {
        url: API_BASE_URL + "/quote/" + _id,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "jwt-token": jwt,
        },
      };
      await axios.request(options);
      message.success({ content: "Successfully deleted quote", duration: 5 });
    } catch (error) {
      console.error(error);
    }
  };
  const columns = [
    {
      title: "Numero",
      dataIndex: "quoteNumber",
      key: "quoteNumber",
      sorter: (a, b) => antdTableSorter(a, b, "quoteNumber"),
    },
    {
      title: "Razón Social",
      dataIndex: "customer",
      key: "customer",
      render: (c) => <p>{c.businessName}</p>,
      sorter: (a, b) => antdTableSorter(a, b, "customer.businessName"),
    },
    {
      title: "Cliente",
      dataIndex: "customer",
      key: "customer",
      render: (c) => <p>{c.name}</p>,
      sorter: (a, b) => antdTableSorter(a, b, "customer.name"),
    },
    {
      title: "Fecha de creacion",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v) => <p>{moment(v).format("MMMM DD YYYY")}</p>,
      sorter: (a, b) => antdTableSorter(a, b, "createdAt"),
    },
    {
      title: "Tiempo de entrega",
      dataIndex: "deliveryTime",
      key: "deliveryTime",
      sorter: (a, b) => antdTableSorter(a, b, "deliveryTime"),
    },
    {
      title: "Forma de pago",
      dataIndex: "wayToPay",
      key: "wayToPay",
      sorter: (a, b) => antdTableSorter(a, b, "wayToPay"),
    },
    {
      title: "Acciones",
      dataIndex: "_id",
      key: "_id",
      render: (_id, quote) => Actions(_id, quote, user, deleteQuote, editQuote),
    },
  ];

  const search = (toSearch) => {
    if (toSearch.length > 0) {
      setQuotes(
        searchTextInArray(
          allQuotes,
          ["quoteNumber", "customer.name", "seller"],
          toSearch
        )
      );
    } else {
      setQuotes(allQuotes);
    }
  };

  if (loading) return <Loading cover="content" />;

  return (
    <div>
      <div
        style={{ flexDirection: "row", display: "flex", marginBottom: "20px" }}
      >
        <Input.Search
          allowClear
          placeholder="Search"
          onSearch={(value) => search(value)}
          style={{ marginRight: "4px" }}
          enterButton
        />
        <Button
          onClick={() => history.push(APP_PREFIX_PATH + "/addquote")}
          style={{ marginBottom: "20px" }}
        >
          Crear cotizacion
        </Button>
        <ExportExcel items={allQuotes} />
      </div>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: () => {
              editQuote(record._id);
            }, // click row
          };
        }}
        columns={columns}
        dataSource={quotes}
        rowKey="_id"
      />
    </div>
  );
};

export default Quotes;
