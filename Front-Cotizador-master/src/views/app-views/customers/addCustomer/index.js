import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Card, message } from "antd";
import { APP_PREFIX_PATH, API_BASE_URL } from "configs/AppConfig";
import axios from "axios";


const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const validateMessages = {
  required: "This field is required!",
  types: {
    email: "Not a validate email!",
    number: "Not a validate number!",
  },
  number: {
    // eslint-disable-next-line
    range: "Must be between ${min} and ${max}",
  },
};

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key])) // eslint-disable-next-line
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

const AddCustomer = ({ history }) => {
  const [nitUrl, setNitUrl] = useState("");

  const handleNitFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "r9rqkvzr");

      try {
        const res = axios
          .post(
            "https://api.cloudinary.com/v1_1/matosr96/image/upload",
            formData
          )
          .then((response) => {
            console.log(
              "Archivo subido exitosamente a Cloudinary:",
              response.data
            );
            console.log("URL DEL PDF", response.data.url);
            setNitUrl(response.data.url);
          });
      } catch (error) {
        console.error("Error al subir el archivo a Cloudinary:", error);
      }
    }
  };
  const onFinish = async (formData) => {
    const {
      webAddressTesoreria,
      webAddressPagoProveedor,
      webAddressFacturacionElectronica,
      webAddressSolicitudCertificados,
      deliveryAddress,
      deliveryContact,
    } = formData;

    const dataForm = {
      webAddress: {
        tesoreria: webAddressTesoreria,
        pagoProveedor: webAddressPagoProveedor,
        facturacionElectronica: webAddressFacturacionElectronica,
        solicitudCertificados: webAddressSolicitudCertificados,
      },
      deliveryAddress,
      deliveryContact,
    };

    const jsonData = JSON.stringify(dataForm);

    let data = Object.filter(formData, (item) => item !== undefined);

    const jwt = localStorage.getItem("jwt");
    try {
      const options = {
        url: API_BASE_URL + "/customer/",
        method: "POST",
        data: { ...data, webAddress: jsonData, nit: nitUrl },
        headers: {
          "Content-Type": "application/json",
          "jwt-token": jwt,
        },
      };
      await axios.request(options);
      message.success({ content: "Cliente creado con exito" });
      history.push(APP_PREFIX_PATH + "/customers");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <Form
        {...layout}
        name="add-customer"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["businessName"]}
          label="Razon social"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={["name"]} label="Contacto">
          <Input />
        </Form.Item>
        <Form.Item name={["email"]} label="Correo" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item name={["phone"]} label="Celular">
          <InputNumber style={{ width: "200px" }} />
        </Form.Item>
        <Form.Item name={["webAddressTesoreria"]} label="E-mail de tesoreria">
          <Input />
        </Form.Item>
        <Form.Item
          name={["webAddressPagoProveedor"]}
          label="E-mail pago proveedor"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["webAddressFacturacionElectronica"]}
          label="E-mail facturacion electronica"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["webAddressSolicitudCertificados"]}
          label="E-mail solicititud certificados"
        >
          <Input />
        </Form.Item>
        <Form.Item name={["deliveryAddress"]} label="Direccion de entrega">
          <Input />
        </Form.Item>
        <Form.Item name={["deliveryContact"]} label="Contacto de entrega">
          <Input />
        </Form.Item>
        <Form.Item name={["address"]} label="Ciudad">
          <Input />
        </Form.Item>
        <Form.Item name={["nit"]} label="NIT">
          <div>
            <input type="file" accept=".pdf" onChange={handleNitFileChange} />
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Crear
          </Button>
          <Button
            type="ghost"
            onClick={() => history.push(APP_PREFIX_PATH + "/customers")}
            style={{ marginLeft: "15px" }}
          >
            Volver
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddCustomer;
