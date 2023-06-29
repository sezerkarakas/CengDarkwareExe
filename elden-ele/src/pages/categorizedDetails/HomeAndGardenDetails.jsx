import styled from "styled-components";
function HomeAndGarden({ data }) {
  const { malzeme, turu, marka, renk, durumu, garanti } = data;

  return (
    <>
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Malzeme</b>
        <p>{malzeme}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Türü</b>
        <p>{turu}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Marka</b>
        <p>{marka}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Renk</b>
        <p>{renk}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Durumu </b>
        <p>{durumu == "sifir" ? "Sıfır" : "İkinci El"}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Garanti </b>
        <p>{garanti ? "Var" : "Yok"}</p>
      </div>
    </>
  );
}

const Divider = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 2px 0;
`;

export default HomeAndGarden;
