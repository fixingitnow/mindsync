const worker = {
	async fetch(request, env, ctx) {
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
			'Access-Control-Max-Age': '86400',
		};
		try {
			if (request.method === 'GET') {
				// GET request: Retrieve tasks for a session
				// Expected request parameters: URL containing sessionid
				// Returns: Response with tasks for the session or "Session not found" if sessionid is invalid
				const url = new URL(request.url);
				const sessionid = url.pathname.split('/').pop();
				const tasks = await env.DB1.get(sessionid);
				if (tasks === null) {
					return new Response('Session not found', { status: 404, headers: corsHeaders });
				}
				console.log(tasks, 'tasks server');
				return new Response(`${tasks}`, { status: 200, headers: corsHeaders });
			} else if (request.method === 'POST') {
				// POST request: Create a new task for a session
				// Expected request parameters: JSON object containing sessionid, taskname, taskdescription, and taskduration
				// Returns: Response indicating successful task creation or "Invalid request" if any required parameter is missing
				const { sessionid, taskname, taskdescription, taskduration } = await request.json();
				if (!sessionid || !taskname || !taskdescription || !taskduration) {
					return new Response('Invalid request', { status: 400, headers: corsHeaders });
				}

				let tasks = await env.DB1.get(sessionid);
				if (tasks === null) {
					tasks = [];
				} else {
					tasks = JSON.parse(tasks);
				}

				tasks.push({ taskname, taskdescription, taskduration });
				await env.DB1.put(sessionid, JSON.stringify(tasks));

				return new Response('Task Created', { status: 200, headers: corsHeaders });
			} else if (request.method === 'DELETE') {
				// DELETE request: Delete a task from a session
				// Expected request parameters: JSON object containing sessionid and taskname
				// Returns: Response indicating successful task deletion or "Invalid request" if any required parameter is missing,
				// or "Session not found" if sessionid is invalid
				const { sessionid, taskname } = await request.json();
				if (!sessionid || !taskname) {
					return new Response('Invalid request', { status: 400, headers: corsHeaders });
				}

				let tasks = await env.DB1.get(sessionid);
				if (tasks === null) {
					return new Response('Session not found', { status: 404, headers: corsHeaders });
				}

				tasks = JSON.parse(tasks);
				const updatedTasks = tasks.filter((task) => task.taskname !== taskname);
				await env.DB1.put(sessionid, JSON.stringify(updatedTasks));

				return new Response('Task Deleted', { status: 200, headers: corsHeaders });
			} else {
				// Unsupported request method
				return new Response('Method not allowed', { status: 405, headers: corsHeaders });
			}
		} catch (error) {
			// Internal server error
			console.error(error);
			return new Response('Internal Server Error', { status: 500, headers: corsHeaders });
		}
	},
};

export default worker;
