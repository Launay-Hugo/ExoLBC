<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'


const props = defineProps({
  offerInfos: {
    type: Object,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})

const formatPrice = (price) => {
  if (price >= 1000) {
    const priceStr = price.toString()

    let newPrice = []

    for (let i = priceStr.length - 1; i >= 0; i--) {
      if (i === priceStr.length - 4 || i === priceStr.length - 7) {
        newPrice.push(priceStr[i] + ' ')
      } else {
        newPrice.push(priceStr[i])
      }
    }
    return newPrice.reverse().join('')
  } else {
    return price
  }
}

const formatDate = computed(() => {
  return props.offerInfos.updatedAt.split('T')[0].split('-').reverse().join('/')
})

const formatedPrice = computed(() => {
  const price = props.offerInfos.price

  return formatPrice(price)
})
</script>

<template>
  <RouterLink :to="{ name: 'offer', params: { id: id } }" class="offerCard">
    <div class="firstPart">
      <div class="owner">
        <img
          :src="offerInfos.owner.data.attributes.avatar.data.attributes.url"
          alt=""
          v-if="offerInfos.owner.data.attributes.avatar.data"
        />
        <p>{{ offerInfos.owner.data.attributes.username }}</p>
      </div>

      <img
        :src="offerInfos.pictures.data[0].attributes.url"
        :alt="offerInfos.title"
        v-if="offerInfos.pictures.data"
      />

      <p>{{ offerInfos.title }}</p>

      <p>{{ formatedPrice }} €</p>
    </div>

    <div class="secondPart">
      <div>
        <p>{{ formatDate }}</p>
      </div>

      <font-awesome-icon :icon="['far', 'heart']" />
    </div>
  </RouterLink>
</template>

<style scoped>
.offerCard {
  height: 380px;
  width: calc((100% - 60px) / 5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
img {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  object-fit: cover;
}

.firstPart > img {
  height: 240px;
  width: 100%;
  border-radius: 10px;
  margin: 7px 0 5px 0;
}
.firstPart p {
  font-weight: bold;
  line-height: 20px;
}
.firstPart p:last-child {
  margin-top: 5px;
}
.owner {
  display: flex;
  align-items: center;
  gap: 5px;
}
.owner p {
  font-size: 14px;
}

.secondPart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.secondPart p {
  color: var(--grey);
  font-size: 12px;
  line-height: 16px;
}
svg {
  font-size: 20px;
  color: var(--grey);
}
</style>