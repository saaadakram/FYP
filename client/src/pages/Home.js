import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Row } from "antd";
import DoctorsList from "../components/DoctorsList";
import API_BASE_URL from "../services/api";
import "../App.css";
const Home = () => {
  const [doctors, setDoctors] = useState([]);
  ////Login User DAta
  const getUserData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/getAllDoctors`, {
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
      <h1 className="  text-center mt-2 display-6 font-weight-bold            ">
        Meet Our Specialist <hr className=" text-purple border-2" />
      </h1>
      <Row style={{ margin: "-10px" }}>
        {[
          "/images/doc1.jpg",
          "/images/doc2.jpg",
          "/images/doc3.jpg",
          "/images/doc4.jpg",
          "/images/doc5.jpg",
          "/images/doc6.jpg",
        ].map((img, index) => (
          <div
            className="col-12 col-md-6 col-lg-4"
            key={index}
            style={{ padding: "10px" }}
          >
            <div
              style={{
                width: "100%",
                height: "250px",
                borderRadius: "10px",
                transition: "0.3s",
              }}
              className="image-container"
            >
              <img
                src={img}
                alt="Doctors"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: "10px",
                }}
                className="hover-blue-outline"
              />
            </div>
          </div>
        ))}

        {doctors &&
          doctors.map((doctor) => (
            <DoctorsList doctor={doctor} key={doctor._id} />
          ))}
      </Row>
    </Layout>
  );
};

export default Home;
