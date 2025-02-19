import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import pocketbase from 'pocketbase';
const pb = new pocketbase('http://127.0.0.1:8080');

export const actions = {
	login: async ({ request, cookies, locals }) => {
		const data = await request.formData();
		if (data.has('email') && data.has('password')) {
			try {
				const authData = await pb
					.collection('users')
					.authWithPassword(data.get('email') as string, data.get('password') as string);
				const token = authData.token;
				cookies.set('shutterscape_token', token, { path: '/', secure: true, sameSite: 'lax' });
				locals.username = pb.authStore.record?.id || '';
				console.log('Logged in');
			} catch (error) {
				return { error: 'Invalid credentials' };
			}
			return redirect(302, '/');
		}
	}
} satisfies Actions;
