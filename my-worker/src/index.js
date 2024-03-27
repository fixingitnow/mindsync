const worker = {
	async fetch(request, env, ctx) {
		try {
			if (request.method === 'GET') {
				// Parse the URL
				const url = new URL(request.url);

				// Read the sessionid from the request
				const sessionid = url.pathname.split('/').pop();

				const tasks = await env.DB1.get(sessionid);
				if (tasks === null) {
					return new Response('Session not found', { status: 404 });
				}
				return new Response(`${tasks}`, { status: 200 });
			} else if (request.method === 'POST') {
				const { sessionid, taskname, taskdescription, taskDuration } = await request.json();
				if (!sessionid || !taskname || !taskdescription || !taskDuration) {
					return new Response('Invalid request', { status: 400 });
				}

				let tasks = await env.DB1.get(sessionid);
				if (tasks === null) {
					tasks = [];
				} else {
					tasks = JSON.parse(tasks);
				}

				tasks.push({ taskname, taskdescription, taskDuration });
				await env.DB1.put(sessionid, JSON.stringify(tasks));

				return new Response('Task Created', { status: 200 });
			} else if (request.method === 'DELETE') {
				const { sessionid, taskname } = await request.json();
				if (!sessionid || !taskname) {
					return new Response('Invalid request', { status: 400 });
				}

				let tasks = await env.DB1.get(sessionid);
				if (tasks === null) {
					return new Response('Session not found', { status: 404 });
				}

				tasks = JSON.parse(tasks);
				const updatedTasks = tasks.filter((task) => task.taskname !== taskname);
				await env.DB1.put(sessionid, JSON.stringify(updatedTasks));

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
