const worker = {
	async fetch(request, env, ctx) {
		try {
			if (request.method === 'GET') {
				// Parse the URL
				const url = new URL(request.url);

				// Read the sessionid from the request
				const sessionid = url.pathname.split('/').pop();

				const value = await env.DB1.get(sessionid);
				if (value === null) {
					return new Response('Task not found', { status: 404 });
				}
				return new Response(`${value}`, { status: 200 });
			} else if (request.method === 'POST') {
				const { sessionid, taskname, taskdescription, taskDuration } = await request.json();
				if (!sessionid || !taskname || !taskdescription || !taskDuration) {
					return new Response('Invalid request', { status: 400 });
				}
				await env.DB1.put(sessionid, JSON.stringify({ taskname, taskdescription, taskDuration }));
				return new Response('Task Created', { status: 200 });
			} else if (request.method === 'DELETE') {
				const { sessionid, taskname } = await request.json();
				if (!sessionid || !taskname) {
					return new Response('Invalid request', { status: 400 });
				}
				await env.DB1.delete(sessionid);
				return new Response('Task Deleted', { status: 200 });
			} else {
				return new Response('Method not allowed', { status: 405 });
			}
		} catch (error) {
			console.error(error);
			return new Response('Internal Server Error', { status: 500 });
		}
	},
};

export default worker;
