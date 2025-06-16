"use client";

import { useState } from "react";
import { PortfolioGrid } from "./portfolio-grid";
import { PortfolioFilters } from "./portfolio-filters";

interface PortfolioFiltersState {
  category?: string;
  technology?: string;
  status?: string;
}

export function PortfolioContainer() {
  const [filters, setFilters] = useState<PortfolioFiltersState>({});

  const handleFilterChange = (newFilters: PortfolioFiltersState) => {
    setFilters(newFilters);
  };

  return (
    <div>
      {/* Filters */}
      <PortfolioFilters onFilterChange={handleFilterChange} />

      {/* Portfolio Grid */}
      <PortfolioGrid filters={filters} />
    </div>
  );
}
