import { NextResponse } from 'next/server';
import { apiFetch } from '@/lib/apiFetch';

const API_ROUTES = {
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  me: '/auth/me',
};

export async function POST(req: Request) {
  const { action, ...body } = await req.json();
  const token = req.headers.get('Authorization');

  try {
    let response;
    switch (action) {
      case 'login':
        response = await apiFetch(API_ROUTES.login, { method: 'POST', body });
        break;
      case 'register':
        response = await apiFetch(API_ROUTES.register, { method: 'POST', body });
        break;
      case 'logout':
        response = await apiFetch(API_ROUTES.logout, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
        break;
      case 'refresh':
        response = await apiFetch(API_ROUTES.refresh, { method: 'POST', body });
        break;
      case 'me':
        response = await apiFetch(API_ROUTES.me, { method: 'GET', headers: { Authorization: `Bearer ${token}` } });
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // * Take a set-cookie from Laravel Response
    const laravelSetCookie = response.headers.get('set-cookie');

    // * Take Json Body from Response Laravel
    const data = await response.json();

    // * Create a new nextResponse
    const nextResponse = NextResponse.json(data, { status: response.status });

    // * Continue set-cookies to the browser
    if (laravelSetCookie) {
      nextResponse.headers.set('Set-Cookie', laravelSetCookie);
    }

    return nextResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}