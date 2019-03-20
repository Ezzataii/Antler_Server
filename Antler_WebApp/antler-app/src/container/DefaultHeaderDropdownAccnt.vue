<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
     {{ userName }}
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
        <b-dropdown-item><i class="fa fa-user" /> Profile</b-dropdown-item>
        
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      
      <b-dropdown-item><i class="fa fa-wrench" /> Settings</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-usd" /> Payments
        <b-badge variant="secondary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>

      <b-dropdown-divider />
      <b-dropdown-item><i class="fa fa-lock" /> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  props: {
    userName: { 
      type: String,
      required: true
    }
  },
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 }
  }
}
</script>
