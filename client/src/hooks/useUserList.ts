import { DEFAULT_LIMIT, fetchUsers } from '@/api/users';
import { User } from '@/types/user';
import { useState, useEffect, useCallback, useRef } from 'react';

interface FetchUsersParams {
  limit: number;
  page: number;
  sector: number;
  search?: string;
  estado?: 'ACTIVO' | 'INACTIVO';
}

export const useUserList = (initialUsers: User[], initialTotal: number) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [totalRecords, setTotalRecords] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(DEFAULT_LIMIT);

  const [searchTerm, setSearchTerm] = useState('');
  const [estado, setEstado] = useState<'ACTIVO' | 'INACTIVO' | null>(null);
  const [sector, setSector] = useState<number | null>(8000);

  const page = Math.floor(first / rows) + 1;

  // Ref para detectar si es la primera carga del hook
  const isInitialMount = useRef(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params: FetchUsersParams = {
        limit: rows,
        page,
        sector: sector ?? 8000,
      };

      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      if (estado !== null) {
        params.estado = estado;
      }

      const { data, total } = await fetchUsers(params);
      setUsers(data);
      setTotalRecords(total);
    } catch (err) {
      console.error('Error al obtener usuarios', err);
    } finally {
      setLoading(false);
    }
  }, [rows, page, searchTerm, estado, sector]);

  useEffect(() => {
    if (isInitialMount.current) {
      // En la primera carga, ya tenemos la data (SSR), entonces se evita hacer fetch nuevamente
      isInitialMount.current = false;
      return;
    }
    // Despues si se hace
    fetchData();
  }, [fetchData]);

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return {
    users,
    totalRecords,
    loading,
    first,
    rows,
    searchTerm,
    estado,
    sector,
    setSearchTerm,
    setEstado,
    setSector,
    onPageChange,
    fetchData,
  };
};
