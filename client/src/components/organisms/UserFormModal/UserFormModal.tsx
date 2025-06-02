'use client';

import { User } from "@/types/user";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";

import styles from './UserFormModal.module.css';
import UserForm from "../UserForm/UserForm";

interface UserFormModalProps {
  visible: boolean;
  onHide: () => void;
  onSave: (user: Partial<User>) => void;
  editingUser?: User | null;
}

export default function UserFormModal({
  visible,
  onHide,
  onSave,
  editingUser
}: UserFormModalProps) {
  const [usuario, setUsuario] = useState('');
  const [estado, setEstado] = useState<'ACTIVO' | 'INACTIVO' | null>('ACTIVO');

  useEffect(() => {
    if (editingUser) {
      setUsuario(editingUser.usuario);
      setEstado(editingUser.estado);
    } else {
      setUsuario('');
      setEstado('ACTIVO');
    }
  }, [editingUser]);

  const handleSubmit = () => {
    if (!usuario.trim()) return;
    onSave({ usuario, estado });
    onHide();
  };

  return (
    <Dialog
      header={editingUser ? 'Editar Usuario' : 'Crear Usuario'}
      visible={visible}
      style={{ width: '40rem' }}
      onHide={onHide}
      className={styles.dialog}
    >
      <UserForm
        usuario={usuario}
        setUsuario={setUsuario}
        estado={estado}
        setEstado={setEstado}
        onSubmit={handleSubmit}
        onCancel={onHide}
      />
    </Dialog>
  );
}
