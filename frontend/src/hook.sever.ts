import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event , resolve }) => {
    
    if(event.locals.username) {
        console.log('User is logged in');
    }

    const response = await resolve(event);

    // You can modify the response here if needed
    return response;
};