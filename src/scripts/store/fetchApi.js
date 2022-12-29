import apiFetch from '@wordpress/api-fetch';
import { delay } from '../utils/effects';
import { addNotice } from './reducer';

/**
 * It fetches a list of notices from the API,
 * and then dispatches an action to add each notice to the store
 *
 * @param {string} path - The path to the API endpoint.
 *
 * @return {Function} A function that takes a dispatch function as an argument.
 */
export default function fetchApi(path = '/wp/v2/notifications') {
	return function (dispatch) {
		apiFetch({
			method: 'GET',
			path,
		}).then((response) => {
			// TODO: maybe it's better to deliver all notifications immediately? 🤔
			response.forEach((notice) => {
				delay(100).then(() => dispatch(addNotice(notice)));
			});
		});
	};
}
