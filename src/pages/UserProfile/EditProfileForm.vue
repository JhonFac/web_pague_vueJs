<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Fomulario de Usario</h4>
        <p class="category">Ingrsa los valores para crear usuario</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Nombre</label>
              <md-input v-model="Nombre"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Apellido</label>
              <md-input v-model="Apellido" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Telefono</label>
              <md-input v-model="Telefono" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Email</label>
              <md-input v-model="correo" type="text"></md-input>
            </md-field>
          </div>          
          <!-- <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Identificacion</label>
              <md-input v-model="Identificacion" type="text"></md-input>
            </md-field>
          </div> -->
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label>Fecha Naimiento</label>
            <md-field>
              <md-input v-model="Fecha_Naimiento" type="date"></md-input>
            </md-field>
          </div>
          <div  v-show="showResp" class="md-layout-item md-size-66 text-right">
            <h4 class="card-title">{{titulo1}}</h4>
            <h6 class="category text-gray">{{titulo2}}
              <div class="category text-gray" v-show="showRespError" v-html="resError"></div>
            </h6>
          </div>
          <div class="md-layout-item md-small-size-100 text-right">
            <md-button class="md-raised md-success" v-on:click=formSubmit()>Crear Usuario</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>

import {globalURL} from '../../globalURL';


export default {
  name: "edit-profile-form",
  props: {
    valortoken:null,
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      array: {},
      Nombre:'diana',
      Apellido:'garzon',
      Telefono:'123456789',
      Identificacion:'',
      Fecha_Naimiento:'2002-05-14',
      dato: '',
      resp:'',
      showResp:true,
      titulo1:'',
      resError:'',
      titulo2:'',
      correo:'nunc.sed@neque.org',
      showRespError:true
    };
  },

  methods: {
    formSubmit() {
        this.showResp=false
        this.resError=false
        this.titulo1=''
        this.titulo2=''
        this.resError=''

        if(this.valortoken==null || this.valortoken==''){
          this.titulo1='Ooops.!',
          this.titulo2='Aún no tienes un token valido'
          this.showResp=true
          return
        }


        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+this.valortoken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "nombre": this.Nombre,
          "apellido": this.Apellido,
          "telefono": this.Telefono,
          "correo": this.correo,
          "created_at": this.Fecha_Naimiento,
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(globalURL.url1+"usuario/crear", requestOptions)
          .then(response => response.text())
          .then( result => {

            if(Number.isInteger(JSON.parse(result).id)){


                this.titulo1='Enhorabuena...!'
                this.titulo2='Usuario creado con exito.!'
                this.showResp=true
              // console.log(response.status)
                this.$emit('enviarid', JSON.parse(result).id)

                console.log(result)
                console.log(JSON.parse(result))
                
            }else{

              if(JSON.parse(result).status=='400'){

                console.log(JSON.parse(result))
                console.log(JSON.parse(result).messages)
                console.log(JSON.parse(result).messages.error)
                let texto=JSON.parse(result).messages.error
                this.titulo1='Algo salio mal'
                this.resError=texto
                this.showResp=true

              }
            }
          })
          .catch(error => console.log('error', error));
      }
    }
};
</script>
<style></style>
