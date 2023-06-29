import styled from "styled-components";

function SecondHandDetails({ data }) {
  const { turu, marka, model, durumu, takas } = data;
  return (
    <>
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
        <b>Model</b>
        <p>{model}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Durumu</b>
        <p>{durumu}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Takas</b>
        <p>{takas}</p>
      </div>
    </>
  );
}
const Divider = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 2px 0;
`;

export default SecondHandDetails;
