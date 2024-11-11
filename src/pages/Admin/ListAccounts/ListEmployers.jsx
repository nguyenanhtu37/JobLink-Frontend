import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getAllEmployers, getUserById } from "../../../Api/api"; // Make sure to implement getEmployerById

const ListEmployers = () => {
    const [dataEmployers, setDataEmployers] = useState([]);
    const [dataEmployer, setDataEmployer] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getAllEmployers();
            setDataEmployers(res.map(employer => ({ ...employer, key: employer._id }))); // Ensure each employer has a unique key
        } catch (error) {
            console.error("Error fetching employers:", error);
        }
    };

    const fetchEmployer = async (employerId) => {
        try {
            const res = await getUserById(employerId); // Fetch the specific employer by ID
            setDataEmployer(res);
            setIsModalVisible(true);
        } catch (error) {
            console.error("Error fetching employer:", error);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setDataEmployer(null);
    };

    const columns = [
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Actions",
            key: "action",
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => fetchEmployer(record._id)}>
                        View
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <div className="list-accounts" style={{ width: "100%", padding: "30px" }}>
                <div className="title" style={{ fontSize: "30px", fontWeight: "700", marginBottom: "50px" }}>
                    List Employers
                </div>
                <Table columns={columns} dataSource={dataEmployers} />
            </div>

            <Modal
                title="Employer Details"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={[
                    <Button key="close" onClick={handleModalClose}>
                        Close
                    </Button>,
                ]}
            >
                {dataEmployer && (
                    <div>
                        <p><strong>Email:</strong> {dataEmployer.email}</p>
                        <p><strong>Username:</strong> {dataEmployer.username}</p>
                        {/* Add more details as needed */}
                    </div>
                )}
            </Modal>
        </>
    );
};

export default ListEmployers;
