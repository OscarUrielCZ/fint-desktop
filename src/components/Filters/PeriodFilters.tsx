import React, { Fragment, useCallback, useEffect, useState } from "react";
import moment from "moment";

import { Box, MenuItem, Select, Typography } from "@mui/material";

import Chip from "../Chip/index.tsx";

import { Period } from "../../common/types.ts";

function PeriodFilters({ period, setPeriod, periodType, setPeriodType }: any) {
  const now = moment(period[0]);

  const [selectedYear, setSelectedYear] = useState<string>(now.format("YYYY"));
  const [selectedMonth, setSelectedMonth] = useState<string>(now.format("MM"));

  useEffect(
    useCallback(() => {
      if (periodType === Period.MONTH || periodType === Period.YEAR) {
        const dateRef = `${selectedYear}-${selectedMonth}-01`;
        const d = moment(dateRef);

        const start = d.startOf(periodType).toDate();
        const end = d.endOf(periodType).toDate();

        setPeriod([start, end]);
      } else if (periodType === Period.FULL) {
        setPeriod([
          moment("2023-01-01").toDate(),
          moment().toDate(),
        ]);
      }
    }, [selectedYear, selectedMonth, periodType]),
    [selectedYear, selectedMonth, periodType]
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Chip
          onClick={() => setPeriodType(Period.MONTH)}
          style={{
            backgroundColor: periodType === Period.MONTH ? "#9EA1D4" : "#ddd",
          }}
        >
          Mes
        </Chip>
        <Chip
          onClick={() => setPeriodType(Period.YEAR)}
          style={{
            backgroundColor: periodType === Period.YEAR ? "#9EA1D4" : "#ddd",
          }}
        >
          Año
        </Chip>
        <Chip
          onClick={() => setPeriodType(Period.FULL)}
          style={{
            backgroundColor: periodType === Period.FULL ? "#9EA1D4" : "#ddd",
          }}
        >
          Todo
        </Chip>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", mt: 2 }}>
        {periodType === Period.MONTH && (
          <Fragment>
            <Typography>Mes </Typography>
            <Select
              label="Mes"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <MenuItem value="01">Enero</MenuItem>
              <MenuItem value="02">Febrero</MenuItem>
              <MenuItem value="03">Marzo</MenuItem>
              <MenuItem value="04">Abril</MenuItem>
              <MenuItem value="05">Mayo</MenuItem>
              <MenuItem value="06">Junio</MenuItem>
              <MenuItem value="07">Julio</MenuItem>
              <MenuItem value="08">Agosto</MenuItem>
              <MenuItem value="09">Septiembre</MenuItem>
              <MenuItem value="10">Octubre</MenuItem>
              <MenuItem value="11">Noviembre</MenuItem>
              <MenuItem value="12">Diciembre</MenuItem>
            </Select>
          </Fragment>
        )}
        {periodType !== Period.FULL && (
          <Fragment>
            <Typography>Año</Typography>
            <Select
              label="Año"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <MenuItem value="2027">2027</MenuItem>
              <MenuItem value="2026">2026</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
            </Select>
          </Fragment>
        )}
      </Box>
    </Box>
  );
}

export default PeriodFilters;
