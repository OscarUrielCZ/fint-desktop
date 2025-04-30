import React from "react";

import { Box } from "@mui/material";

import Chip from "../Chip/index.tsx";

import { Period } from "../../common/types.ts";

function PeriodFilters({
  setPeriodSelected,
  periodSelected,
  dateComponents,
  setDateComponents,
}: any) {
  return (
    <Box>
      <Box>
        <Chip
          onClick={() => setPeriodSelected(Period.MONTH)}
          style={{
            backgroundColor:
              periodSelected === Period.MONTH ? "#9EA1D4" : "#ddd",
          }}
        >
          Mes
        </Chip>
        <Chip
          onClick={() => setPeriodSelected(Period.YEAR)}
          style={{
            backgroundColor:
              periodSelected === Period.YEAR ? "#9EA1D4" : "#ddd",
          }}
        >
          Año
        </Chip>
        <Chip
          onClick={() => setPeriodSelected(Period.FULL)}
          style={{
            backgroundColor:
              periodSelected === Period.FULL ? "#9EA1D4" : "#ddd",
          }}
        >
          Todo
        </Chip>
      </Box>

      <div>
        {periodSelected === Period.MONTH && (
          <div>
            <span>Selecciona un mes </span>
            <select
              value={dateComponents.month}
              onChange={(e) =>
                setDateComponents({
                  ...dateComponents,
                  month: Number(e.target.value),
                })
              }
            >
              <option value="0">Enero</option>
              <option value="1">Febrero</option>
              <option value="2">Marzo</option>
              <option value="3">Abril</option>
              <option value="4">Mayo</option>
              <option value="5">Junio</option>
              <option value="6">Julio</option>
              <option value="7">Agosto</option>
              <option value="8">Septiembre</option>
              <option value="9">Octubre</option>
              <option value="10">Noviembre</option>
              <option value="11">Diciembre</option>
            </select>
          </div>
        )}
        {periodSelected !== Period.FULL && (
          <div>
            <span>Selecciona un año </span>
            <select
              value={dateComponents.year}
              onChange={(e) =>
                setDateComponents({
                  ...dateComponents,
                  year: Number(e.target.value),
                })
              }
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
        )}
      </div>
    </Box>
  );
}

export default PeriodFilters;
