'use client';

import { estadoOptions } from "@/data/estadoOptions";
import { sectorOptions } from "@/data/sectorOptions";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { ChangeEvent } from "react";
import styles from "./FiltersBar.module.css";

interface FiltersBarProps {
  searchTerm: string;
  estado: null | "ACTIVO" | "INACTIVO";
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEstadoChange: (e: DropdownChangeEvent) => void;
  onSectorChange: (e: DropdownChangeEvent) => void;
  sector?: string | null;
}

export default function FiltersBar({
  searchTerm,
  estado,
  onSearchChange,
  onEstadoChange,
  onSectorChange,
  sector,
}: FiltersBarProps) {
  return (
    <div className={`p-inputgroup ${styles.filtersContainer}`}>
      <span className={`p-float-label ${styles.inputFlex}`}>
        <InputText
          id="search"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <label htmlFor="search">Buscar usuario</label>
      </span>

      <span className={`p-float-label ${styles.dropdownFixed}`}>
        <Dropdown
          id="estado"
          value={estado}
          options={estadoOptions}
          optionValue="value"
          onChange={onEstadoChange}
          appendTo="self"
        />
      </span>

      <span className={`p-float-label ${styles.dropdownFixed}`}>
        <Dropdown
          id="sector"
          value={sector}
          options={sectorOptions}
          optionValue="value"
          onChange={onSectorChange}
          appendTo="self"
        />
        <label htmlFor="sector">Filtrar sector</label>
      </span>
    </div>
  );
}
