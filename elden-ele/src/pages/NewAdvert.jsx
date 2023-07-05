import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";
import FileBase64 from "react-file-base64";
import axios from "axios";

function NewAdvert() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [categoryName, setCategory] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const userId = localStorage.getItem("userId");
  //fotoğraf
  const [item, setItem] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  //kategorilere göre alanları almak için
  const [car, setCar] = useState({
    marka: "",
    seri: "",
    model: "",
    yil: "",
    vites: "",
    agirhasarkayit: "evet",
    kasatipi: "",
    motorgucu: "",
    motorhacmi: "",
    renk: "",
    durumu: "sifir",
    garanti: "evet",
  });

  const [residence, setResidence] = useState({
    odaSayisi: "",
    binaYasi: 0,
    katSayisi: 0,
    isitma: "",
    banyoSayisi: 0,
    balkon: "hayir",
    esyali: "hayir",
    siteIcerisinde: "hayir",
    aidatBilgileri: "",
  });

  const [homeAndGarden, setHomeAndGarden] = useState({
    malzeme: "",
    turu: "",
    marka: "",
    renk: "",
    durumu: "sifir",
    garanti: "evet",
  });

  const [elektronik, setElektronik] = useState({
    marka: "",
    model: "",
    turu: "telefon",
    renk: "",
    garanti: "evet",
  });

  const [moda, setModa] = useState({
    marka: "",
    turu: "icGiyim",
    renk: "",
    tarz: "sport",
    malzeme: "",
  });

  const [yedekParca, setYedekParca] = useState({
    marka: "",
    model: "",
    parcaAdi: "",
    parcaNumarasi: "",
    durumu: "yeni",
  });

  const [ikinciEl, setIkinciEl] = useState({
    marka: "",
    model: "",
    durumu: "iyi",
    takas: "evet",
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    switch (categoryName) {
      case "İkinciEl" || "IkinciEl":
        setIkinciEl((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;

      case "YedekParca":
        setYedekParca((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;

      case "Moda":
        setModa((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;

      case "Elektronik":
        setElektronik((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;

      case "EvBahce":
        setHomeAndGarden((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;

      case "Vasita" || "Vasıta":
        setCar((prevCar) => ({
          ...prevCar,
          [name]: value,
        }));
        break;

      case "Emlak" || "emlak":
        setResidence((prevRes) => ({
          ...prevRes,
          [name]: value,
        }));
        break;

      default:
        console.log("Geçersiz kategori");
    }
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  //ilanı veritabanına gönderen kod
  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemData = new FormData();
    itemData.append("title", title);
    itemData.append("image", item);
    //ortak alanlar için kod parçası
    const commonFields = {
      userId: userId,
      title: title,
      description: description,
      price: price,
      status: status,
      categoryName: categoryName,
      image: item,
    };
    // ilanlara özel alanlar
    const newCarAdvert = {
      ...commonFields,
      marka: car.marka,
      seri: car.seri,
      model: car.model,
      yil: car.yil,
      vites: car.vites,
      agirhasarkayit: car.agirhasarkayit,
      kasatipi: car.kasatipi,
      motorgucu: car.motorgucu,
      motorhacmi: car.motorhacmi,
      renk: car.renk,
      durumu: car.durumu,
      garanti: car.garanti,
    };
    const newResidenceAdvert = {
      ...commonFields,
      odaSayisi: residence.odaSayisi,
      binaYasi: residence.binaYasi,
      katSayisi: residence.katSayisi,
      isitma: residence.isitma,
      banyoSayisi: residence.banyoSayisi,
      balkon: residence.balkon,
      esyali: residence.esyali,
      siteIcerisinde: residence.siteIcerisinde,
      aidatBilgileri: residence.aidatBilgileri,
    };
    const newHomeAndGardenAdvert = {
      ...commonFields,
      malzeme: homeAndGarden.malzeme,
      turu: homeAndGarden.turu,
      marka: homeAndGarden.marka,
      renk: homeAndGarden.renk,
      durumu: homeAndGarden.durumu,
      garanti: homeAndGarden.garanti,
    };

    const newElektronikAdvert = {
      ...commonFields,
      marka: elektronik.marka,
      model: elektronik.model,
      turu: elektronik.turu,
      renk: elektronik.renk,
      garanti: elektronik.garanti,
    };

    const newModaAdvert = {
      ...commonFields,
      marka: moda.marka,
      turu: moda.turu,
      renk: moda.renk,
      tarz: moda.tarz,
      malzeme: moda.malzeme,
    };

    const newYedekParca = {
      ...commonFields,
      marka: yedekParca.marka,
      model: yedekParca.model,
      parcaAdi: yedekParca.parcaAdi,
      parcaNumarasi: yedekParca.parcaNumarasi,
      durumu: yedekParca.durumu,
    };
    const newIkinciEl = {
      ...commonFields,
      marka: ikinciEl.marka,
      model: ikinciEl.model,
      durumu: ikinciEl.durumu,
      takas: ikinciEl.takas,
    };

    console.log(newCarAdvert);

    //ilan kategorisine göre ilanın gönderilmesi
    switch (categoryName) {
      case "Vasita" || "Vasıta":
        try {
          //fotoğrafı yüklemek için post requesti
          const image = await axios.post(
            "http://localhost:3000/image",
            itemData
          );
          // ilanı yüklemek için post requesti
          const vehicle = await axios.post(
            "http://localhost:3000/newadd",
            newCarAdvert
          );
          console.log(vehicle.data);
        } catch (error) {
          console.log(error);
        }
        break;
      case "Emlak" || "emlak":
        try {
          const image = await axios.post(
            "http://localhost:3000/image",
            itemData
          );

          const response = await axios.post(
            "http://localhost:3000/newadd",
            newResidenceAdvert
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
        break;

      case "Elektronik":
        try {
          const image = await axios.post(
            "http://localhost:3000/image",
            itemData
          );

          const response = await axios.post(
            "http://localhost:3000/newadd",
            newElektronikAdvert
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
        break;
      case "Moda":
        try {
          const image = await axios.post(
            "http://localhost:3000/image",
            itemData
          );

          const response = await axios.post(
            "http://localhost:3000/newadd",
            newModaAdvert
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
        break;

      case "YedekParca":
        try {
          const image = await axios.post(
            "http://localhost:3000/image",
            itemData
          );

          const response = await axios.post(
            "http://localhost:3000/newadd",
            newYedekParca
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
        break;
      case "EvBahce":
        try {
          const image = await axios.post(
            "http://localhost:3000/image",
            itemData
          );

          const response = await axios.post(
            "http://localhost:3000/newadd",
            newHomeAndGardenAdvert
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
        break;
      case "İkinciEl" || "IkinciEl":
        try {
          const image = await axios.post(
            "http://localhost:3000/image",
            itemData
          );

          const response = await axios.post(
            "http://localhost:3000/newadd",
            newIkinciEl
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
        break;
      default:
    }

    alert("İlan başarıyla kaydedildi.");

    setTitle("");
    setDescription("");
    setPrice("");
    setStatus("");
    setItem(null);
    setErrorMessage("");
    setCategory("");
  };

  return (
    <Container>
      <div className="container">
        <Navbar isScrolled={isScrolled} />
        <Content>
          <h1 className="custom-title">Hadi Ürününü Satalım!</h1>

          <style>
            {`
                    .input-field {
                        background-color: #f2f2f2;
                        color: #333;
                        padding: 10px;
                        border-radius: 5px;
                        border: none;
                        width: 100%;
                    }
                    .input-field::placeholder {
                        color: #999;
                    }
                    .custom-title {
                        background-color: white;
                        color: #e6cc00;
                        padding: 10px;
                        border-radius: 5px;
                        border: none;
                        width: 100%;
                        margin: 0;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .image-upload {
                        margin-bottom: 10px;
                        color: #999;
                    }
                `}
          </style>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="title">Başlık:</label>
            <input
              className="input-field"
              type="text"
              id="title"
              value={title}
              placeholder="Ürün Başlığı"
              onChange={handleTitleChange}
            />
            <label htmlFor="categoryName">İlan Türü:</label>
            <select
              id="categoryName"
              className="input-field"
              value={categoryName}
              onChange={handleCategoryChange}
            >
              <option value="">Seçiniz</option>
              <option value="Emlak">Emlak</option>
              <option value="Vasita">Vasıta</option>
              <option value="EvBahce">Ev & Bahçe</option>
              <option value="Elektronik">Elektronik</option>
              <option value="Moda">Moda</option>
              <option value="YedekParca">Yedek Parça</option>
              <option value="İkinciEl">İkinci El</option>
            </select>
            {categoryName === "Emlak" && (
              <PropertyContainer>
                <div>
                  <label htmlFor="odaSayisi">Oda Sayısı:</label>
                  <input
                    type="number"
                    name="odaSayisi"
                    value={residence.odaSayisi}
                    onChange={handleFieldChange}
                    id="odaSayisi"
                  />
                </div>

                <div>
                  <label htmlFor="binaYasi">Bina Yaşı:</label>
                  <input
                    type="number"
                    name="binaYasi"
                    value={residence.binaYasi}
                    onChange={handleFieldChange}
                    id="binaYasi"
                  />
                </div>

                <div>
                  <label htmlFor="katSayisi">Kat Sayısı:</label>
                  <input
                    type="number"
                    name="katSayisi"
                    value={residence.katSayisi}
                    onChange={handleFieldChange}
                    id="katSayisi"
                  />
                </div>

                <div>
                  <label htmlFor="isitma">Isıtma:</label>
                  <input
                    type="text"
                    name="isitma"
                    value={residence.isitma}
                    onChange={handleFieldChange}
                    id="isitma"
                  />
                </div>

                <div>
                  <label htmlFor="banyoSayisi">Banyo Sayısı:</label>
                  <input
                    type="number"
                    name="banyoSayisi"
                    value={residence.banyoSayisi}
                    onChange={handleFieldChange}
                    id="banyoSayisi"
                  />
                </div>

                <div>
                  <label htmlFor="balkon">Balkon:</label>
                  <select
                    name="balkon"
                    value={residence.balkon}
                    onChange={handleFieldChange}
                    id="balkon"
                  >
                    <option value="evet">Evet</option>
                    <option value="hayir">Hayır</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="esyali">Eşyalı:</label>
                  <select
                    name="esyali"
                    value={residence.esyali}
                    onChange={handleFieldChange}
                    id="esyali"
                  >
                    <option value="evet">Evet</option>
                    <option value="hayir">Hayır</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="siteIcerisinde">Site İçerisinde:</label>
                  <select
                    name="siteIcerisinde"
                    value={residence.siteIcerisinde}
                    onChange={handleFieldChange}
                    id="siteIcerisinde"
                  >
                    <option value="evet">Evet</option>
                    <option value="hayir">Hayır</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="aidatBilgileri">Aidat Bilgileri:</label>
                  <input
                    type="text"
                    name="aidatBilgileri"
                    value={residence.aidatBilgileri}
                    onChange={handleFieldChange}
                    id="aidatBilgileri"
                  />
                </div>
              </PropertyContainer>
            )}
            {categoryName === "Vasita" && (
              <PropertyContainer>
                <div>
                  <label htmlFor="marka">Marka:</label>
                  <input
                    type="text"
                    name="marka"
                    value={car.marka}
                    onChange={handleFieldChange}
                    id="marka"
                  />
                </div>

                <div>
                  <label htmlFor="seri">Seri:</label>
                  <input
                    type="text"
                    name="seri"
                    value={car.seri}
                    onChange={handleFieldChange}
                    id="seri"
                  />
                </div>

                <div>
                  <label htmlFor="model">Model:</label>
                  <input
                    type="text"
                    name="model"
                    value={car.model}
                    onChange={handleFieldChange}
                    id="model"
                  />
                </div>

                <div>
                  <label htmlFor="yil">Yıl:</label>
                  <input
                    type="number"
                    name="yil"
                    value={car.yil}
                    onChange={handleFieldChange}
                    id="yil"
                  />
                </div>

                <div>
                  <label htmlFor="vites">Vites:</label>
                  <input
                    type="text"
                    name="vites"
                    value={car.vites}
                    onChange={handleFieldChange}
                    id="vites"
                  />
                </div>

                <div>
                  <label htmlFor="agirhasarkayit">Ağır Hasar Kayıtlı:</label>
                  <select
                    name="agirhasarkayit"
                    value={car.agirhasarkayit}
                    onChange={handleFieldChange}
                    id="agirhasarkayit"
                  >
                    <option value="evet">Evet</option>
                    <option value="hayir">Hayır</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="kasatipi">Kasa Tipi:</label>
                  <input
                    type="text"
                    name="kasatipi"
                    value={car.kasatipi}
                    onChange={handleFieldChange}
                    id="kasatipi"
                  />
                </div>

                <div>
                  <label htmlFor="motorgucu">Motor Gücü:</label>
                  <input
                    type="text"
                    name="motorgucu"
                    value={car.motorgucu}
                    onChange={handleFieldChange}
                    id="motorgucu"
                  />
                </div>

                <div>
                  <label htmlFor="motorhacmi">Motor Hacmi:</label>
                  <input
                    type="text"
                    name="motorhacmi"
                    value={car.motorhacmi}
                    onChange={handleFieldChange}
                    id="motorhacmi"
                  />
                </div>

                <div>
                  <label htmlFor="renk">Renk:</label>
                  <input
                    type="text"
                    name="renk"
                    value={car.renk}
                    onChange={handleFieldChange}
                    id="renk"
                  />
                </div>

                <div>
                  <label htmlFor="durumu">Durumu:</label>
                  <select
                    name="durumu"
                    value={car.durumu}
                    onChange={handleFieldChange}
                    id="durumu"
                  >
                    <option value="sifir">Sıfır</option>
                    <option value="ikinciel">İkinci El</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="garanti">Garanti:</label>
                  <select
                    name="garanti"
                    value={car.garanti}
                    onChange={handleFieldChange}
                    id="garanti"
                  >
                    <option value="evet">Evet</option>
                    <option value="hayir">Hayır</option>
                  </select>
                </div>
              </PropertyContainer>
            )}
            {categoryName === "EvBahce" && (
              <PropertyContainer>
                <div>
                  <label htmlFor="malzeme">Malzeme:</label>
                  <input
                    type="text"
                    name="malzeme"
                    value={homeAndGarden.malzeme}
                    onChange={handleFieldChange}
                    id="malzeme"
                  />
                </div>

                <div>
                  <label htmlFor="turu">Türü:</label>
                  <input
                    type="text"
                    name="turu"
                    value={homeAndGarden.turu}
                    onChange={handleFieldChange}
                    id="turu"
                  />
                </div>

                <div>
                  <label htmlFor="marka">Marka:</label>
                  <input
                    type="text"
                    name="marka"
                    value={homeAndGarden.marka}
                    onChange={handleFieldChange}
                    id="marka"
                  />
                </div>

                <div>
                  <label htmlFor="renk">Renk:</label>
                  <input
                    type="text"
                    name="renk"
                    value={homeAndGarden.renk}
                    onChange={handleFieldChange}
                    id="renk"
                  />
                </div>

                <div>
                  <label htmlFor="durumu">Durumu:</label>
                  <select
                    name="durumu"
                    value={homeAndGarden.durumu}
                    onChange={handleFieldChange}
                    id="durumu"
                  >
                    <option value="sifir">Sıfır</option>
                    <option value="ikinciel">İkinci El</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="garanti">Garanti:</label>
                  <select
                    name="garanti"
                    value={homeAndGarden.garanti}
                    onChange={handleFieldChange}
                    id="garanti"
                  >
                    <option value="evet">Evet</option>
                    <option value="hayir">Hayır</option>
                  </select>
                </div>
              </PropertyContainer>
            )}
            {categoryName === "Elektronik" && (
              <PropertyContainer>
                <div>
                  <label htmlFor="marka">Marka:</label>
                  <input
                    type="text"
                    name="marka"
                    value={elektronik.marka}
                    onChange={handleFieldChange}
                    id="marka"
                  />
                </div>

                <div>
                  <label htmlFor="model">Model:</label>
                  <input
                    type="text"
                    name="model"
                    value={elektronik.model}
                    onChange={handleFieldChange}
                    id="model"
                  />
                </div>

                <div>
                  <label htmlFor="turu">Türü:</label>
                  <select
                    name="turu"
                    value={elektronik.turu}
                    onChange={handleFieldChange}
                    id="turu"
                  >
                    <option value="tablet">Tablet</option>
                    <option value="telefon">Telefon</option>
                    <option value="beyazEsya">Beyaz Eşya</option>
                    <option value="televizyon">Televizyon</option>
                    <option value="bilgisayar">Bilgisayar</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="renk">Renk:</label>
                  <input
                    type="text"
                    name="renk"
                    value={elektronik.renk}
                    onChange={handleFieldChange}
                    id="renk"
                  />
                </div>

                <div>
                  <label htmlFor="garanti">Garanti:</label>
                  <select
                    name="garanti"
                    value={elektronik.garanti}
                    onChange={handleFieldChange}
                    id="garanti"
                  >
                    <option value="evet">Evet</option>
                    <option value="hayir">Hayır</option>
                  </select>
                </div>
              </PropertyContainer>
            )}
            {categoryName === "Moda" && (
              <PropertyContainer>
                <div>
                  <label htmlFor="marka">Marka:</label>
                  <input
                    type="text"
                    name="marka"
                    value={moda.marka}
                    onChange={handleFieldChange}
                    id="marka"
                  />
                </div>

                <div>
                  <label htmlFor="turu">Türü:</label>
                  <select
                    name="turu"
                    value={moda.turu}
                    onChange={handleFieldChange}
                    id="turu"
                  >
                    <option value="ustGiyim">Üst Giyim</option>
                    <option value="altGiyim">Alt Giyim</option>
                    <option value="icGiyim">İç Giyim</option>
                    <option value="ayakkabi">Ayakkabı</option>
                    <option value="canta">Çanta</option>
                    <option value="aksesuar">Aksesuar</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="renk">Renk:</label>
                  <input
                    type="text"
                    name="renk"
                    value={moda.renk}
                    onChange={handleFieldChange}
                    id="renk"
                  />
                </div>

                <div>
                  <label htmlFor="tarz">Tarz:</label>
                  <select
                    name="tarz"
                    value={moda.tarz}
                    onChange={handleFieldChange}
                    id="tarz"
                  >
                    <option value="casual">Günlük</option>
                    <option value="chic">Şık</option>
                    <option value="sport">Spor</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="malzeme">Malzeme:</label>
                  <input
                    type="text"
                    name="malzeme"
                    value={moda.malzeme}
                    onChange={handleFieldChange}
                    id="malzeme"
                  />
                </div>
              </PropertyContainer>
            )}
            {categoryName === "YedekParca" && (
              <PropertyContainer>
                <div>
                  <label htmlFor="marka">Marka:</label>
                  <input
                    type="text"
                    name="marka"
                    value={yedekParca.marka}
                    onChange={handleFieldChange}
                    id="marka"
                  />
                </div>

                <div>
                  <label htmlFor="model">Model:</label>
                  <input
                    type="text"
                    name="model"
                    value={yedekParca.model}
                    onChange={handleFieldChange}
                    id="model"
                  />
                </div>

                <div>
                  <label htmlFor="parcaAdi">Parça Adı:</label>
                  <input
                    type="text"
                    name="parcaAdi"
                    value={yedekParca.parcaAdi}
                    onChange={handleFieldChange}
                    id="parcaAdi"
                  />
                </div>

                <div>
                  <label htmlFor="parcaNumarasi">Parça Numarası:</label>
                  <input
                    type="text"
                    name="parcaNumarasi"
                    value={yedekParca.parcaNumarasi}
                    onChange={handleFieldChange}
                    id="parcaNumarasi"
                  />
                </div>

                <div>
                  <label htmlFor="durumu">Durumu:</label>
                  <select
                    name="durumu"
                    value={yedekParca.durumu}
                    onChange={handleFieldChange}
                    id="durumu"
                  >
                    <option value="yeni">Yeni</option>
                    <option value="ikinciel">İkinci El</option>
                  </select>
                </div>
              </PropertyContainer>
            )}
            {categoryName === "İkinciEl" && (
              <PropertyContainer>
                <div>
                  <label htmlFor="marka">Marka:</label>
                  <input
                    type="text"
                    name="marka"
                    value={ikinciEl.marka}
                    onChange={handleFieldChange}
                    id="marka"
                  />
                </div>

                <div>
                  <label htmlFor="model">Model:</label>
                  <input
                    type="text"
                    name="model"
                    value={ikinciEl.model}
                    onChange={handleFieldChange}
                    id="model"
                  />
                </div>

                <div>
                  <label htmlFor="durumu">Durumu:</label>
                  <select
                    name="durumu"
                    value={ikinciEl.durumu}
                    onChange={handleFieldChange}
                    id="durumu"
                  >
                    <option value="iyi">İyi</option>
                    <option value="orta">Orta</option>
                    <option value="kotu">Kötü</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="takas">Takas:</label>
                  <select
                    name="takas"
                    value={ikinciEl.takas}
                    onChange={handleFieldChange}
                    id="takas"
                  >
                    <option value="evet">Evet</option>
                    <option value="hayir">Hayır</option>
                  </select>
                </div>
              </PropertyContainer>
            )}
            <label htmlFor="description">Açıklama:</label>
            <textarea
              className="input-field"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Bu alana ürününü detaylı bir şekilde anlatan metni girmelisin. Ne kadar detayları iyi açıklarsan, ürünün o kadar kolay satılır."
            ></textarea>
            <label htmlFor="price">Fiyat:</label>
            <input
              className="input-field"
              type="number"
              id="price"
              value={price}
              onChange={handlePriceChange}
              placeholder="Ürün Fiyatı"
            />
            <label htmlFor="status">Durum:</label>
            <select
              id="status"
              value={status}
              onChange={handleStatusChange}
              className="input-field"
            >
              <option value="">Seçiniz</option>
              <option value="yeni">Yeni</option>
              <option value="iyiDurumda">İyi Durumda</option>
              <option value="azKullanilmis">Az Kullanılmış</option>
              <option value="cokKullanilmis">Çok Kullanılmış</option>
            </select>
            <label htmlFor="images">Görseller:</label>
            <div className="image-upload">
              Lütfen bir tane ilan resmi yükleyiniz
            </div>

            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => setItem(base64)}
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

            <button type="submit">İlanı Ekle</button>
          </Form>
        </Content>

        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding-left: 100px;
  padding-right: 100px;
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem;
  margin-top: 6rem;
  color: black;
`;

const PropertyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  margin: 0 auto;
  max-width: 400px;
  text-align: center;
  border: 1px solid #c8a2c8;
  border-radius: 10px;
  padding: 10px;
  background-color: #e6cc00;
  transition: border-color 0.3s;

  &:hover {
    border-color: #a26ca2;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem; //formlar arası boşluk

  label {
    font-weight: bold; //kalın font
  }

  input,
  textarea,
  select {
    padding: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #e6cc00;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    margin: 0 auto;
    display: block;
    width: fit-content;
    border-radius: 0.2rem;
    border: 2px solid #c8a2c8;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const ImagePreview = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

export default NewAdvert;
