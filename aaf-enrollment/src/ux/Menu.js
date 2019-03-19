import PropTypes from 'prop-types';
import React from 'react';
import calculateMenuPosition, {H_ALIGN, V_ALIGN} from './CalculateMenuPosition';
import * as ReactDOM from 'react-dom';

const STANDARD_NAVIGATIONAL_TAGS = ['a', 'button'];

/* Displays a menu that shows and hides when its toggle element is clicked.
 * - If possible, the menu content will line up with the toggle element as specified by the optional iasAlign property,
 *   which is of the format 'H_ALIGN V_ALIGN?' (default is 'start bottom'). This means the edge of the menu content
 *   aligns with the bottom edge of the toggle element such that left side corners of both elements also touch. (In RTL
 *   these directions of left and right will be flipped.) The other possible values for H_ALIGN are 'center' and 'end'
 *   and for V_ALIGN are 'center' and 'top' and behave as expected.
 * - Clicking a standard navigational element (<a>, <button>) on the menu content hides the menu by default. To enable
 *   this behavior somewhere else in the menu content, call the hideMenu() function in this class. To stop this
 *   behavior, use event.stopPropagation.
 */
class Menu extends React.PureComponent {
    constructor(props) {
        super(props);

        this.menuContentRef = React.createRef();
        this.toggleRef = React.createRef();
        this.state = {
            alignment: this.parseAlignment(),
            open: false,
            openInProcess: false,
            position: null
        };
    }

    clickMenu = (event) => {
        // Hide the menu if the click originates from the menu scrim or a standard navigational element
        if (event.target.classList.contains('ias-menu')) {
            this.hideMenu();
        }
        else {
            let currentElement = event.target;
            while (currentElement && currentElement.tagName) {  // Navigational elements sometimes have children
                const tagName = currentElement.tagName.toLowerCase();
                if (STANDARD_NAVIGATIONAL_TAGS.indexOf(tagName) !== -1) {
                    this.hideMenu();
                    break;
                }
                currentElement = currentElement.parentNode;
            }
        }
    };

    hideMenu() {
        this.setState({
            open: false,
            position: null
        });
    }

    parseAlignment() {
        const {iasAlign} = this.props;
        const tokens = (iasAlign) ? iasAlign.split(' ') : [];

        return {
            horizontal: H_ALIGN[tokens[0]] || H_ALIGN.start,
            vertical: V_ALIGN[tokens[1]] || V_ALIGN.bottom
        };
    }

    render() {
        const {open, openInProcess, position} = this.state;

        // Dynamically add toggle menu handler
        const toggleElement = React.cloneElement(this.props.toggleElement, {
            key: 'menu-toggle',
            onClick: this.showMenu,
            ref: this.toggleRef
        });

        let menuClass = 'ias-menu';
        if (open) {
            menuClass += ' ias-open';
        }
        const menuStyle = openInProcess ? {visibility: 'hidden'} : null;

        const menuContentStyle = position ? {
            bottom: Menu.numberToPixels(position.bottom),
            left: Menu.numberToPixels(position.left),
            right: Menu.numberToPixels(position.right),
            top: Menu.numberToPixels(position.top)
        } : null;

        // Use a Portal to insert the menu inside the document body
        // This stops some CSS styles from appearing on top of the menu (for example, button outlines)
        const menu = ReactDOM.createPortal((
            <div className={menuClass} key="menu" onClick={this.clickMenu} style={menuStyle}>
                <div className="ias-menu-content" ref={this.menuContentRef} style={menuContentStyle}>
                    {this.props.children}
                </div>
            </div>
        ), document.body);

        return [menu, toggleElement];
    }

    showMenu = () => {
        // When showing the menu, first open the menu so the size can be calculated but keep it invisible.
        this.setState({
            open: true,
            openInProcess: true
        }, () => {
            // Once this update has been rendered, set the menuContent position and make the menu visible.
            const position = calculateMenuPosition(this.menuContentRef.current, this.toggleRef.current,
                this.state.alignment);
            this.setState({
                openInProcess: false,
                position
            });
        });
    };

    static numberToPixels(num) {
        return (num === null) ? null : num + 'px';
    }
}

Menu.propTypes = {
    iasAlign: PropTypes.string,
    toggleElement: PropTypes.element.isRequired
};

export default Menu;
