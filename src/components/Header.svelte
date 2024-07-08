<script lang="ts">
const path = window.location.pathname;
const Menu = [
  {
    title: "Home",
    path: "/",
    active: path === "/",
    isHome: true,
  },
  { title: "About",
    path: "/about",
    active: path === "/about",
    isHome: false,
  }
];
</script>


<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">Social Login</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      {#each Menu as item}
      <li class={`nav-item ${item.active ? 'active' : ''}`}>
        <a class="nav-link" href={item.path}>
          {item.title}
          {#if item.isHome}
            <span class="sr-only">(current)</span>
          {/if}
        </a>
      </li>
      {/each}
    </ul>
  </div>
</nav>