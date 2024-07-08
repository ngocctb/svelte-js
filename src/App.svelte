<script lang="ts">
 import { Router, Route } from "svelte-routing";
  import AboutPage from './pages/AboutPage.svelte';
  import HomePage from './pages/HomePage.svelte';
  export let url = "";
</script>

<Router {url}>
  <Route path="/about" component={AboutPage} />
  <Route path="/" component={HomePage} />
</Router>
