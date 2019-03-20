<template>
<div id="list">

  <b-container fluid>
    <h3>Ads List</h3>
  </b-container>

  <b-container fluid>
    <b-row>
      <b-col col="10">
        <b-input-group>
          <b-form-input v-model="filter" placeholder="Type to Search" />
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>


      <b-button variant="outline-primary" @click="loadItems">Refresh List</b-button>

    </b-row>
  </b-container>

  <br>

  <b-table class="table"
  striped hover small bordered caption-top
  :filter="filter" @filtered="onFiltered"
  :current-page="currentPage" :per-page="perPage"
  :items="ads" :fields="fields"
  selectable @row-selected="rowSelected" :select-mode="selectMode" selectedVariant="success">


    <template slot="show_details" slot-scope="row">
      <b-form-checkbox @change="row.toggleDetails" v-model="row.detailsShowing">
        Details via check
      </b-form-checkbox>
    </template>
  </b-table>

  {{ selected }}

</div>
</template>



<script>
import axios from 'axios';


export default {
  name: 'AdList',


  props: {
  },


  data() {
    return {
      fields: {
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
      },

      filter: null,

      ads: [],
      errors: [],

      selectMode: 'Mode',
      selected: []
    }
  },

  
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },


  methods: {
    rowSelected(items) {
      this.selected = items;
      this.$emit("adsSelected", this.selected);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    async loadItems() {
      try {
        const response = await axios.get('http://51.77.192.7:8080/api/list/ADS?token=JLAGSDhjhasldyqgashudjHBAGSDIUYQWIEJcabTQTY6Y718265361T2GEKJlkqhao8ds76R618253879801802039180927645678039809==');
        this.ads = response.data;
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


<style scoped>
h3 {
  text-align: center;
  font-weight: bold;
}

.table {
  display: block;
  max-height: 500px;
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
</style>
