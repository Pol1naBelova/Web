import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table as AntTable, Button } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  country: string;
  name: string;
  house: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Страна",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Название школы",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Название города",
    dataIndex: "house",
    key: "house",
  },
];

const Table: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const getUniversity = async (page: number, limit: number) => {
    try {
      const offset = (page - 1) * limit;
      const response = await axios.get(`http://universities.hipolabs.com/search?offset=${offset}&limit=${limit}`);
      setDataSource(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    getUniversity(currentPage, 10);
  }, [currentPage]);

  return (
    <div>
      <AntTable dataSource={dataSource} columns={columns} pagination={false} />
      <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
        Назад
      </Button>
      <Button onClick={goToNextPage}>Вперед</Button>
    </div>
  );
};

export default Table;
