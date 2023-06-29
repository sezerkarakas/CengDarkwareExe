import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";

const UpdatePage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatePage = {
            title: title,
            category:category,
            description: description,
            price: price,
            status: status,
        };

        // Görsel yükleme işlemleri
        const files = Array.from(e.target.files);
        const fileTypes = ["image/jpeg"];

        const selectedImages = files.filter((file) => fileTypes.includes(file.type));

        if (selectedImages.length > 6) {
            setErrorMessage("En fazla 6 adet görsel yükleyebilirsiniz.");
        } else {
            setImages(selectedImages);
            setErrorMessage("");
        }
        if (images.length === 0) {
            setErrorMessage("En az bir görsel yüklemelisiniz.");
            return;
        }

        console.log(updatePage);

        alert("İlan başarıyla güncellendi.");

        setTitle("");
        setDescription("");
        setPrice("");
        setStatus("");
        setImages([]);
        setErrorMessage("");
        setCategory("");
    };

  return (
    <>
    <Container>
        <Navbar isScrolled={isScrolled}/> 
        
      <FormContainer>
        <Title>İlanınızı Güncelleyin</Title>
        <Form onSubmit={handleSubmit}>
          
          <FormGroup>
            <Label htmlFor="title">Başlık</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="category">İlan Türü</Label>
            <select id="category"
                        className="input-field"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
                    {category === 'Emlak' && (
                            <PropertyContainer>
                            <div>
                                <label htmlFor="odaSayisi">Oda Sayısı:</label>
                                <input type="number" id="odaSayisi" />
                            </div>

                            <div>
                                <label htmlFor="binaYasi">Bina Yaşı:</label>
                                <input type="number" id="binaYasi" />
                            </div>

                            <div>
                                <label htmlFor="katSayisi">Kat Sayısı:</label>
                                <input type="number" id="katSayisi" />
                            </div>

                            <div>
                                <label htmlFor="isitma">Isıtma:</label>
                                <input type="text" id="isitma" />
                            </div>

                            <div>
                                <label htmlFor="banyoSayisi">Banyo Sayısı:</label>
                                <input type="number" id="banyoSayisi" />
                            </div>

                            <div>
                                <label htmlFor="balkon">Balkon:</label>
                                <select id="balkon">
                                    <option value="evet">Evet</option>
                                    <option value="hayir">Hayır</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="esyali">Eşyalı:</label>
                                <select id="esyali">
                                    <option value="evet">Evet</option>
                                    <option value="hayir">Hayır</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="siteIcerisinde">Site İçerisinde:</label>
                                <select id="siteIcerisinde">
                                    <option value="evet">Evet</option>
                                    <option value="hayir">Hayır</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="aidatBilgileri">Aidat Bilgileri:</label>
                                <input type="text" id="aidatBilgileri" />
                            </div>
                        </PropertyContainer>
                    )}

                    {category === 'Vasita' && (
                            <PropertyContainer>
                            <div>
                                <label htmlFor="marka">Marka:</label>
                                <input type="text" id="marka" />
                            </div>

                            <div>
                                <label htmlFor="seri">Seri:</label>
                                <input type="text" id="seri" />
                            </div>

                            <div>
                                <label htmlFor="model">Model:</label>
                                <input type="text" id="model" />
                            </div>

                            <div>
                                <label htmlFor="yil">Yıl:</label>
                                <input type="number" id="yil" />
                            </div>

                            <div>
                                <label htmlFor="vites">Vites:</label>
                                <input type="text" id="vites" />
                            </div>

                            <div>
                                <label htmlFor="agirhasarkayit">Ağır Hasar Kayıtlı:</label>
                                <select id="agirhasarkayit">
                                    <option value="evet">Evet</option>
                                    <option value="hayir">Hayır</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="kasatipi">Kasa Tipi:</label>
                                <input type="text" id="kasatipi" />
                            </div>

                            <div>
                                <label htmlFor="motorgucu">Motor Gücü:</label>
                                <input type="text" id="motorgucu" />
                            </div>

                            <div>
                                <label htmlFor="motorhacmi">Motor Hacmi:</label>
                                <input type="text" id="motorhacmi" />
                            </div>

                            <div>
                                <label htmlFor="renk">Renk:</label>
                                <input type="text" id="renk" />
                            </div>

                            <div>
                                <label htmlFor="durumu">Durumu:</label>
                                <select id="durumu">
                                    <option value="sifir">Sıfır</option>
                                    <option value="ikinciel">İkinci El</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="garanti">Garanti:</label>
                                <select id="garanti">
                                    <option value="evet">Evet</option>
                                    <option value="hayir">Hayır</option>
                                </select>
                            </div>

                            
                        </PropertyContainer>
                    )}

                    {category === 'EvBahce' && (
                            <PropertyContainer>
                            <div>
                                <label htmlFor="malzeme">Malzeme:</label>
                                <input type="text" id="malzeme" />
                            </div>

                            <div>
                                <label htmlFor="turu">Türü:</label>
                                <input type="text" id="turu" />
                            </div>

                            <div>
                                <label htmlFor="marka">Marka:</label>
                                <input type="text" id="marka" />
                            </div>

                            <div>
                                <label htmlFor="renk">Renk:</label>
                                <input type="text" id="renk" />
                            </div>

                            <div>
                                <label htmlFor="durumu">Durumu:</label>
                                <select id="durumu">
                                    <option value="sifir">Sıfır</option>
                                    <option value="ikinciel">İkinci El</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="garanti">Garanti:</label>
                                <select id="garanti">
                                    <option value="evet">Evet</option>
                                    <option value="hayir">Hayır</option>
                                </select>
                            </div>
   
                        </PropertyContainer>
                    )}

                    {category === 'Elektronik' && (
                    <PropertyContainer>
                        <div>
                        <label htmlFor="marka">Marka:</label>
                        <input type="text" id="marka" />
                        </div>

                        <div>
                        <label htmlFor="model">Model:</label>
                        <input type="text" id="model" />
                        </div>

                        <div>
                        <label htmlFor="turu">Türü:</label>
                        <select id="turu">
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
                        <input type="text" id="renk" />
                        </div>

                        <div>
                        <label htmlFor="garanti">Garanti:</label>
                        <select id="garanti">
                            <option value="evet">Evet</option>
                            <option value="hayir">Hayır</option>
                        </select>
                        </div>
                    </PropertyContainer>
                    )}

                    {category === 'Moda' && (
                    <PropertyContainer>
                        <div>
                        <label htmlFor="marka">Marka:</label>
                        <input type="text" id="marka" />
                        </div>

                        <div>
                        <label htmlFor="turu">Türü:</label>
                        <select id="turu">
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
                        <input type="text" id="renk" />
                        </div>

                        <div>
                        <label htmlFor="tarz">Tarz:</label>
                        <select id="tarz">
                            <option value="casual">Günlük</option>
                            <option value="chic">Şık</option>
                            <option value="sport">Spor</option>
                        </select>
                        </div>

                        <div>
                        <label htmlFor="malzeme">Malzeme:</label>
                        <input type="text" id="malzeme" />
                        </div>
                    </PropertyContainer>
                    )}

                    {category === 'YedekParca' && (
                    <PropertyContainer>
                        <div>
                        <label htmlFor="marka">Marka:</label>
                        <input type="text" id="marka" />
                        </div>

                        <div>
                        <label htmlFor="model">Model:</label>
                        <input type="text" id="model" />
                        </div>

                        <div>
                        <label htmlFor="parcaAdi">Parça Adı:</label>
                        <input type="text" id="parcaAdi" />
                        </div>

                        <div>
                        <label htmlFor="parcaNumarasi">Parça Numarası:</label>
                        <input type="text" id="parcaNumarasi" />
                        </div>

                        <div>
                        <label htmlFor="durumu">Durumu:</label>
                        <select id="durumu">
                            <option value="yeni">Yeni</option>
                            <option value="ikinciel">İkinci El</option>
                        </select>
                        </div>
                    </PropertyContainer>
                    )}
                    
                    {category === 'İkinciEl' && (
                    <PropertyContainer>
                        <div>
                        <label htmlFor="marka">Marka:</label>
                        <input type="text" id="marka" />
                        </div>

                        <div>
                        <label htmlFor="model">Model:</label>
                        <input type="text" id="model" />
                        </div>

                        <div>
                        <label htmlFor="durumu">Durumu:</label>
                        <select id="durumu">
                            <option value="iyi">İyi</option>
                            <option value="orta">Orta</option>
                            <option value="kotu">Kötü</option>
                        </select>
                        </div>

                        <div>
                        <label htmlFor="takas">Takas:</label>
                        <select id="takas">
                            <option value="evet">Evet</option>
                            <option value="hayir">Hayır</option>
                        </select>
                        </div>
                    </PropertyContainer>
                    )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="status">Durum</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
                <option value="">Seçiniz</option>
                <option value="yeni">Yeni</option>
                <option value="iyiDurumda">İyi Durumda</option>
                <option value="azKullanilmis">Az Kullanılmış</option>
                <option value="cokKullanilmis">Çok Kullanılmış</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="price">Fiyat</Label>
            <Input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Açıklama</Label>
            <Input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
          <Label htmlFor="images">Görseller</Label>
                    <Input
                        type="file"
                        id="images"
                        value={images}
                        multiple accept="image/jpeg"
                        onChange={(e)=> setImages(e.target.value)}
                        required
                        />
                                          
          </FormGroup>
          
          <ButtonContainer>
            <CancelButton type="button">İptal</CancelButton>
            <UpdateButton type="submit">Güncelle</UpdateButton>
          </ButtonContainer>
        
        </Form>
      </FormContainer>
      
    </Container>
    <Footer/>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  width: 400px;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 200px;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
  color: #e6cc00;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  padding: 8px 16px;
  background-color: #e6cc00;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  border-radius: 0.2rem;
  border: 2px solid #c8a2c8;
  &:hover {
    background-color: #c8a2c8;
  }
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


const ErrorMessage = styled.p`
  color: red;
`;

export default UpdatePage;
