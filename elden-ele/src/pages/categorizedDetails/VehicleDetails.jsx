import React from "react";
import styled from "styled-components";

const Divider = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 2px 0;
`;

const VehicleDetails = ({ data }) => {
  const {
    marka,
    seri,
    model,
    yil,
    vites,
    durumu,
    kasatipi,
    motorgucu,
    agirhasarkayit,
    motorhacmi,
    renk,
    garanti,
  } = data;

  return (
    <>
      <DetailRow label="Marka" value={marka} />
      <DetailRow label="Seri" value={seri} />
      <DetailRow label="Model" value={model} />
      <DetailRow label="Yıl" value={yil} />
      <DetailRow label="Vites" value={vites} />
      <DetailRow label="Araç Durumu" value={durumu} />
      <DetailRow label="Kasa Tipi" value={kasatipi} />
      <DetailRow label="Motor Gücü" value={motorgucu} />
      <DetailRow label="Ağır Hasar Kaydı" value={agirhasarkayit} />
      <DetailRow label="Motor Hacmi" value={motorhacmi} />
      <DetailRow label="Renk" value={renk} />
      <DetailRow label="Garanti" value={garanti} />
    </>
  );
};

const DetailRow = ({ label, value }) => (
  <>
    <div className="d-flex flex-nowrap justify-content-between">
      <b>{label}</b>
      <p>{value}</p>
    </div>
    <Divider />
  </>
);

export default VehicleDetails;
