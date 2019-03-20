<template>
  <b-tabs>
    <b-tab>
      <template slot="title">
        <i class='icon-list'></i>
      </template>
      <b-list-group class="list-group-accent">
        <b-list-group-item class="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
          Today
        </b-list-group-item>
       
        <b-list-group-item href="#" class="list-group-item-accent-info">
          <div class="avatar float-right">
          </div>
          <div>Skype with <strong>Megan</strong>
          </div>
          <small class="text-muted mr-3"><i class="icon-calendar"></i>&nbsp;&nbsp;4 - 5pm</small>
          <small class="text-muted"><i class="icon-social-skype"></i>&nbsp;&nbsp;On-line</small>
        </b-list-group-item>
        <hr class="transparent mx-3 my-0">

        
        <b-list-group-item class="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
          Tomorrow
        </b-list-group-item>
        


        <b-list-group-item href="#" class="list-group-item-accent-success list-group-item-divider">
          <div><strong>#10 Startups.Garden</strong> Meetup</div>
          <small class="text-muted mr-3"><i class="icon-calendar"></i>&nbsp; 1 - 3pm</small>
          <small class="text-muted"><i class="icon-location-pin"></i>&nbsp; Palo Alto, CA</small>
        </b-list-group-item>

        
      </b-list-group>
    </b-tab>
    <b-tab>

      
      <template slot="title">
        <i class='icon-settings'></i>
      </template>
      <div class="p-3">
        <h6>Settings</h6>
        <div class="aside-options">
          <div class="clearfix mt-4">
            <small><b>Dark Theme</b></small>
            <c-switch color="success" label variant="pill" size="sm" class="float-right" checked />
          </div>
          <div>
            <small class="text-muted">Make things better</small>
          </div>
        </div>
       
        <hr>
        <h6>System Utilization</h6>
        <div class="text-uppercase mb-1 mt-4">
  
        <small><b>Server Space</b></small>
        </div>
        <b-progress height={} class="progress-xs" variant="warning" :value="30.5"></b-progress>
        <small class="text-muted">6.1GB/20GB</small>
       
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import { Switch as cSwitch } from '@coreui/vue'
export default {
  name: 'DefaultAside',
  components: {
    cSwitch
  }
}
</script>
