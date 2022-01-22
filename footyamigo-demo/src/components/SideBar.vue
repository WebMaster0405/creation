<template>
  <div>
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      aria-label="Sidebar with custom footer"
      no-header
      sidebar-class="footy-sidebar"
      v-bind:visible="true"
    >
      <template #default>
        <div class="p-3">
          <img src="../assets/logo.png" />
          <nav class="mb-3 mt-5">
            <b-nav vertical>
              <b-nav-item class="footy-sidebar-item"><b-icon icon="graph-up" class="mr-3"></b-icon>Dashboard</b-nav-item>
              <b-nav-item class="footy-sidebar-item" active ><b-icon icon="receipt" class="mr-3"></b-icon>Pre-Match Alerts</b-nav-item>
              <b-nav-item class="footy-sidebar-item"><b-icon icon="bar-chart-line" class="mr-3"></b-icon>In-Play Alerts</b-nav-item>
              <b-nav-item class="footy-sidebar-item"><b-icon icon="compass" class="mr-3"></b-icon>Fixtures</b-nav-item>
              <b-nav-item class="footy-sidebar-item"><b-icon icon="check-square" class="mr-3"></b-icon>Value</b-nav-item>
              <b-nav-item class="footy-sidebar-item"><b-icon icon="filter-square" class="mr-3"></b-icon>Betting Systems</b-nav-item>
              <b-nav-item class="footy-sidebar-item"><b-icon icon="bootstrap" class="mr-3"></b-icon>Bet Builder</b-nav-item>
            </b-nav>
          </nav>
        </div>
      </template>
      <template #footer>
        <div class="d-flex align-items-center px-5 py-4">
          <b-icon icon="person"></b-icon>
          <span class="mr-auto ml-auto footer-text">Daniel<br /><small>Free Account</small></span>
          <b-icon icon="chevron-right"></b-icon>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    msg: String,
  },
};
</script>