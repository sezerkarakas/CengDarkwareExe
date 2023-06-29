import styled from "styled-components";

function SparePartDetails({ data }) {
  const { marka, model, parcaAdi, parcaNumarasi, durumu } = data;
  return (
    <>
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
        <b>Parça Adı</b>
        <p>{parcaAdi}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Parça Numarası</b>
        <p>{parcaNumarasi}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Durumu</b>
        <p>{durumu}</p>
      </div>
    </>
  );
}
const Divider = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 2px 0;
`;

export default SparePartDetails;
