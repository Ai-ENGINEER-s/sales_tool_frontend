// services/dashboardService.js

import { ref } from "vue";
import { Chart } from "chart.js";

// Références réactives pour les données
export const totalSales = ref(0);
export const trendingProducts = ref([]);
export const categorySales = ref([]);
export const productsWithSales = ref([]);
export const noSalesMessage = ref(false);

let categoryChart = null;
let productSalesChart = null;

export const calculateDates = (selectedPeriod) => {
  const endDate = new Date();
  let startDate;

  switch (selectedPeriod) {
    case "7":
      startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "30":
      startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "365":
      startDate = new Date(
        endDate.getFullYear() - 1,
        endDate.getMonth(),
        endDate.getDate()
      );
      break;
    default:
      startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
};

export const fetchData = async (startDate, endDate) => {
  try {
    const [totalSalesRes, trendingProductsRes, categorySalesRes, productsRes] =
      await Promise.all([
        fetch(
          `https://sales-tool-backend-1.onrender.com/total-sales?startDate=${startDate}&endDate=${endDate}`
        ),
        fetch(
          `https://sales-tool-backend-1.onrender.com/trending-products?startDate=${startDate}&endDate=${endDate}`
        ),
        fetch(
          `https://sales-tool-backend-1.onrender.com/category-sales?startDate=${startDate}&endDate=${endDate}`
        ),
        fetch("https://sales-tool-backend-1.onrender.com/products-with-sales"),
      ]);

    totalSales.value = (await totalSalesRes.json()).totalSales;
    trendingProducts.value = await trendingProductsRes.json();
    categorySales.value = await categorySalesRes.json();
    productsWithSales.value = await productsRes.json();

    noSalesMessage.value = totalSales.value === 0;

    renderCategorySalesChart();
    renderProductSalesChart();
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};

const renderCategorySalesChart = () => {
  const ctx = document.getElementById("category-sales-chart").getContext("2d");
  if (categoryChart) categoryChart.destroy();

  categoryChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: categorySales.value.map((category) => category.Category),
      datasets: [
        {
          data: categorySales.value.map((category) =>
            parseFloat(category.Percentage)
          ),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    },
    options: { responsive: true },
  });
};

const renderProductSalesChart = () => {
  const ctx = document.getElementById("product-sales-chart").getContext("2d");
  if (productSalesChart) productSalesChart.destroy();

  productSalesChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: productsWithSales.value.map((product) => product.ProductName),
      datasets: [
        {
          label: "Ventes Totales par Produit",
          data: productsWithSales.value.map((product) => product.SalesCount),
          backgroundColor: "#42A5F5",
          borderColor: "#1E88E5",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } },
    },
  });
};
