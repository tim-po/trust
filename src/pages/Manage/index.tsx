import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import GradientCircles from "Standard/decorations/GradientCircles";
type ManagePropType = {}

const ManageDefaultProps = {}

const Manage = (props: ManagePropType) => {
    const {locale} = useContext(LocaleContext)

    return (
      <div>
        manage
        <GradientCircles />
      </div>
    )
};

Manage.defaultProps = ManageDefaultProps

export default Manage

