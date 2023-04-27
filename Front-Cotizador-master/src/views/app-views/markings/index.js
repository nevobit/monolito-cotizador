import React, { useEffect, useState } from "react";
import { Table, Input, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { APP_PREFIX_PATH, API_BASE_URL } from "configs/AppConfig";
import axios from "axios";
import Loading from "components/shared-components/Loading";
import searchTextInArray from "utils/search";
import antdTableSorter from "utils/sort";
import ExportExcel from "utils/ExportExcel";

const Actions = (id, deleteMarking, editMarking, selectMarking) => {
  return (
    <div>
      <EditOutlined
        onClick={() => editMarking(id)}
        style={{ fontSize: "25px", marginRight: "15px" }}
      />
      <Popconfirm title="Sure to delete?" onConfirm={() => deleteMarking(id)}>
        <DeleteOutlined style={{ fontSize: "25px" }} />
      </Popconfirm>
    </div>
  );
};

const expandedRowRender = ({ inks, ranges }) => {
  const columns = inks
    ? [
        {
          title: "Tintas",
          children: [
            {
              title: "Nombre tinta",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Precio Minimo",
              dataIndex: "minTotalPrice",
              key: "minTotalPrice",
            },
            {
              title: "Precio unitario fuera de rango",
              dataIndex: "outOfRangePrice",
              key: "outOfRangePrice",
            },
            {
              title: "Rangos",
              dataIndex: "ranges",
              key: "ranges",
              render: (r) => <div>{r.length}</div>,
            },
          ],
        },
      ]
    : ranges
    ? [
        {
          title: "Rangos",
          children: [
            {
              title: "Desde",
              dataIndex: "min",
              key: "min",
            },
            {
              title: "Hasta",
              dataIndex: "max",
              key: "max",
            },
            {
              title: "Precio unitario",
              dataIndex: "price",
              key: "price",
            },
          ],
        },
      ]
    : [];

  return (
    <Table
      columns={columns}
      dataSource={inks ? inks : ranges}
      rowKey={"_id"}
      expandable={inks ? { expandedRowRender } : null}
    />
  );
};

const Markings = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [markings, setMarkings] = useState([]);
  const [allMarkings, setAllMarkings] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const options = {
          url: API_BASE_URL + "/marking/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "jwt-token": jwt,
          },
        };
        const res = await axios.request(options);
        const aux = res.data.map((marking) => ({
          ...marking,
          key: marking.id,
        }));
        setMarkings(aux);
        setAllMarkings(aux);
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

  const editMarking = async (id) => {
    history.push(APP_PREFIX_PATH + "/editmarking/" + id);
  };

  const deleteMarking = async (id) => {
    setMarkings(markings.filter((p) => p._id !== id));
    try {
      const jwt = localStorage.getItem("jwt");
      const options = {
        url: API_BASE_URL + "/marking/" + id,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "jwt-token": jwt,
        },
      };
      await axios.request(options);
      message.success({ content: "Successfully deleted marking", duration: 5 });
    } catch (error) {
      console.error(error);
    }
  };
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => antdTableSorter(a, b, "name"),
    },
    {
      title: "Tintas",
      dataIndex: "inks",
      key: "inks",
      render: (r) => <div>{r.length}</div>,
    },
    {
      title: "Acciones",
      dataIndex: "_id",
      key: "_id",
      render: (id) => Actions(id, deleteMarking, editMarking, selectMarking),
    },
  ];

  const search = (toSearch) => {
    if (toSearch.length > 0) {
      setMarkings(searchTextInArray(allMarkings, ["name"], toSearch));
    } else {
      setMarkings(allMarkings);
    }
  };

  const selectMarking = (id, index) => {
    history.push(APP_PREFIX_PATH + "/sessions/" + id);
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
          onClick={() => history.push(APP_PREFIX_PATH + "/addmarking")}
          style={{ marginBottom: "20px" }}
        >
          Crear marcación
        </Button>
        <ExportExcel items={allMarkings} />
      </div>
      <Table
        expandable={{ expandedRowRender }}
        columns={columns}
        dataSource={markings}
        rowKey="_id"
      />
    </div>
  );
};

export default Markings;
