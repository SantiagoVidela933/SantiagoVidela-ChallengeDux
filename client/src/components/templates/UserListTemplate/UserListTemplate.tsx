'use client';
import { User } from '@/types/user';
import React, { useState } from 'react';
import { createUser, deleteUser, updateUser } from '@/api/users';
import UserTable from '../../organisms/UserTable/UserTable';
import UserFormModal from '../../organisms/UserFormModal/UserFormModal';
import Button from '../../atoms/Button/Button';
import { useUserList } from '@/hooks/useUserList';
import { DropdownChangeEvent } from 'primereact/dropdown';
import FiltersBar from '../../molecules/FiltersBar/FiltersBar';
import styles from './UserListTemplate.module.css';
import { Dialog } from 'primereact/dialog';

type Props = {
  initialUsers: User[];
  totalCount: number;
};

const UserListTemplate = ({ initialUsers, totalCount }: Props) => {
  // hook para manejar paginacion, filtros y recarga de datos
  const {
    users,
    totalRecords,
    loading,
    first,
    rows,
    searchTerm,
    estado,
    setSearchTerm,
    setEstado,
    setSector,
    onPageChange,
    fetchData,
  } = useUserList(initialUsers, totalCount);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleCreateClick = () => {
    setEditingUser(null);
    setModalVisible(true);
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setModalVisible(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setConfirmDeleteVisible(true);
  };

  // Confirmar eliminacion de usuario
  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete.id);
      await fetchData();
      setConfirmDeleteVisible(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      alert('Error al eliminar usuario');
    }
  };

  // Guardar usuario creado o modificado
  const handleSave = async (userData: Partial<User>) => {
    if (editingUser) {
      await updateUser(editingUser.id, userData);
    } else {
      await createUser(userData);
    }
    await fetchData();
    setModalVisible(false);
  };

  // Handlers para filtros de busqueda y seleccion
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchTerm(e.target.value)
  }

  const handleEstadoChange = (e: DropdownChangeEvent) => {
    setEstado(e.value);
  };

  const handleSectorChange = (e: DropdownChangeEvent) => {
    setSector(e.value);
  };

  return (
    <div >
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>Usuarios</h1>
        <Button label="Crear Usuario" icon="pi pi-plus" onClick={handleCreateClick} />
      </div>
      <FiltersBar 
        searchTerm={searchTerm}
        estado={estado}
        onSearchChange={handleSearchChange}
        onEstadoChange={handleEstadoChange}
        onSectorChange={handleSectorChange}
      />
      <UserTable
        users={users}
        loading={loading}
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
      <UserFormModal
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
        onSave={handleSave}
        editingUser={editingUser}
      />
      <Dialog
        header="Confirmar eliminación"
        visible={confirmDeleteVisible}
        style={{ width: '30rem' }}
        onHide={() => setConfirmDeleteVisible(false)}
        headerStyle={{ backgroundColor: '#0763e7', color: 'white' }}
        closable={true}
      >
        <div className={styles.dialogMessage}>
          ¿Seguro que querés eliminar el usuario <strong>{userToDelete?.usuario}</strong>?
        </div>
        <div className={styles.dialogButtons}>
          <Button label="Confirmar" icon="pi pi-check" onClick={confirmDelete} />
          <Button label="Cancelar" icon="pi pi-times" severity="secondary" onClick={() => setConfirmDeleteVisible(false)} outlined />
        </div>
      </Dialog>
    </div>
  );
};

export default UserListTemplate;
