import styled from "styled-components";
function ResidenceDetails({ data }) {
  const {
    odaSayisi,
    binaYasi,
    katSayisi,
    isitma,
    banyoSayisi,
    balkon,
    esyali,
    siteIcerisinde,
    aidatBilgileri,
  } = data;
  return (
    <>
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Oda Sayısı: </b>
        <p>{odaSayisi}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Bina Yaşı: </b>
        <p>{binaYasi}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Kat Sayısı: </b>
        <p>{katSayisi}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Isıtma: </b>
        <p>{isitma}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Banyo Sayısı: </b>
        <p>{banyoSayisi}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Balkon</b>
        <p>{balkon ? "Var" : "Yok"}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Eşyalı</b>
        <p>{esyali ? "Evet" : "Hayır"}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Site İçerisinde: </b>
        <p>{siteIcerisinde ? "Evet" : "Hayır"}</p>
      </div>
      <Divider />
      <div className="d-flex flex-nowrap justify-content-between">
        <b>Aidat Bilgileri</b>
        <p>{aidatBilgileri}</p>
      </div>
    </>
  );
}

const Divider = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 2px 0;
`;

export default ResidenceDetails;
