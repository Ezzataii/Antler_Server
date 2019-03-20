<template>
<div>
  <br>

  <b-container class="List-Split" fluid>
    <b-row>
      <b-col>
        <DeviceList ref="dList" v-on:devicesSelected="updatedDS($event)"/>
      </b-col>

      <b-col>
        <AdList ref="aList" v-on:adsSelected="updatedAS($event)"/>

        <h6>Upload an Ad:</h6>

        <form action="http://51.77.192.7:8080/api/upload/ad?token=abc&user=45" 
        method="post" enctype="multipart/form-data" target="_blank">
            Select image to upload:
            <br>
            <input type="file" name="filetoupload" id="filetoupload">
            <br>
            <input type="submit" value="Upload Image" name="submit">
        </form>

        <!-- <b-form  @submit="imageSubmit" @reset="imageReset">
          <b-form-file  v-model="select"/>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button> 
        </b-form> -->

      </b-col>
    </b-row>
  </b-container>


  <b-container fluid>
    <b-button id="deployBtn" block variant="danger" @click="deploy">Deploy</b-button>
  </b-container>

</div>
</template>

<script>
import Nav from '@/components/Nav';
import DeviceList from '@/components/DeviceList';
import AdList from '@/components/AdList';
import axios from 'axios';


export default {
  name: 'admin',
  components: {
    Nav,
    DeviceList,
    AdList
  },


  props: {
    postImageUrl: "http://51.77.192.7:8080/api/upload/ad?token=HDGSHabsdjHGASLDJABGSDKGHGBlsdghqywtegytqKJSDBBDVQGFWEGUQJLWEVQTWIT47812316T23Y8OYtio6rituyhNmnGHHFAYGSHD=="
  },

  data() {
    return {
      dSelected: [],
      aSelected: []
    }
  },

  methods: {
    imageSubmit() {

    }, 
    imageReset() {

    },
    updatedDS(dNew) {
      this.dSelected = dNew;
    },
    updatedAS(aNew) {
      this.aSelected = aNew;
    },
    async deploy() {


      var json = {
        parameters: {
          devices: this.dSelected,
          images: this.aSelected
        }
      }
 

      try {
        const response = await axios({
          method: "post",
          url: 'http://51.77.192.7:8080/api/deploy?token=JLAGSDhjhasldyqgashudjHBAGSDIUYQWIEJcabTQTY6Y718265361T2GEKJlkqhao8ds76R618253879801802039180927645678039809==',
          data: json,
          config: { headers: {'Content-Type': 'application/json' }}
        })
      } 
        catch (e) {
        this.errors.push(e);
      }

    }
  }
}
</script>

<style>
html {
  padding: 0;
  margin: 0;
  color: #dddddd;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  position: fixed;
}

#deployBtn{
  padding: 0;
  margin: 0;
  position: fixed; 
  height: 50px;

  left: 0px;
  bottom: 0px;

  font-size: 20pt;
}
</style>
