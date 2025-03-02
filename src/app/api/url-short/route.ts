import { NextResponse } from 'next/server';
import { apiFetch } from '@/lib/apiFetch';

const API_ROUTES = {
  store: '/url-short',
};

export async function POST(req: Request) {
  const { action, ...body } = await req.json();
  const token = req.headers.get('Authorization');
  
  try {
    let response;

    switch (action) {
      case 'store':
        response = await apiFetch(API_ROUTES.store, { method: 'POST', body, headers: { Authorization: `Bearer ${token}` } });
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
      }

    const data = await response.json();
    const nextResponse = NextResponse.json(data, { status: response.status });

    return nextResponse;
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}