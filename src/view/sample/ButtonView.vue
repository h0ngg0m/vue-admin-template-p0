<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" sm="12">
          <UiChildCard title="Default">
            <BaseButtons />
          </UiChildCard>
        </v-col>
        <v-col cols="12" lg="6">
          <UiChildCard title="Colors">
            <ColorsButtons />
          </UiChildCard>
        </v-col>
        <v-col cols="12" lg="6">
          <UiChildCard title="Outlined">
            <OutlinedButtons />
          </UiChildCard>
        </v-col>
        <v-col cols="12" lg="12">
          <UiChildCard title="Size">
            <SizeButtons />
          </UiChildCard>
        </v-col>
        <v-col cols="12" lg="6">
          <UiChildCard title="Text Color">
            <TextButtons />
          </UiChildCard>
        </v-col>
        <v-col cols="12" lg="6">
          <UiChildCard title="Icon Size">
            <IconColorSizes />
          </UiChildCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import UiChildCard from '@/component/shared/UiChildCard.vue'
import BaseButtons from '@/component/ui-component/button/BaseButton.vue'
import ColorsButtons from '@/component/ui-component/button/ColorsButton.vue'
import OutlinedButtons from '@/component/ui-component/button/OutlinedButton.vue'
import SizeButtons from '@/component/ui-component/button/SizeButton.vue'
import TextButtons from '@/component/ui-component/button/TextButton.vue'
import IconColorSizes from '@/component/ui-component/button/IconColorSize.vue'
</script>
