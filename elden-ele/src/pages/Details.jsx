import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import UserContact from "../components/UserContact";
import Image1 from "../assets/ilan2.jpg";
import Image2 from "../assets/ilan1.jpg";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import VehicleDetails from "./categorizedDetails/VehicleDetails";
import ResidenceDetails from "./categorizedDetails/ResidenceDetails";
import FashionDetails from "./categorizedDetails/FashionDetails";
import HomeAndGardenDetails from "./categorizedDetails/HomeAndGardenDetails";
import SecondHandDetails from "./categorizedDetails/SecondHandDetails";
import SparePartDetails from "./categorizedDetails/SparePartDetails";
import ElectronicDetails from "./categorizedDetails/ElectronicDetails";

function Details(props) {
  const [data, setData] = useState({});
  const { id } = useParams();
  const { categoryName } = data;
  let categorizedDetailsComponent;

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const response = await axios.get(`http://localhost:3000/get/${id}`);
        const data = response.data;
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [activePhoto, setActivePhoto] = useState(Image1);

  const handlePhoto = useCallback((photo) => {
    setActivePhoto(photo);
  }, []);

  const handleTabClick = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  if (!data) {
    return <div>Loading...</div>; // Veri yüklenene kadar yüklenme durumunu göster
  }

  switch (categoryName) {
    case "Vasita" || "Vasıta":
      categorizedDetailsComponent = <VehicleDetails data={data} />;
      break;
    case "Emlak" || "emlak":
      categorizedDetailsComponent = <ResidenceDetails data={data} />;
      break;

    case "Elektronik":
      categorizedDetailsComponent = <ElectronicDetails data={data} />;
      break;
    case "Moda":
      categorizedDetailsComponent = <FashionDetails data={data} />;
      break;

    case "YedekParca":
      categorizedDetailsComponent = <SparePartDetails data={data} />;
      break;
    case "EvBahce":
      categorizedDetailsComponent = <HomeAndGardenDetails data={data} />;
      break;
    case "İkinciEl":
      categorizedDetailsComponent = <SecondHandDetails data={data} />;
      break;
    default:
      categorizedDetailsComponent = null;
  }

  return (
    <>
      <Navbar isScrolled={isScrolled} />
      <Container className="container">
        <h1>{data.title}</h1>
        <hr />
        <div className="row">
          <div>
            <b>Kategori: </b>
            <Link to="/category">{data.categoryName}</Link>
          </div>
          <div className="col-md-6">
            <div>
              <img
                className={`${activePhoto === Image1 ? "active" : ""}`}
                onClick={() => handlePhoto(Image1)}
                src={Image1}
                alt="Image1"
                style={{ width: "90%", height: "90%" }}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="d-flex justify-content-start">
              <h5>
                <b>Fiyat:</b>
              </h5>
              <h5 style={{ marginLeft: "20px" }} className="text-primary">
                {data.price}
              </h5>
            </div>
            <div className="bread">
              <nav aria-label="breadcrumb">
                <ol style={{ backgroundColor: "white" }} className="breadcrumb">
                  <li className="breadcrumb-item">Aydın</li>
                  <li className="breadcrumb-item">Germencik</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Turanlar Mah.
                  </li>
                </ol>
              </nav>
            </div>
            <Divider />
            <div className="d-flex flex-nowrap justify-content-between">
              <b>İlan No</b>
              <p>201354</p>
            </div>
            <Divider />
            <div className="d-flex flex-nowrap justify-content-between">
              <b>İlan Tarihi</b>
              <p>{data.dateCreated}</p>
            </div>
            <Divider />
            {categorizedDetailsComponent}
          </div>
          <UserContact data={data} />
        </div>
        <br />
        <div className="row">
          <div className="container">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "about" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("about")}
                >
                  İlan Açıklaması
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className={`tab-pane fade ${
                  activeTab === "about" ? "show active" : ""
                }`}
                id="about"
                role="tabpanel"
                aria-labelledby="about-tab"
              >
                {data.description}
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "specification" ? "show active" : ""
                }`}
                id="specification"
                role="tabpanel"
                aria-labelledby="specification-tab"
              >
                Supra modifiye edilebilir bir arabadır. Her türden modifiye
                yapılabilir.
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  margin-top: 100px;
`;

const Divider = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 2px 0;
`;

export default Details;
