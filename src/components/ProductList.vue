<template>
  <div>
    <h2>Liste des Produits</h2>
    <table>
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
          <td>{{ product.Price | currency }}</td>
          <td>{{ product.SalesCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name:"ProductsList" ,
  props: {
    productsWithSales: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Tu peux ajouter ton CSS ici si nécessaire */
</style>

