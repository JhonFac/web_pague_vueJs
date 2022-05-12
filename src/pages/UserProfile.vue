<template>
  <div class="content">
    <div class="md-layout">
      <!-- <div class="md-layout-item md-small-size-100 md-size-100">
        <md-field>
          <label>{{variabletoken}}</label>
          <md-input v-model="texto" required type="text"></md-input>
        </md-field>
      <md-button class="md-round md-success" v-on:click=formSubmit() >enviar</md-button>
      </div> -->
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form :valortoken='Ptoken'  @enviarid="enviarid"  data-background-color="green"> </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card :valorrecibido="dato" @escuchar="token" > </user-card>
      </div>
      
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Tabla de Usuarios</h4>
            <p class="category">Podras ver uno o todos los registros en la tabla</p>
          </md-card-header>
          <md-card-content>
            <simple-table :tabletoken="tableToken" :idtable="idtable"  ref="list" table-header-color="green"></simple-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { EditProfileForm, UserCard } from "@/pages";
import { SimpleTable } from "@/components";

export default {
  components: {
    EditProfileForm,
    UserCard,
    SimpleTable,
  },

   data() {
        return {
          texto:'',
          dato:'',
          variabletoken:'',
          Ptoken:'',
          tableToken:'',
          idtable:''
        };
    },
  mounted(){
  // invocar los métodos
  this.geturl();
  },
  methods: {
    // formSubmit() {
    //   this.dato=this.texto
    //   this.Ptoken=this.texto
    // },

    token(value){
      this.variabletoken=value
      this.Ptoken=value
      this.tableToken=value
    },
    enviarid(value){
      console.log('este es el numero '+value);
      this.idtable=value
      setTimeout(() => this.$refs.list.formSubmit() , 1000);
    },
    geturl() {
      let url= window.location.hash
      let token = url.split("token=");
      this.variabletoken=token[1]
      this.Ptoken=token[1]
      this.tableToken=token[1]
    }
  }
};
</script>
