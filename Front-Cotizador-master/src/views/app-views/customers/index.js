import React, { useEffect, useRef, useState } from "react";
import { Table, Input, Button, Popconfirm, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH, API_BASE_URL } from "configs/AppConfig";
import axios from "axios";
import Loading from "components/shared-components/Loading";
import searchTextInArray from "utils/search";
import antdTableSorter from "utils/sort";
import ExportExcel from "../../../utils/ExportExcel";

const Actions = ({ _id, deleteCustomer, editCustomer, nit }) => {
  return (
    <div>
      <EditOutlined
        onClick={() => editCustomer(_id)}
        style={{ fontSize: "25px", marginRight: "15px" }}
      />
      <Popconfirm title="Sure to delete?" onConfirm={() => deleteCustomer(_id)}>
        <DeleteOutlined style={{ fontSize: "25px" }} />
      </Popconfirm>
      <a href={nit} target="_blank" rel="noopener noreferrer">
        <DownloadOutlined
          style={{ fontSize: "25px", marginLeft: "15px", color: "black" }}
        />
      </a>
    </div>
  );
};

const Customers = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [urlPDF, setUrlPDF] = useState("");

  console.log(allCustomers);

  useEffect(() => {
    const init = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const options = {
          url: API_BASE_URL + "/customer/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "jwt-token": jwt,
          },
        };
        const res = await axios.request(options);
        const reversedData = res.data.reverse();
        setCustomers(reversedData);
        setAllCustomers(reversedData);
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

  const editCustomer = async (_id) => {
    history.push(APP_PREFIX_PATH + "/editcustomer/" + _id);
  };

  const deleteCustomer = async (_id) => {
    const filteredCustomers = customers.filter((p) => p._id !== _id).reverse();
    setCustomers(filteredCustomers);
    setAllCustomers(filteredCustomers);

    try {
      const jwt = localStorage.getItem("jwt");
      const options = {
        url: API_BASE_URL + "/customer/" + _id,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "jwt-token": jwt,
        },
      };
      await axios.request(options);
      message.success({
        content: "Successfully deleted customer",
        duration: 5,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const columns = [
    {
      title: "Razon Social",
      dataIndex: "businessName",
      key: "businessName",
      sorter: (a, b) => antdTableSorter(a, b, "name"),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => antdTableSorter(a, b, "name"),
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => antdTableSorter(a, b, "email"),
    },
    {
      title: "Telefono",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => antdTableSorter(a, b, "email"),
    },
    {
      title: "Acciones",
      dataIndex: "_id",
      key: "_id",
      render: (_id, record) =>
      Actions({ _id, deleteCustomer, editCustomer, nit: record.nit }),
    },
  ];

  const search = (toSearch) => {
    if (toSearch.length > 0) {
      setCustomers(
        searchTextInArray(
          allCustomers,
          ["businessName", "name", "email"],
          toSearch
        )
      );
    } else {
      setCustomers(allCustomers);
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
          onClick={() => history.push(APP_PREFIX_PATH + "/addcustomer")}
          style={{ marginBottom: "20px" }}
        >
          Crear cliente
        </Button>
        <ExportExcel items={allCustomers} />
      </div>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: () => {
              editCustomer(record._id);
            }, // click row
          };
        }}
        columns={columns}
        dataSource={customers}
        rowKey="_id"
      />
    </div>
  );
};

export default Customers;
