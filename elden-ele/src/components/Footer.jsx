import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 0.1px;
  text-align: center;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-top: 100px;

`;

const FooterText = styled.p`
  color: #888888;
  font-size: 14px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2023 EldenEle. Tüm hakları saklıdır.</FooterText>
    </FooterContainer>
  );
};

export default Footer;