import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import GradientCircles from "Standard/decorations/GradientCircles";
type InvestPropType = {}

const InvestDefaultProps = {}

const Invest = (props: InvestPropType) => {
    const {locale} = useContext(LocaleContext)

    return (
       <div>
         invest
         <GradientCircles />
       </div>
    )
};

Invest.defaultProps = InvestDefaultProps

export default Invest

