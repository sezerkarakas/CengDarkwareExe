import styled from "styled-components";

function FashionDetails({ data }) {
  const { marka, turu, renk, tarz, malzeme } = data;
  return (
    <>
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Marka</b>
        <p>{marka}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Türü</b>
        <p>{turu}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Renk</b>
        <p>{renk}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Tarz</b>
        <p>{tarz}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Malzeme</b>
        <p>{malzeme}</p>
      </div>
    </>
  );
}
const Divider = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 2px 0;
`;

export default FashionDetails;
