import React, { ReactElement } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar";
import Routes from "../../routes/routes";

import * as S from "./styled";

const Template: React.FC = (): ReactElement => {
  return (
    <S.Wrapper>
      <Sidebar />
      <Navbar />
      <S.Main>
        <Routes />
      </S.Main>
    </S.Wrapper>
  );
};

export default Template;
