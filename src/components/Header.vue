<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BtnPublishOffer from './BtnPublish.vue'
import { inject, ref } from 'vue';

const route = useRoute()
const router = useRouter()

const search = ref('')

const GlobalStore = inject('GlobalStore')
console.log(GlobalStore.userToken);

const disconnnectUser = ()=>{
  GlobalStore.changeUserInfos(null)
  $cookies.remove('userInfo')
}

const handleSearch =()=>{
console.log(search.value, route.query);
const queries={...route.query}

if (search.value) {
  queries.title= search.value
  
} else {
  delete queries.title
}
router.push({name:'home', query:queries})

queries.page= 1

}

const changeValue =(event)=>{
if(event.target.value ===''){
  const queries={...route.query}
  delete queries.title
  router.push({name:'home', query:queries})
}
}

</script>

<template>
  <header>
    <div class="container">
      <div class="topBloc">
        <RouterLink :to="{ name: 'home' }">
          <img src="../assets/img/logo.svg" alt="" />
        </RouterLink>

        <div class="middlePart">
          <BtnPublishOffer />

          <form @click.prevent="handleSearch">
            <input type="text" name="search" id="search" placeholder="Rechercher sur leboncoin" 
            v-model="search" @input="changeValue"/>
            <button>
            <font-awesome-icon :icon="['fas', 'search']" />
            </button>
          </form>
        </div>
      <div>
          <RouterLink :to="{name: 'login'}" v-if="!GlobalStore.userInfos.value">
          <font-awesome-icon :icon="['far', 'user']" />
          <p>Se connecter</p>
          </RouterLink >
          <div v-else class="disconnect">
            <div>
         <RouterLink :to="{name:'profile'}">
            <font-awesome-icon :icon="['far', 'user']" />
            <p>{{GlobalStore.userInfos.value.username}}</p>
          </RouterLink>
            </div>
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" @click="disconnnectUser"/>
          </div>
        </div>
      </div>
      <div class="bottomBloc">
        <span>Immobilier</span>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <span>Véhicules</span>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <span>Locations de vacances</span>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <span>Emploi</span>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <span>Mode</span>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <span>Maison & Jardin</span>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <span>Famille</span>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <span>Electronique</span>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <span>Loisirs</span>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <span>Autres</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  border-bottom: 1px solid var(--grey);
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 5;
  height: var(--header-height);
}

.container {
  padding: 10px 0 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
img {
  width: 140px;
}

.disconnect {
  display: flex;
  gap: 20px;
  align-items: center;
}
.disconnect>div{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.topBloc {
  display: flex;
  justify-content: space-between;
}
.topBloc > :last-child a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}
.topBloc p {
  font-size: 12px;
}
.middlePart {
  display: flex;
  align-items: center;
  gap: 20px;
}
.middlePart > form {
  display: flex;
  background-color: var(--grey-light);
  padding: 7px;
  border-radius: 10px;
  width: 300px;
}
.middlePart input {
  background-color: inherit;
  border: none;
  flex: 1;
}
.middlePart > form button{
  background-color: transparent ;
  border: none;
  cursor: pointer;
}
.middlePart svg {
  background-color: var(--orange);
  padding: 8px;
  box-sizing: content-box;
  border-radius: 7px;
}
.middlePart input::placeholder {
  color: var(--black);
  font-size: 16px;
}

.bottomBloc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.bottomBloc svg {
  color: var(--black);
  font-size: 2px;
}
</style>