import './Languages.scss';
import React from 'react';
import {connect} from 'react-redux';
import {goBack} from '../../actions/navigation.actions';
import t from '../../i18n/locale-keys';

class Languages extends React.PureComponent {
    state = {
        languages: [
            {id: 'Arabic (Saudi Arabia)_ID', name: '(العربية) المملكة العربية السعودية',
                title: 'Arabic (Saudi Arabia)'},
            {id: 'Danish_ID', name: 'Dansk', title: 'Danish'},
            {id: 'German_ID', name: 'Deutsch', title: 'German'},
            {id: 'English_ID', name: 'English', title: 'English'},
            {id: 'Spanish_ID', name: 'Español', title: 'Spanish'},
            {id: 'French_ID', name: 'Français', title: 'French'},
            {id: 'French (Canada)_ID', name: 'Français (Canada)', title: 'French (Canada)'},
            {id: 'Hebrew (Israel)‎_ID', name: 'עברית (ישראל)', title: 'Hebrew (Israel)‎'},
            {id: 'Italian_ID', name: 'Italiano', title: 'Italian'},
            {id: 'Japanese_ID', name: '日本語', title: 'Japanese'},
            {id: 'Dutch_ID', name: 'Nederlands', title: 'Dutch'},
            {id: 'Polish_ID', name: 'Polski', title: 'Polish'},
            {id: 'Portuguese (Brazil)_ID', name: 'Português (Brasil)', title: 'Portuguese (Brazil)'},
            {id: 'Russian_ID', name: 'Русский', title: 'Russian'},
            {id: 'Swedish_ID', name: 'Svenska', title: 'Swedish'},
            {id: 'Chinese (People\'s Republic of China)_ID', name: '中文(中华人民共和国)',
                title: 'Chinese (People\'s Republic of China)'},
            {id: 'Chinese (Taiwan)_ID', name: '中文(台灣)', title: 'Chinese (Taiwan)'}
        ],
        currentLanguage: 'English_ID'
    };

    handleClose = () => {
        this.props.goBack();
    };

    selectLanguage = (languageID) => {
        console.log(languageID);
    };

    render() {
        const languageElements = this.state.languages.map((language) => {
            const handleClick = () => this.selectLanguage(language.id);
            const isCurrentLanguage = (language.id === this.state.currentLanguage);
            const languageClass = isCurrentLanguage ? 'current' : null;
            const icons = isCurrentLanguage ? <i className="ias-icon ias-icon-check_thick" /> : null;
            return (
                <tr className={languageClass} key={language.id} onClick={handleClick}>
                    <td title={language.title} id={language.id}>
                        {icons}
                        <bdi>{language.name}</bdi>
                    </td>
                </tr>
            );
        });

        return (
            <div className="ias-content-padding">
                <div className="ias-header">
                    <h2>{t.languageSelect()}</h2>
                    <span className="ias-fill" />
                    <button
                        className="ias-button ias-icon-button"
                        id="Close_Languages_Button"
                        onClick={this.handleClose}
                        title={t.buttonClose()}
                        type="button"
                    >
                        <i className="ias-icon ias-icon-close_thin" />
                    </button>
                </div>

                <table className="ias-table languages-list">
                    <tbody>
                        {languageElements}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapDispatchToProps = { goBack };

export default connect(null, mapDispatchToProps)(Languages);
