import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Row } from "antd";
import DoctorsList from "../components/DoctorsList";

const Home = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors from backend
  const getUserData = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center mt-2 display-6 font-weight-bold">
        Meet Our Specialist
        <hr className="text-purple border-2" />
      </h1>

      <Row gutter={[16, 16]} justify="center">
        {doctors &&
          doctors.map((doctor, index) => (
            // Pass the original doctor object + index for images
            <DoctorsList key={doctor._id} doctor={doctor} index={index} />
          ))}
      </Row>
    </Layout>
  );
};

export default Home;
