<script setup>
import axios from 'axios'
import { onMounted, ref, watchEffect } from 'vue'

import OfferCard from '../components/OfferCard.vue'
import TimetoSell from '@/components/TimetoSell.vue'
import Filters from '../components/Filters.vue'
import Pagination from '../components/Pagination.vue'

const props = defineProps(['page', 'title', 'sort', 'pricemax', 'pricemin'])

const offersList = ref({})

onMounted(async () => {
  watchEffect(async () => {
    try {
      let pricefilters = ''
      if (props.pricemax) {
        pricefilters += `&filters[price][$lte]=${props.pricemax}`
      }
      if (props.pricemin) {
        pricefilters += `&filters[price][$gte]=${props.pricemin}`
      }
      const { data } = await axios.get(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar&filters[title][$containsi]=${props.title}${pricefilters}&pagination[page]=${props.page}&pagination[pageSize]=10&sort=${props.sort}`
      )
      offersList.value = data
    } catch (error) {
      console.log(error)
    }
  })
})
</script>

<template>
  <main>
    <div class="container">
      <p v-if="!offersList.data" class="loader">Chargement en cours ...</p>

      <div v-else>
        <Filters :sort="sort" :pricemax="pricemax" :pricemin="pricemin" />

        <p class="topLine">
          Des millions de petites annonces et autant d'occasions de se faire plaisir
        </p>

        <TimetoSell />

        <div class="offersBloc">
          <OfferCard
            v-for="offer in offersList.data"
            :key="offer.id"
            :offerInfos="offer.attributes"
            :id="offer.id"
          />
        </div>

        <Pagination :pagination="offersList.meta.pagination" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  padding-bottom: 40px;
}
.loader {
  font-size: 32px;
  font-weight: bold;
}
.topLine {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin: 30px 0;
}
.offersBloc {
  display: flex;
  flex-wrap: wrap;
  gap: 40px 15px;
}
</style>