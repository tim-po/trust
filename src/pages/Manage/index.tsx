import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import SubHeader from "components/SubHeader";
import styled from "styled-components";
import ManageBackground from "icons/ManageBackground";

type ManagePropType = {}

const ManageDefaultProps = {}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 36px;
  width: 100%;
`

const Manage = (props: ManagePropType) => {
    const {locale} = useContext(LocaleContext)

    return (
      <Container>
        <SubHeader
          backgroundIcon={<ManageBackground />}
          greenTitle={localized(texts.manage, locale)}
        />
      </Container>
    )
};

Manage.defaultProps = ManageDefaultProps

export default Manage

