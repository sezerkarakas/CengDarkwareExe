import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Image1 from "../assets/ilan1.jpg";
import Image2 from "../assets/ilan2.jpg";
import Image3 from "../assets/ProfileImage.jpg";
import Image4 from "../assets/BackImage.jpg";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({});
  const [data, setData] = useState([{}]);
  //*****************************************
  //kullanıcı idsi
  const userId = localStorage.getItem("userId");
//*****************************************
  //kullanıcı bilgileri
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/getUser/${userId}`
      );
      setProfileData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // İlanı silme işlemi
  const ilaniSil = (ilanId) => {
    // İlanı API'ye silme isteği gönderme işlemi
    axios
      .delete(`/delete/${ilanId}`)
      .then((response) => {
        console.log("İlan başarıyla silindi:", response.data);
        // İlanı listeden kaldırma
        const updatedIlanlar = data.filter((item) => item.id !== ilanId);
        setData(updatedIlanlar);
      })
      .catch((error) => {
        console.error("İlan silinirken bir hata oluştu:", error);
      });
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
//***********************************************************************
  //kullanıcının yüklemiş olduğu ilanları çekme
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/ilanlar/${userId}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  /*
    const ListingCard = ({ id, title, image, price }) => {
      const history = useHistory();
    
      const handleDelete = () => {
        // İlanı silme işlemleri burada yapılır
      };
    
      const handleUpdate = () => {
        history.push('/update-page'); // UpdatePage sayfasına yönlendirme
      };
    
      return (
        <StyledListingCard>
          <ListingImage src={image} alt={title} />
          <ListingTitle>{title}</ListingTitle>
          <ListingDescription>{price}</ListingDescription>
          <DeleteButton onClick={handleDelete}>Sil</DeleteButton>
          <UpdateButton onClick={handleUpdate}>Güncelle</UpdateButton>
        </StyledListingCard>
      );
    };
  */

  return (
    <>
      <Navbar isScrolled={isScrolled} />
      <div className="container">
        <ProfileContainer>
          <ProfileHeader src={Image4} alt="BackImage">
            <ProfileNavbar />
          </ProfileHeader>
          <ProfileImage src={Image3} alt="Profile Image" />
          {/* kullanıcı bilgileri çekme */}
          <ProfileInfo>
            <ProfileName>{profileData.firstName}</ProfileName>
            <ProfileDescription>{profileData.email}</ProfileDescription>
          </ProfileInfo>

          <div className="row">
            <div className="col-md-3 d-flex justify-content-center">
              <Sidebar>
                <AboutSection>
                  <h4>Hakkımızda</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam consectetur odio eget tellus feugiat dapibus.
                  </p>
                </AboutSection>
                <SearchButton>Mağazada Ara</SearchButton>
              </Sidebar>
            </div>

            <div className="col-md-9">
              <h4>İlanlarım</h4>
              <ListingsContainer className="d-flex justify-content-between">
                {data.map((item) => (
                  <ListingCard key={item._id}>
                    <ListingImage src={item.image} alt={item.title} />
                    <ListingTitle>{item.title}</ListingTitle>
                    <ListingDescription>{item.price}</ListingDescription>
                    <DeleteButton onClick={() => ilaniSil(item._id)}>
                      Sil
                    </DeleteButton>
                    <UpdateButton to={`/ilanguncelle/${item._id}`}>
                      Güncelle
                    </UpdateButton>
                  </ListingCard>
                ))}
              </ListingsContainer>
              <div className="text-center mt-3">
                <AddAdButton to="/ilanekle">Yeni İlan Ekle</AddAdButton>
              </div>
            </div>
          </div>
        </ProfileContainer>
        <Footer />
      </div>
    </>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileHeader = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  margin-top: 6rem;
  z-index: -1;
`;

const ProfileNavbar = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #fff;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin-top: -75px;
  z-index: 1;
`;

const ProfileInfo = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  margin-bottom: 5px;
`;

const ProfileDescription = styled.p`
  font-size: 16px;
  color: #666;
`;

const Sidebar = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #f1f1f1;
  /* Sidebar stilleri buraya eklenebilir */
`;

const AboutSection = styled.div`
  margin-bottom: 20px;
  /* Hakkımızda bölümü stilleri buraya eklenebilir */
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #fff;
  /* Arama butonu stilleri buraya eklenebilir */
`;

const ListingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* İlan kartlarının sıralandığı alan stilleri buraya eklenebilir */
`;

const ListingCard = styled.div`
  width: 200px;
  height: 250px;
  margin: 10px;
  background-color: #f9f9f9;
  /* İlan kartı stilleri buraya eklenebilir */
`;

const ListingTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const ListingDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

const ListingImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  background-color: #e6cc00;
  border-radius: 0.2rem;
  border: 2px solid #c8a2c8;
  color: white;
  padding: 5px 10px;
  margin-right: 5px;
`;

const UpdateButton = styled(Link)`
  background-color: #e6cc00;
  border-radius: 0.2rem;
  border: 2px solid #c8a2c8;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #c8a2c8;
  }
`;

const AddAdButton = styled(Link)`
  display: flex;
  display: inline-block;
  background-color: #e6cc00;
  color: #fff;
  padding: 10px 20px;
  border-radius: 0.2rem;
  border: 2px solid #c8a2c8;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
  text-align: center;
  width: auto;
  left: auto;
  &:hover {
    background-color: #c8a2c8;
  }
`;

export default ProfilePage;
