<template>
  <div id="App">
    <div>
      <BootstrapSidebar
        id="App"
        :initial-show="initialShow"
        :links="links"
        :header="header"
        :fa="true"
        style="width: 300px"
        @sidebarChanged="onSidebarChanged"
      >
        <template v-slot:navbar>
          <b-navbar
            app
            id="mainNavbar"
            toggleable="lg"
            type="light"
            variant="light"
            fixed="top"
          >
            <b-navbar-nav>
              <b-nav-item> Navbar </b-nav-item>
            </b-navbar-nav>
          </b-navbar>
        </template>

        <template v-slot:content>
          <b-container style="margin-top: 56px">
            <router-view />
          </b-container>
        </template>
      </BootstrapSidebar>
    </div>
  </div>
</template>

<script>
import BootstrapSidebar from "vue-bootstrap-sidebar";

export default {
  components: {
    BootstrapSidebar,
  },
  data() {
    return {
      initialShow: true,
      header: "<h3>Sidebar</h3>",
      links: [
        { name: "Home", href: { name: "home" }, faIcon: ["fas", "home"] },
        {
          name: "Dropdown",
          faIcon: ["fas", "tint"],
          children: [
            {
              name: "Child Item 1",
              href: {
                name: "child-item-1",
              },
              faIcon: ["fas", "child"],
            },
            {
              name: "Child Item 2",
              href: {
                name: "child-item-2",
              },
              faIcon: ["fas", "child"],
            },
          ],
        },
        { name: "About", href: { name: "about" }, faIcon: "users" },
        { name: "Contact", href: { name: "contact" }, faIcon: "phone" },
      ],
    };
  },
  watch: {
    show(newVal) {
      console.log("Alert is now " + (newVal ? "visible" : "hidden"));
    },
  },
  methods: {
    onSidebarChanged() {},
    toggle() {
      console.log("Toggle button clicked");
      this.show = !this.show;
    },
    dismissed() {
      console.log("Alert dismissed");
    },
  },
};
</script>

<style lang="scss">
@import "node_modules/vue-bootstrap-sidebar/src/scss/default-theme.scss";
</style>