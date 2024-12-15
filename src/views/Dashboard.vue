<template>
  <div id="app">
    <h1 class="title">Outil Simplifié d'Analyse des Paniers d'Achat</h1>
    <div class="selected-date">
      <p>
        <strong>Ventes réalisées au cours de la période:</strong>
        {{ startDate && endDate ? `${startDate} au ${endDate}` : "Aucune période sélectionnée" }}
      </p>
    </div>
    <!-- Filtrage par période -->
    <div class="filters">
      <label for="time-period">Période :</label>
      <select id="time-period" :value="selectedPeriod" @change="updatePeriod($event)" class="select-period">
        <option value="365">12 derniers mois</option>
        <option value="30">30 derniers jours</option>
        <option value="7">7 derniers jours</option>
      </select>

      <div class="date-filters">
        <label for="start-date">Date de début :</label>
        <input type="date" v-model="startDate" class="date-input" />

        <label for="end-date">Date de fin :</label>
        <input type="date" v-model="endDate" class="date-input" />

        <button @click="applyCustomDateRange" class="apply-button">Appliquer</button>
      </div>
    </div>

    <!-- Affichage de la période sélectionnée -->
   

    <!-- Statistiques principales -->
    <div class="stats">
      <h2>Statistiques Principales</h2>
      <div v-if="isLoading" class="loading-icon"></div>
      <div v-else>
        <p><strong>Ventes Totales :</strong> €{{ totalSales }}</p>
      </div>
    </div>

    <!-- Graphiques des ventes par catégorie et histogramme des ventes par produit -->
    <div class="charts">
      <h2>Répartition des Ventes par Catégorie <p>(%)</p></h2>
      <div v-if="isLoading" class="loading-icon"></div>
      <canvas v-else id="category-sales-chart" width="300" height="200"></canvas>

      <h2>Ventes par Produit</h2>
      <div v-if="isLoading" class="loading-icon"></div>
      <canvas v-else id="product-sales-chart" width="400" height="300"></canvas>
    </div>

    <!-- Top 5 des Produits -->
    <h2 class="top-products-title">Top 5 des Produits les Plus Vendus</h2>
    <div v-if="isLoading" class="loading-icon"></div>
    <table v-else class="top-products-table">
      <thead>
        <tr>
          <th>Produit</th>
          <th>Quantité Vendue</th>
          <th>Ventes Totales</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in trendingProducts" :key="product._id">
          <td>{{ product.ProductName }}</td>
          <td>{{ product.QuantitySold }}</td>
          <td>€{{ product.TotalSales }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Tableaux -->
    <div class="tables">
      <TrendingProducts v-if="!isLoading" />

      <h2>Liste des Produits</h2>
      <div v-if="isLoading" class="loading-icon"></div>
      <table v-else>
        <thead>
          <tr>
            <th>Nom du Produit</th>
            <th>Prix</th>
            <th>Ventes Totales</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in productsWithSales" :key="product.ProductID">
            <td>{{ product.ProductName }}</td>
            <td>€{{ product.Price }}</td>
            <td>{{ product.SalesCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

import {
  totalSales,
  trendingProducts,
  categorySales,
  productsWithSales,
  noSalesMessage,
  calculateDates,
  fetchData,
} from '@/services/salesDataService';

import '@/assets/styles/dashboard.css';

export default {
  setup() {
    const selectedPeriod = ref('365');
    const startDate = ref('');
    const endDate = ref('');
    const isLoading = ref(false); // État de chargement

    const updatePeriod = async (event) => {
      selectedPeriod.value = event.target.value;
      const { startDate: newStartDate, endDate: newEndDate } = calculateDates(selectedPeriod.value);
      startDate.value = newStartDate;
      endDate.value = newEndDate;
      await fetchDataWithLoading(newStartDate, newEndDate);
      renderCharts();
    };

    const applyCustomDateRange = async () => {
      if (startDate.value && endDate.value) {
        await fetchDataWithLoading(startDate.value, endDate.value);
        renderCharts();
      }
    };

    const fetchDataWithLoading = async (start, end) => {
      isLoading.value = true;
      await fetchData(start, end);
      isLoading.value = false;
    };



 const renderCharts = () => {
  if (categorySales.value.length > 0) {
    
    new Chart(document.getElementById('category-sales-chart'), {
      type: 'pie',
      data: {
        labels: categorySales.value.map((sale) => sale.Category),
        datasets: [
          {
            data: categorySales.value.map((sale) => sale.Percentage),
            backgroundColor: ['#005CA9', '#1E9C67', '#F79824', '#C03221'],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 23, // Augmente la taille de la police des légendes
              },
            },
          },
        },
     
      },
    });
  }

  if (productsWithSales.value.length > 0) {
    new Chart(document.getElementById('product-sales-chart'), {
      type: 'bar',
      data: {
        labels: productsWithSales.value.map((product) => product.ProductName),
        datasets: [
          {
            label: 'Ventes',
            data: productsWithSales.value.map((product) => product.SalesCount),
            backgroundColor: '#007bff',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 25, // Augmente la taille de la police des légendes
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 14, // Taille de police des labels de l'axe X
              },
            },
          },
          y: {
            ticks: {
              font: {
                size: 20, // Taille de police des labels de l'axe Y
              },
            },
          },
        },
      },
    });
  }
};

    onMounted(async () => {
      const { startDate: initStartDate, endDate: initEndDate } = calculateDates(selectedPeriod.value);
      startDate.value = initStartDate;
      endDate.value = initEndDate;
      await fetchDataWithLoading(initStartDate, initEndDate);
      renderCharts();
    });

    return {
      totalSales,
      trendingProducts,
      categorySales,
      productsWithSales,
      noSalesMessage,
      selectedPeriod,
      startDate,
      endDate,
      updatePeriod,
      applyCustomDateRange,
      isLoading,
    };
  },
};
</script>

<style src="../assets/styles/dashboard.css" scoped>

</style>
