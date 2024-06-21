import { messages as rawMessage } from '$lib/db';

export const load = async ({ url: { searchParams } }) => {
	const q = searchParams.get('q');

	const filterdMessages = rawMessage.filter((m) =>
		q ? m.message.toLowerCase().includes(q?.toLowerCase()) : true
	);
	const page = parseInt(searchParams.get('page') || '1');
	const pageSize = 100;
	const from = (page - 1) * pageSize;
	const to = page * pageSize;
	const messages = filterdMessages.slice(from, to);

	return {
		q,
		messages,
		pageSize,
		page,
		count: filterdMessages.length
	};
};
