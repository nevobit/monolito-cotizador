import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Card, message } from "antd";
import { APP_PREFIX_PATH, API_BASE_URL } from "configs/AppConfig";
import axios from "axios";
import Loading from "components/shared-components/Loading";

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

const EditCustomer = ({ history, match }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nitUrl, setNitUrl] = useState("");
  const customerId = match.params.customerid;

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

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const options = {
          url: API_BASE_URL + "/customer/" + customerId,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "jwt-token": jwt,
          },
        };
        const response = await axios.request(options);
        const customerData = response.data;
        console.log("QUE LLEGA", customerData);

        let dataForm = {};
        if (customerData?.webAddress) {
          const { webAddress } = customerData;
          dataForm = JSON.parse(webAddress || "{}");
          const {
            deliveryAddress,
            deliveryContact,
            webAddress: dataWeb,
          } = dataForm;
          const {
            facturacionElectronica,
            pagoProveedor,
            solicitudCertificados,
            tesoreria,
          } = dataWeb;
          const transformedData = {
            ...customerData,
            webAddressTesoreria: tesoreria,
            webAddressPagoProveedor: pagoProveedor,
            webAddressFacturacionElectronica: facturacionElectronica,
            webAddressSolicitudCertificados: solicitudCertificados,
            deliveryAddress,
            deliveryContact,
          };
          setCustomer(transformedData);
          setLoading(false);
        } else {
          console.log("ELSE", customerData);
          setCustomer(customerData);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const onFinish = async (form) => {
    setLoading(true);
    let data = Object.filter(form, (item) => item !== undefined);

    const dataForm = {
      webAddress: {
        tesoreria: form.webAddressTesoreria,
        pagoProveedor: form.webAddressPagoProveedor,
        facturacionElectronica: form.webAddressFacturacionElectronica,
        solicitudCertificados: form.webAddressSolicitudCertificados,
      },
      deliveryAddress: form.deliveryAddress,
      deliveryContact: form.deliveryContact,
    };

    console.log("LINEA 101", dataForm);

    const jsonData = JSON.stringify(dataForm);

    data = {
      ...data,
      webAddress: jsonData,
      _id: customerId,
      nit: nitUrl != "" ? nitUrl : customer.nit,
    };

    data._id = customerId;
    const jwt = localStorage.getItem("jwt");
    try {
      const options = {
        url: API_BASE_URL + "/customer/",
        method: "PUT",
        data,
        headers: {
          "Content-Type": "application/json",
          "jwt-token": jwt,
        },
      };
      await axios.request(options);
      message.success({ content: "Cliente editado con éxito" });
      setLoading(false);
      history.push(APP_PREFIX_PATH + "/customers");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  if (loading) return <Loading cover="content" />;

  return (
    <Card>
      <Form
        {...layout}
        name="add-customer"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={{ ...customer }}
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
        <Form.Item name={["phone"]} label="Telefono">
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
          label="E-mail solicitud certificados"
        >
          <Input />
        </Form.Item>
        <Form.Item name={["deliveryAddress"]} label="Dirección de entrega">
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
            Guardar
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

export default EditCustomer;
