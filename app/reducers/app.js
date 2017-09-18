import * as ActionType from 'actions/app';
import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
	data: [],
});

export default function (state = defaultState, action) {
	switch (action.type) {
	case ActionType.GET_GALLERY:
		return state.merge({ data: action.payload.data });

	case ActionType.CLEAR_GALLERY:
		return state.merge({ data: [] });


	default:
		return state;
	}
}
