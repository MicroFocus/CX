import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import methodsDisplay from './methods-display.reducer';
import navigation from './navigation.reducer';

const rootReducer = combineReducers({
    authentication,
    methodsDisplay,
    navigation
});

export default rootReducer;
