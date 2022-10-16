import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import './index.css'

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type ManageStatusesPropType = {
    // You should declare props like this, delete this if you don't need props
    someProp: any
    somePropWithDefaultOption?: string
}

const ManageStatusesDefaultProps = {
    // You should declare default props like this, delete this if you don't need props
    somePropWithDefaultOption: 'default value'
}

const ManageStatuses = (props: ManageStatusesPropType) => {
    const {locale} = useContext(LocaleContext)

    return (
        <div className={'ManageStatuses'}>
            {/* example of localisation usage */}
            <div>
                {localized(texts, locale)}
            </div>
        </div>
    )
};

ManageStatuses.defaultProps = ManageStatusesDefaultProps

export default ManageStatuses