<template>
  <div class="animated fadeIn">
    <!-- :table-data vs :data -->
    <b-row>
      <b-col lg="6" sm="12">
        <c-table :table-data="deviceArray" :per-page=10 hover striped bordered small fixed caption="Displays"></c-table>
      </b-col>

      <b-col lg="6" sm="12">
        <c-table :table-data="adArray" :per-page=10 hover striped bordered small fixed caption="Ads"></c-table>
      </b-col>
    </b-row> 
  </div>

</template>

<script>
import axios from 'axios';
//import { shuffleArray } from '@/shared/utils'

//you can do _rowVariant: 'danger'
//_cellVariants: {status: 'danger'}
//_cellVariants: {status: 'danger', username: 'danger', registered: 'danger', role: 'danger'}
import cTable from './Table.vue'



export default {
  name: 'Routing',
  components: {cTable},
  props: {
    adArray: {
      type: [],
      default: [],
      required: true
    },
    deviceArray: {
      type: [],
      default: [],
      required: true
    }
  },

  data: () => {
    return {
      devicefields: {
        id: {
          label: 'Device ID',
          sortable: true
        },
        deviceName: {
          label: 'Device Name',
          sortable: true
        },
        hostName: {
          label: 'Host',
          sortable: true
        },
        site: {
          label: 'Site',
          sortable: true
        },
        auth: {
          label: 'Authentication Status',
          sortable: true
        }
      }, 
      Adfields: {
        id: {
          label: 'Ad ID',
          sortable: true
        },
        name: {
          label: 'Ad Name',
          sortable: true
        },
        user: {
          label: 'Ad Company',
          sortable: true
        }
      }
    }
  },



  methods: {
      async loadItems() {
      try {
        const response = await axios.get('http://51.77.192.7:8080/api/list/DEVICE?token=JLAGSDhjhasldyqgashudjHBAGSDIUYQWIEJcabTQTY6Y718265361T2GEKJlkqhao8ds76R618253879801802039180927645678039809==');
        this.deviceArray = response.data;
      } catch (e) {
        this.errors.push(e);
      }

      try {
        const response = await axios.get('http://51.77.192.7:8080/api/list/ADS?token=JLAGSDhjhasldyqgashudjHBAGSDIUYQWIEJcabTQTY6Y718265361T2GEKJlkqhao8ds76R618253879801802039180927645678039809==');
        this.adArray = response.data;
        console.log(typeof(adArray));
      } catch (e) {
        this.errors.push(e);
      }

    }
  },

  async created() {
    this.loadItems();
  }
}
</script>
