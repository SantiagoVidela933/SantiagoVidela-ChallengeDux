'use client';

import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styles from './UserTable.module.css';
import ButtonAction from '@/components/atoms/ButtonAction/ButtonAction';
import { User } from '@/types/user';

interface UserTableProps {
  users: User[];
  loading: boolean;
  first: number;
  rows: number;
  totalRecords: number;
  onPageChange: (e: DataTablePageEvent) => void;
  handleEditClick: (user: User) => void;
  handleDeleteClick: (user: User) => void;
}

export default function UserTable({
  users,
  loading,
  first,
  rows,
  totalRecords,
  onPageChange,
  handleEditClick,
  handleDeleteClick,
}: UserTableProps) {

  const actionBodyTemplate = (rowData: User) => (
    <div className={styles.actions}>
      <ButtonAction
        label="Editar Usuario"
        icon="pi-pencil"
        onClick={() => handleEditClick(rowData)}
        variant="edit"
      />
      <ButtonAction
        label="Eliminar"
        icon="pi-trash"
        onClick={() => handleDeleteClick(rowData)} 
        variant="delete"
      />
    </div>
  );

  const headerWithSortIcon = (headerText: string) => (
    <div className={styles.header}>
      <span>{headerText}</span>
      <span className={`pi pi-sort-alt ${styles.sortIcon}`} aria-hidden="true" role="presentation" />
    </div>
  );

  return (
    <DataTable
      value={users}
      lazy
      paginator
      first={first}
      rows={rows}
      totalRecords={totalRecords}
      onPage={onPageChange}
      loading={loading}
      className={styles.dataTable}
    >
      <Column field="id" header={headerWithSortIcon('ID')} />
      <Column field="usuario" header={headerWithSortIcon('Usuario')} />
      <Column field="estado" header={headerWithSortIcon('Estado')} />
      <Column field="sector" header={headerWithSortIcon('Sector')} />
      <Column body={actionBodyTemplate} header="Acciones"   headerClassName={styles.actionsHeader} className={styles.actionsColumn}/>
    </DataTable>
  );
}
