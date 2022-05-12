<template>
  <md-card class="md-card-profile">
    <md-card-content>
      <h4 class="card-title">Login</h4>
      <h6 class="category text-gray">Slicitar Token</h6>
        <form @submit="formSubmit">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>User Name</label>
              <md-input v-model="userName" required type="text"></md-input>
            </md-field>
          </div>
          
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Password</label>
              <md-input v-model="password" required type="text"></md-input>
            </md-field>
          </div>
          <md-button class="md-round md-success" v-on:click=formSubmit() >Genarar Token</md-button>
        </form>
          <div v-show="showToken" class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Token</label>
              <md-input v-model="token" type="text"></md-input>
            </md-field>
          </div>
          <div v-show="showError" class="md-layout-item md-small-size-100 md-size-100">
            <h4 class="card-title">Ooops..!</h4>
            <h6 class="category text-gray">{{emgs}}</h6>
            
        <div>{{ globaltoken }}</div>
          </div>
    </md-card-content>
  </md-card>
</template>
<script>

import {globalURL} from '../../globalURL';

export default {
  name: "user-card",
  props: {
    valorrecibido:null,
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.jpg"),
    },
  },

   data() {
        return {
          globaltoken: globalURL.token,
          userName: 'jhon',
          password: '123',
          description: '',
          token:'',
          emsg:'',
          showToken: false,
          showError: false
        };
    },

    methods: {

      formSubmit() {
        this.emgs=''
        this.showToken= false
        this.showError= false

       var formdata = new FormData();
        formdata.append("username", this.userName);
        formdata.append("password", this.password);
        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        fetch(globalURL.url2+"login", requestOptions)
        .then(response => response.json()
        )
        .then(data => {
          console.log(data);
          console.log(data.code);
          if(data.code=='500'){
            this.emgs='Tenemos un Error en el servidor'
            this.showError=true
            return
          }

          if (data.token=='credenciales') {
            this.emgs='No existe Usuario'
            this.showError=true
            return
          }
          if (data.token=='credenciales vacias') {
            this.emgs='Credenciales Vacias'
            this.showError=true
            return
          }

            this.token = data.token // input
            this.$emit('escuchar', data.token)

            this.showToken = true
            window.location.href = "http://localhost:8082/#/user?token="+data.token
        })
        .catch(function (error) {
          this.emgs = error;
          this.showError=true
        });



        }
      }

};
</script>
<style></style>
