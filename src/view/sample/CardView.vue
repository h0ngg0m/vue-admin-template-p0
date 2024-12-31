<template>
  <v-row>
    <v-col cols="12" sm="12" lg="6">
      <UiChildCard title="With Props">
        <CardsProps />
      </UiChildCard>
    </v-col>
    <v-col cols="12" sm="12" lg="6">
      <UiChildCard title="With Slots">
        <CardsSlots />
      </UiChildCard>
    </v-col>
    <v-col cols="12" sm="12" lg="6" class="d-flex align-items-stretch">
      <UiChildCard title="Content Wrap">
        <CardsContentWrap />
      </UiChildCard>
    </v-col>

    <v-col cols="12" sm="12" lg="6" class="d-flex align-items-stretch">
      <UiChildCard title="Card Media">
        <CardsMedia />
      </UiChildCard>
    </v-col>

    <v-col cols="12" sm="12" lg="6" class="d-flex align-items-stretch">
      <UiChildCard title="Weather Card">
        <CardsWeather />
      </UiChildCard>
    </v-col>

    <v-col cols="12" sm="12" lg="6">
      <UiChildCard title="Twitter Card">
        <CardsTwitter />
      </UiChildCard>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import UiChildCard from '@/component/shared/UiChildCard.vue'
import CardsProps from '@/component/ui-component/card/CardsProp.vue'
import CardsSlots from '@/component/ui-component/card/CardsSlot.vue'
import CardsContentWrap from '@/component/ui-component/card/CardsContentWrap.vue'
import CardsMedia from '@/component/ui-component/card/CardsMedia.vue'
import CardsWeather from '@/component/ui-component/card/CardsWeather.vue'
import CardsTwitter from '@/component/ui-component/card/CardsTwitter.vue'
</script>
