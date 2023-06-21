import type { RequestHandler } from './$types';
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

import { OPENAI_KEY } from '$env/static/private';

const config = new Configuration({
	apiKey: OPENAI_KEY
});

const openai = new OpenAIApi(config);

export const POST: RequestHandler = async ({ request }) => {
	const { messages } = await request.json();

	try {
		const response = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			stream: true,
			max_tokens: 300,
			temperature: 0,
			messages
		});

		const stream = OpenAIStream(response);

		return new StreamingTextResponse(stream);
	} catch (error) {
		console.error(error);

		return new Response(JSON.stringify(error), {
			status: 400,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
};
