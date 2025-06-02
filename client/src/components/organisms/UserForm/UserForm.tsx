'use client';

import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import styles from './UserForm.module.css';
import Button from '@/components/atoms/Button/Button';

interface UserFormProps {
  usuario: string;
  setUsuario: (value: string) => void;
  estado: 'ACTIVO' | 'INACTIVO' | null;
  setEstado: (value: 'ACTIVO' | 'INACTIVO' | null) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function UserForm({
  usuario,
  setUsuario,
  estado,
  setEstado,
  onSubmit,
  onCancel
}: UserFormProps) {
  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="id">ID</label>
        <InputText id="id" disabled placeholder="Autogenerado" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="usuario">Nombre</label>
        <InputText
          id="usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Ingrese el nombre del usuario"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="estado">Estado</label>
        <Dropdown
          id="estado"
          value={estado}
          options={[
            { label: 'Activo', value: 'ACTIVO' },
            { label: 'Inactivo', value: 'INACTIVO' },
          ]}
          onChange={(e) => setEstado(e.value)}
          placeholder="Seleccionar el estado"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="sector">Sector</label>
        <Dropdown id="sector" placeholder="Seleccionar" disabled />
      </div>

      <div className={styles.actions}>
        <Button label="Confirmar" icon="pi pi-check" onClick={onSubmit} />
        <Button label="Cancelar" icon="pi pi-times" severity="secondary" onClick={onCancel} outlined />
      </div>
    </>
  );
}
