import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";

import { Box } from "@mui/material";

import Chip from "../Chip/index.tsx";

import { DATE_PARAM_FORMAT } from "../../common/constants.ts";
import { Period } from "../../common/types.ts";

function PeriodFilters({ period, setPeriod }: any) {
  const now = moment(period[0]);

  const [selectedYear, setSelectedYear] = useState<string>(now.format("YYYY"));
  const [selectedMonth, setSelectedMonth] = useState<string>(now.format("MM"));
  const [periodSelected, setPeriodSelected] = useState<Period>(Period.MONTH);

  useEffect(
    useCallback(() => {
      if (periodSelected === Period.MONTH || periodSelected === Period.YEAR) {
        const dateRef = `${selectedYear}-${selectedMonth}-01`;
        const d = moment(dateRef);

        const start = d.startOf(periodSelected).format(DATE_PARAM_FORMAT);
        const end = d.endOf(periodSelected).format(DATE_PARAM_FORMAT);

        setPeriod([start, end]);
      } else if (periodSelected === Period.FULL) {
        setPeriod([
          moment("2023-01-01").format(DATE_PARAM_FORMAT),
          moment().format(DATE_PARAM_FORMAT),
        ]);
      }
    }, [selectedYear, selectedMonth, periodSelected]),
    [selectedYear, selectedMonth, periodSelected]
  );

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
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="01">Enero</option>
              <option value="02">Febrero</option>
              <option value="03">Marzo</option>
              <option value="04">Abril</option>
              <option value="05">Mayo</option>
              <option value="06">Junio</option>
              <option value="07">Julio</option>
              <option value="08">Agosto</option>
              <option value="09">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>
        )}
        {periodSelected !== Period.FULL && (
          <div>
            <span>Selecciona un año </span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        )}
      </div>
    </Box>
  );
}

export default PeriodFilters;
