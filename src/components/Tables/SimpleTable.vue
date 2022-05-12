<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item md-size-25">
        <md-field>
          <label>Ingresa el id del registo a buscar</label>
          <div class="md-layout-item md-size-66">
            <md-input v-model="ElemenId" type="text"></md-input>
          </div>
        </md-field>
      </div>
      <div class="md-layout-item md-size-25">
        <h4 class="card-title">{{titulo1}}</h4>
        <h6 class="category text-gray">{{titulo2}}
          <div class="category text-gray" v-show="showRespError" v-html="resError"></div>
        </h6>
      </div>
      <img v-show="img" style="width: 15%; height: 15%;" v-bind:src="require('../../assets/img/loading-23.gif')" alt="">
      <div class="md-layout-item md-small-size-100 text-right">
        <md-button class="md-raised md-success" v-on:click=formSubmit()>Consultar</md-button>
      </div>
    </div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nombre">{{ item.nombre }}</md-table-cell>
        <md-table-cell md-label="Aprellido">{{ item.apellido }}</md-table-cell>
        <md-table-cell md-label="Telefono">{{ item.telefono }}</md-table-cell>
        <!-- <md-table-cell md-label="Identificacion">{{ item.identificacion }}</md-table-cell> -->
        <md-table-cell md-label="Correo">{{ item.correo }}</md-table-cell>
        <md-table-cell md-label="Correo">{{ item.created_at }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    idtable:null,
    tabletoken:null,
    tableHeaderColor: {
      default: "",
    },
  },
  data() {
    return {
      array:{},
      selected: [],
      users: [],
      ElemenId:'',
      img:false,
      divmsg:false,
      titulo1:'',
      titulo2:''
    };
  },



  methods: {

    formSubmit() {
        this.img=true
        this.divmsg=false
        this.titulo1=''
        this.titulo2=''

        console.log(this.idtable);
        if(this.idtable!=''){ this.ElemenId=this.idtable }

        let addurl=''
        let petMethod=''
        this.users=''

        if(this.tabletoken==null || this.tabletoken==''){
          this.titulo1='Ooops.!',
          this.titulo2='Aún no tienes un token valido'
          this.divmsg=true
          this.img=false
          return
        }

        console.log('sii');
        console.log(this.$Token)
        this.resp=this.$Token

        console.log(this.ElemenId);

        if (this.ElemenId==''){
          addurl='usuarios/'
          petMethod='POST'
          console.log('id vacio');
        }
        else{
          console.log('id lleno');
          addurl='usuario/'+this.ElemenId
          petMethod='GET'
        }

        console.log(addurl);
        console.log(petMethod);
        console.log(petMethod);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+this.tabletoken);
        var requestOptions = {
          method: petMethod,
          headers: myHeaders,
          redirect: 'follow'
        };

        console.log(addurl);
        console.log(petMethod);

        fetch("http://localhost:8080/api/"+addurl, requestOptions)
          .then(response => response.text())
          .then( result => {
          setTimeout(() => this.img = false, 500);
          console.log(result);

          if (this.ElemenId==''){
            this.users= JSON.parse(result)
          }else{
            this.ElemenId=''


            if([JSON.parse(result)]['0'].error=='400'){
              console.log([JSON.parse(result)]['0'].error);
              console.log([JSON.parse(result)]['0'].messages.error);

              this.titulo1='Ooops.!',
              this.titulo2=[JSON.parse(result)]['0'].messages.error
              this.divmsg=true
            }else{
            this.users= [JSON.parse(result)]

            }
          }

          })
          .catch(error => console.log('error', error));
      }
    }


};
</script>
