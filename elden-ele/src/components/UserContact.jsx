import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

function UserContact({ data }) {
  /* const { userId } = data; // gelen datada userId diye bir field var
  const [userData, setUserData] = useState({});
  useEffect(() => {
    // user bilgilerini çekmek için
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getUser/${userId}`
        );
        const data = response.data;
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId]);
*/
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
        <h5 style={{ marginTop: "15px" }}></h5>

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
            <b style={{ marginRight: "20px" }}>Cep</b>{" "}
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
