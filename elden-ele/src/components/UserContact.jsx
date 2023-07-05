import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserContact() {
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/get/${id}`);
      const { userId } = response.data;

      const userResponse = await axios.get(
        `http://localhost:3000/getUser/${userId}`
      );
      const userData = userResponse.data;
      setData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          border: "1px solid #dbdbdb",
          backgroundColor: "silver",
          height: "110px",
          boxSizing: "inherit",
          borderRadius: "10px",
        }}
        className="col-md-3"
      >
        <h4 style={{ marginTop: "15px" }}>
          {data.firstName} {data.lastName}
        </h4>
        <p>
          <b>Kullanıcı Adı: </b>
          {data.kullanici_adi}
        </p>

        <Divider />
        <div
          style={{
            backgroundColor: "white",
            height: "30px",
            marginTop: "10px",
            border: "2px solid grey",
            borderRadius: "5px",
          }}
        >
          <p style={{ marginLeft: "10px" }}>
            <b style={{ marginRight: "20px" }}>Cep</b>
            {data.phone}
          </p>
        </div>
      </div>
    </>
  );
}

const Divider = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 2px 0;
`;

export default UserContact;

/*<b>{userData.firstName ? userData.firstName : "isim yok"}</b>
          <b>{userData.lastName ? userData.lastName : "soy isim yok"}
           {userData.phone ? userData.phone : "numara yok"}</b>*/
