export const H_ALIGN = { start: 'start', center: 'center', end: 'end' };
export const V_ALIGN = { top: 'top', center: 'center', bottom: 'bottom' };
const MENU_MARGIN_PX = 24;

/* Calculates the expected position of the menu content.
 *
 * Assumes the menu content already has a size (i.e. the element does not have 'display: none;')
 * Returns an object specifying the CSS fixed positioning that will position the menu properly.
 * The object is of type { left: Number, right: Number, top: Number, bottom: Number } where each Number value is the
 * number of pixels that should be used for the respective CSS positioning property.
 */
function calculateMenuPosition(menuContentElement, toggleElement, alignment) {
    // 1. Calculate constants for reference
    const menuContentDOMRect = menuContentElement.getBoundingClientRect();
    const toggleDOMRect = toggleElement.getBoundingClientRect();
    const viewportDOMRect = document.body.getBoundingClientRect();
    const toggleSize = {
        height: toggleDOMRect.height,
        width: toggleDOMRect.width
    };
    const viewportSize = {
        height: viewportDOMRect.height,
        width: viewportDOMRect.width
    };
    const isRtlLayout = elementIsRtlLayout(menuContentElement);

    // 2. Determine size of menu content after being constrained by viewport.
    const maxMenuContentSize = {
        height: viewportDOMRect.height - (2 * MENU_MARGIN_PX),
        width: viewportDOMRect.width - (2 * MENU_MARGIN_PX)
    };
    const menuContentSize = {
        height: Math.min(menuContentDOMRect.height, maxMenuContentSize.height),
        width: Math.min(menuContentDOMRect.width, maxMenuContentSize.width)
    };

    // 3. Determine ideal position of menu content before being constrained by viewport
    //    The diagram below shows how the menuContent displays relative to the toggle element at different alignments.
    //    The toggle and menuContent elements are shown by small and big rectangles, respectively. We first position
    //    the menuContent properly for the default alignment of 'start bottom'. Then we add an offset constant to this
    //    position for the other 8 alignments. The offset constant will move the menuContent position from 'start' to
    //    'end' (horizontally) or 'bottom' to 'top' (vertically). Half of this constant will move it from 'start' to
    //    'center' (horizontally) and 'bottom' to 'center' (vertically), since 'center' is halfway between the other
    //    horizontal and vertical alignments. The alignment offset factor tells us how much of the offset constant
    //    to subtract from the default position. The default positions and offset constants are:
    //
    //          Horizontal Alignment              Horizontal alignment
    //          Start      Center     End         - Default Position: Left side of menu matches left side of toggle
    //    V   B +---+        +---+        +---+   - Offset Constant: 'start -> 'end' moves menuContent the entire
    //    e   o |   |        |   |        |   |     menuContent width, MINUS the toggle width
    //    r   t +---+---+  +-+---+-+  +---+---+
    //    t   t |       |  |       |  |       |
    //    i   o |       |  |       |  |       |   Vertical
    //    c   m |       |  |       |  |       |   - Default Position: Top side of menu matches bottom side of toggle
    //    a     |       |  |       |  |       |   - Offset Constant: 'bottom' -> 'top' moves menuContent the entire
    //    l     |       |  |       |  |       |     menuContent height, IN ADDITION TO the toggle height
    //          +-------+  +-------+  +-------+
    //    A
    //    l   C +-------+
    //    i   e |       |
    //    g   n +---+   |
    //    n   t |   |   |
    //    m   e +---+   |
    //    e   r |       |
    //    n     +-------+
    //    t
    //        T +-------+
    //        o |       |
    //        p |       |
    //          |       |
    //          |       |
    //          |       |
    //          +---+---+
    //          |   |
    //          +---+
    const offsetConstant = {
        height: menuContentSize.height + toggleSize.height,
        width: menuContentSize.width - toggleSize.width
    };
    const alignmentOffsetFactor = getAlignmentOffsetFactor(alignment, isRtlLayout);
    const position = {
        top: toggleDOMRect.bottom - (offsetConstant.height * alignmentOffsetFactor.height),
        left: toggleDOMRect.left - (offsetConstant.width * alignmentOffsetFactor.width)
    };

    // 4. If menu is positioned outside of viewport, move it into viewport area
    const minPosition = {
        height: MENU_MARGIN_PX,
        width: MENU_MARGIN_PX
    };
    const maxPosition = {
        height: viewportSize.height - MENU_MARGIN_PX - menuContentSize.height,
        width: viewportSize.width - MENU_MARGIN_PX - menuContentSize.width
    };

    if (position.top < minPosition.height) {
        position.top = minPosition.height;
    }
    else if (position.top > maxPosition.height) {
        position.top = maxPosition.height;
    }

    if (position.left < minPosition.width) {
        position.left = minPosition.width;
    }
    else if (position.left > maxPosition.width) {
        position.left = maxPosition.width;
    }

    // 5. Calculate bottom and right positions
    position.bottom = viewportSize.height - (position.top + menuContentSize.height);
    position.right = viewportSize.width - (position.left + menuContentSize.width);

    return position;
}
export default calculateMenuPosition;

function getAlignmentOffsetFactor(alignment, isRtlLayout) {
    const alignmentOffsetFactor = {};

    switch (alignment.vertical) {
        case V_ALIGN.bottom:
            alignmentOffsetFactor.height = 0;
            break;
        case V_ALIGN.center:
            alignmentOffsetFactor.height = 0.5;
            break;
        case V_ALIGN.top:
            alignmentOffsetFactor.height = 1;
            break;
        default:
            alignmentOffsetFactor.height = 0;
            console.error('Unacceptable menu vertical alignment: ' + alignment.vertical);
    }

    switch (alignment.horizontal) {
        case H_ALIGN.start:
            alignmentOffsetFactor.width = 0;
            break;
        case H_ALIGN.center:
            alignmentOffsetFactor.width = 0.5;
            break;
        case H_ALIGN.end:
            alignmentOffsetFactor.width = 1;
            break;
        default:
            alignmentOffsetFactor.width = 0;
            console.error('Unacceptable menu horizontal alignment: ' + alignment.horizontal);
    }

    // In RTL, 'start' and 'end' alignments switch positions on the page. We can do this by switching the
    // horizontal offset factors for 'start' and 'end'
    if (isRtlLayout) {
        alignmentOffsetFactor.width = 1 - alignmentOffsetFactor.width;
    }

    return alignmentOffsetFactor;
}

function elementIsRtlLayout(element) {
    const direction = window.getComputedStyle(element, null).getPropertyValue('direction');
    return (direction === 'rtl');
}
