import {onCreateToast} from './toastEvents';
import produce from 'immer';
import React from 'react';
import Toast from './Toast';

const CONTAINER_TOP_MARGIN_PX = 15;
const FILLER_TYPE = 'filler';
const IDENTICAL_TOAST_THROTTLE_PERIOD = 1500;
const TOAST_SPACING_PX = 15;
const SLIDE_IN_FRAMES_PER_SECOND = 40;  // Slide-in looks jittery around 25 frames/second, so keep it well above that
const SLIDE_IN_INTERVAL = Math.round(1000 / SLIDE_IN_FRAMES_PER_SECOND);
const SLIDE_IN_PX_PER_SECOND = 500;     // As requested by Lynn Christensen
const SLIDE_IN_PX_PER_INTERVAL = Math.round(SLIDE_IN_PX_PER_SECOND / SLIDE_IN_FRAMES_PER_SECOND);

let throttledToastStrings = [];
let toastId = 0;

/* Displays a container containing toast notifications.
 * When toasts are created, the container repositions to show the new toasts just barely off the screen, then moves
 * downward until all are visible and below the container top margin. The container positions toasts only vertically.
 * Each toast is responsible for its own horizontal alignment and for notifying the container when it has been
 * dismissed. When a toast is dismissed, any toasts below it move upward to fill in the available space. This is done
 * by replacing the dismissed toast with a filler element that shrinks over time and is then removed. All toast
 * movement is coordinated by the slide interval timer.
 */
class ToastContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.slideIntervalID = null;
        this.state = {
            containerTopPosition: CONTAINER_TOP_MARGIN_PX,
            elements: []
        };
    }

    clearSlideTimer() {
        if (this.slideIntervalID) {
            clearInterval(this.slideIntervalID);
            this.slideIntervalID = null;
        }
    }

    componentDidMount() {
        onCreateToast(this.createToast);
    }

    componentWillUnmount() {
        this.clearSlideTimer();
    }

    createToast = ({type, description}) => {
        // Throttle identical toasts to avoid duplicate notifications. Compare using a string derived from the toast
        const toastString = `${type}::${description}`;
        if (throttledToastStrings.indexOf(toastString) !== -1) {
            return;
        }

        throttledToastStrings.push(toastString);
        setTimeout(() => {
            throttledToastStrings = throttledToastStrings.filter(string => string !== toastString);
        }, IDENTICAL_TOAST_THROTTLE_PERIOD);

        // Create toast
        const toast = {
            allocatedSpace: 0,
            description,
            id: `toast-${++toastId}`,
            type
        };

        this.setState(produce(draftState => {
            draftState.elements.unshift(toast);
        }));
    };

    dismissToast = (id) => {
        this.setState(produce(draftState => {
            const toastIndex = this.findToastIndex(draftState.elements, id);

            if (toastIndex === -1) {
                return;
            }

            const toast = draftState.elements[toastIndex];
            const filler = { allocatedSpace: toast.allocatedSpace, type: FILLER_TYPE };
            draftState.elements[toastIndex] = filler;
        }), this.setSlideTimer);
    };

    findToastIndex(elements, id) {
        for (let index = 0; index < elements.length; index++) {
            if (elements[index].id === id) {
                return index;
            }
        }

        return -1;
    }

    onToastLoadComplete(id, height) {
        const allocatedSpace = height + TOAST_SPACING_PX;

        this.setState(produce(draftState => {
            const toastIndex = this.findToastIndex(draftState.elements, id);
            if (toastIndex === -1) {
                return;
            }

            draftState.containerTopPosition -= allocatedSpace;
            draftState.elements[toastIndex].allocatedSpace = allocatedSpace;
        }), this.setSlideTimer);
    }

    render() {
        let elementTopPosition = this.state.containerTopPosition;
        return this.state.elements.map((element) => {
            let topPosition = null;
            if (element.allocatedSpace !== 0) {
                topPosition = elementTopPosition;
                elementTopPosition += element.allocatedSpace;
            }

            if (element.type === FILLER_TYPE) {
                return null;
            }

            return (
                <Toast
                    key={element.id}
                    onClose={() => this.dismissToast(element.id)}
                    onLoadComplete={(height) => this.onToastLoadComplete(element.id, height)}
                    topPosition={topPosition}
                    type={element.type}
                >
                    {element.description}
                </Toast>
            );
        });
    }

    setSlideTimer = () => {
        if (!this.slideIntervalID) {
            this.slideIntervalID = setInterval(this.slide, SLIDE_IN_INTERVAL);
        }
    };

    // Slide toasts downward until they show on the screen, upward to fill in space between toasts
    slide = () => {
        this.setState(produce(draftState => {
            let changeMade = false;

            // Fill in space between toasts by shrinking and removing filler elements
            for (let index = 0; index < draftState.elements.length; index++) {
                const element = draftState.elements[index];
                if (element.type === FILLER_TYPE) {
                    const newElementAllocatedSpace = element.allocatedSpace - SLIDE_IN_PX_PER_INTERVAL;
                    if (newElementAllocatedSpace > 0) {
                        draftState.elements[index].allocatedSpace = newElementAllocatedSpace;
                    }
                    else {
                        draftState.elements.splice(index, 1);
                    }

                    changeMade = true;
                    break;      // Shrink only 1 filler element per pass to cap the speed to SLIDE_IN_PX_PER_INTERVAL
                }
            }

            // Slide toasts downward by adjusting the top position of the container
            if (draftState.containerTopPosition !== CONTAINER_TOP_MARGIN_PX) {
                draftState.containerTopPosition = Math.min(
                    draftState.containerTopPosition + SLIDE_IN_PX_PER_INTERVAL, CONTAINER_TOP_MARGIN_PX
                );
                changeMade = true;
            }

            // If nothing has changed, all elements have settled, so we can stop sliding them
            if (!changeMade) {
                this.clearSlideTimer();
            }
        }));
    };
}

export default ToastContainer;
