<script setup>
import { RouterLink, useRouter}  from 'vue-router';
import {  ref , inject} from 'vue';
import axios from 'axios';

const email = ref ('')
const password = ref ('')
const errorMessage = ref ('')
const submiting = ref (false)

const GlobalStore = inject ('GlobalStore')

const displayPassword = ref (false)

const router = useRouter()

const handleSubmit= async ()=>{
    console.log({
        identifier:email.value,
        password:password.value,
    });
    if (email.value&&password.value){
        submiting.value=true
    try {
        const {data}=await axios.post("https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local",
            {identifier:email.value,
             password:password.value});
            
        console.log(data);
       GlobalStore.changeUserInfos({username: data.user.username, token: data.jwt})

                $cookies.set('userInfos',{username: data.user.username, token: data.jwt})

       router.push({name: 'home'})
        
    } catch (error) {
        console.log(error);
       errorMessage .value = 'Un probleme est survenue'
        
    }
    submiting.value=false
} else { errorMessage.value = "Veuillez remplir tous les champs"}
}



</script>
<template>
<main>
<div class="container">
    <form @submit.prevent="handleSubmit">
        <div>
        <h1>Bonjour !</h1>
        <h2>Connectez-vous pour découvrir toutes nos fonctionnalités.</h2>
        </div>
        <label for="email">E-mail *</label>
        <input type="email" name="email" id="email" v-model="email" @input="errorMessage=''">
        <label for="password">Mot de passe *</label>
        <div class="passwordInput">
        <input :type="displayPassword?'text':'password'"
         name="password" id="password" v-model="password" 
        @input="errorMessage=''">
        <div>
        <font-awesome-icon :icon="['far', 'eye-slash']" v-if="!displayPassword" @click="displayPassword=!displayPassword"/>
        <font-awesome-icon :icon="['far', 'eye']" v-else @click="displayPassword=!displayPassword" />
        </div>
        </div>
        <p v-if="submiting">Connexion en cours...</p>
        <button v-else>Se connecter <font-awesome-icon :icon="['fas', 'arrow-right']" /></button>
        <p v-if="errorMessage" class="textError">{{ errorMessage }}</p>
<p>Envie de nous rejoindre ? <RouterLink :to="{name:'signup'}"> Créer un compte</RouterLink></p>
    </form>
</div>
</main>
</template>
<style scoped>
main {
  background-image: url('../assets/illustration.png');
  background-size: contain;
  background-position: bottom;
  background-repeat: no-repeat;
  display: flex;
    justify-content: center;
    align-items: center;
}
form{
   /* border: 1px solid black; */
   height: 490px;
   width: 480px;
   padding: 30px 24px;
   background-color: white;
   display: flex;
   flex-direction: column;
   justify-content: space-between ;
   box-shadow: 0 0 7px var(--grey);
   border-radius: 15px;
}
label{
    display: flex;
    flex-direction: column;
    
}
input{
    height: 45px;
    border-radius: 15px;
    padding-left: 10px;
    border: 1px solid black;
}
.passwordInput{
    border: 1px solid black;
    display: flex;
    border-radius: 15px;
}
.passwordInput > div{
    display: flex;
    justify-content: center;
   align-items: center;
    width: 40px;
    border-left: 1px solid black;
    padding-right: 10px;
}
.passwordInput > input{
    flex:1;
    border: none;
}
input:focus{
    outline: none;
}
button{
    background-color: var(--orange);
    color: white;
    font-size: 13px;
    border-radius: 15px;
    border: none;
    height: 45px;
    font-weight: bold;
}
h1{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
}
p:last-child{
    text-align: center;
}
a {
    font-weight: bold;
    text-decoration: underline;
}
svg{margin-left: 10px;}

.textError{
    text-align: center;
    color: var(--orange);
}
</style>
