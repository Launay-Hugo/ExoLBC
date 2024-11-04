<script setup>
import { ref , inject} from 'vue';
import { RouterLink , useRouter} from 'vue-router';
import axios from 'axios';


const username = ref ('')
const email = ref('')
const password = ref ('')
const errorMessage = ref('')
const submiting = ref(false)
const displayPassword = ref(false)

const GlobalStore = inject('GlobalStore')
console.log(GlobalStore);

const router = useRouter()

const handleSubmit=async()=>{
    console.log({
        username: username.value,
        email: email.value,
        password: password.value
    
    })
    if (username.value && email.value && password.value ) {
       submiting.value = true
    try { 
        const {data} = await axios.post("https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local/register",
        {
        username: username.value,
        email: email.value,
        password: password.value

    }) 
    console.log(data);
    GlobalStore.changeUserInfos({username: data.user.username, token: data.jwt})
   
   router.push({name:'home'})
}
    catch (error) {
        console.log(error);
        errorMessage.value = 'Un problème est survenu , veuillez essayez à nouveau'
        
    }
    submiting.value= false
} else {
    errorMessage.value = "Veuillez remplir tous les champs"
}
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
     <label for="username">Name *</label>
     <input type="text" name="username" id="username" v-model="username" @input="errorMessage=''">
     <label for="email">E-mail *</label>
     <input type="email" name="email" id="email" v-model="email" @input="errorMessage=''">
     <label for="password">Mot de passe *</label>
     <div class="passwordInput">
     <input :type="displayPassword? 'text': 'password'" name="password" id="password" v-model="password" @input="errorMessage=''">
    <div>
        <font-awesome-icon :icon="['far', 'eye-slash']" v-if="!displayPassword" @click="displayPassword=!displayPassword"/>
        <font-awesome-icon :icon="['far', 'eye']" v-else @click="displayPassword=!displayPassword" />
    </div>
    </div>
     <p v-if="submiting">inscription en cours...</p>
     <button v-else>S'inscrire <font-awesome-icon :icon="['fas', 'arrow-right']" /></button>
     <p v-if="errorMessage" class="textError">{{ errorMessage }}</p>
<p>Vous avez déjà un compte ? <RouterLink :to="{name:'login'}"> Connectez-vous </RouterLink></p>
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
    border: 1px solid black;
    height: 45px;
    border-radius: 15px;
    padding-left: 10px;
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