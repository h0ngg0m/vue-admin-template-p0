<template>
  <v-row>
    <v-col cols="12" sm="12" lg="8">
      <ProfitExpanse />
    </v-col>
    <v-col cols="12" sm="12" lg="4">
      <div class="mb-6">
        <TrafficDistribution />
      </div>
      <div>
        <ProductSales />
      </div>
    </v-col>
    <v-col cols="12" sm="12" lg="4">
      <UpcommingSchedule />
    </v-col>
    <v-col cols="12" sm="12" lg="8">
      <TopPayingClients />
    </v-col>
    <v-col cols="12" sm="12" lg="12">
      <ProductCards />
    </v-col>
    <v-col class="text-center mt-2">
      <p class="text-muted">
        Design and Developed by
        <a href="https://www.wrappixel.com/" target="_blank" class="pl-1 text-primary"
          >wrappixel.com</a
        >
      </p>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import ProfitExpanse from '@/component/dashboard/ProfitExpense.vue'
import TrafficDistribution from '@/component/dashboard/TrafficDistribution.vue'
import ProductSales from '@/component/dashboard/ProductSales.vue'
import UpcommingSchedule from '@/component/dashboard/UpcommingSchedule.vue'
import TopPayingClients from '@/component/dashboard/TopPayingClients.vue'
import ProductCards from '@/component/dashboard/ProductCard.vue'
</script>
