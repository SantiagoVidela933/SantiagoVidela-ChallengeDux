import { User } from "@/types/user";

export const BASE_URL = 'https://staging.duxsoftware.com.ar/api-test/personal';
export const SECTOR = 8000;
export const DEFAULT_LIMIT = 10;

interface FetchUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    estado?: 'ACTIVO' | 'INACTIVO';
}

export async function fetchUsers(params:FetchUsersParams = {}): Promise<{data: User[]; total: number;}> {
    const { page = 1, limit = DEFAULT_LIMIT, search = '', estado } = params;

    const url = new URL(BASE_URL);
    url.searchParams.append('_page', page.toString());
    url.searchParams.append('_limit', limit.toString());
    url.searchParams.append('sector', SECTOR.toString());

    if (search) {
        url.searchParams.append('usuario_like', search);
    }
    if (estado) {
        url.searchParams.append('estado', estado);
    }

    const res = await fetch(url.toString());

    if(!res.ok) throw new Error('Error fetching users');

    const data = await res.json();

    const total = Number(res.headers.get('X-Total-Count')) || data.length;

    return { data, total };
};

export async function createUser(userData: Partial<User>): Promise<User> {
    const url = new URL(BASE_URL);
    url.searchParams.append('sector', SECTOR.toString());

    const res = await fetch(url.toString(), {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            ...userData,
            sector: SECTOR,
        }),
    });

    if(!res.ok) throw new Error('Error creating user');

    const data = await res.json();
    return data;
};

export async function updateUser(id:number|string, userData: Partial<User>): Promise<User> {
    const url = new URL(`${BASE_URL}/${id}`);
    url.searchParams.append('sector', SECTOR.toString());

    const res = await fetch(url.toString(), {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            ...userData,
            sector: SECTOR,
        }),
    });

    if(!res.ok) throw new Error('Error updating user');

    const data = await res.json();
    return data;
};

export async function deleteUser(id:number|string): Promise<void> {
    const url = new URL(`${BASE_URL}/${id}`);
    url.searchParams.append('sector', SECTOR.toString());

    const res = await fetch(url.toString(), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if(!res.ok) throw new Error('Error deleting user');
}
