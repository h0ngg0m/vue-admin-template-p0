<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <UiChildCard title="Alert Basic">
            <Basic />
          </UiChildCard>
        </v-col>
        <v-col cols="12">
          <UiChildCard title="Alert Filled">
            <Filled />
          </UiChildCard>
        </v-col>
        <v-col cols="12">
          <UiChildCard title="Alert Closable">
            <Closable />
          </UiChildCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import UiChildCard from '@/component/shared/UiChildCard.vue'
import Basic from '@/component/ui-component/alert/BasicAlert.vue'
import Filled from '@/component/ui-component/alert/FilledAlert.vue'
import Closable from '@/component/ui-component/alert/ClosableAlert.vue'
</script>
