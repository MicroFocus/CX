import React from 'react';
import PropTypes from 'prop-types';
import t from '../i18n/locale-keys';

export default class Accordion extends React.PureComponent {
    state = {
        open: this.props.startOpen || false
    };

    toggleState = () => {
        this.setState({
            open: !this.state.open
        });
    };

    render() {
        const iconName = this.state.open ? 'up_thin' : 'down_thin';
        const {title} = this.props;

        let accordionClass = 'ias-accordion';
        if (this.state.open) {
            accordionClass += ' ias-open';
        }

        return (
            <div className="ias-accordion-group">
                <div className={accordionClass}>
                    <div className="ias-accordion-header" onClick={this.toggleState} title={t.openClose()}>
                        <div className="ias-accordion-title">{title}</div>
                        <span className="ias-fill" />
                        <i className={`ias-icon ias-icon-${iconName} ias-accordion-icon-toggle`} />
                    </div>
                    <div className="ias-accordion-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

Accordion.defaultProps = {
    startOpen: false
};

Accordion.propTypes = {
    startOpen: PropTypes.bool,
    title: PropTypes.string.isRequired
};
