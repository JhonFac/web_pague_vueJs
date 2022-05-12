<template>
  <div class="wrapper" >
    <div class="main-panel">
      <dashboard-content></dashboard-content>
    </div>
  </div>
</template>


<script>
import DashboardContent from "./Content.vue";

export default {
  components: {
    DashboardContent,
  },
  data() {
    return {
      te:''
  };
  },
};
</script>
