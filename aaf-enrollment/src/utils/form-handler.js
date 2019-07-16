// Sets the form change handler on the provided React component
// Also sets the React component's initial state based on its initial form values and any optional other state
export function generateFormChangeHandler(thisRef, initialFormState, initialOtherState = {}) {
    const handleChange = (event) => {
        const target = event.target;
        const type = target.type;
        const inputName = target.name;
        const value = (type === 'checkbox') ? target.checked : target.value;

        if (!inputName) {
            console.error('Can\'t add changes to an input with no name in the state');
            return;
        }

        thisRef.setState((state) => {
            const newFormState = {...state.form};
            newFormState[inputName] = value;

            return {
                form: newFormState,
                dataDirty: true
            };
        });
    };

    thisRef.state = {
        ...initialOtherState,
        dataDirty: false,
        form: initialFormState
    };
    thisRef.handleChange = handleChange;
}
