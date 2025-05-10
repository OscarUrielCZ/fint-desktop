import React from "react";

import { Box, List, Typography } from "@mui/material";

import ExpenseListItem from "./ExpenseListItem.tsx";

import { CategoriesMap } from "../../models/Category.dto.ts";
import { Expense } from "../../models/Expense.dto";

type ExpenseListType = {
  categories: CategoriesMap;
  items: Expense[];
  title: string;
};

function ExpenseList({ categories, items, title }: ExpenseListType) {
  return (
    <Box>
      <Typography align="center" variant="h6">
        {title}
      </Typography>
      <List>
        {items.map((item) => (
          <ExpenseListItem
            key={item.id}
            data={item}
            category={categories[item.categoryId]}
          />
        ))}
      </List>
    </Box>
  );
}

export default ExpenseList;
