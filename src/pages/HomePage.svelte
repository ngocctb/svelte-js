<script lang="ts">
  import axios from "axios";
  import { form, field } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';
  import MainLayout from "../components/MainLayout.svelte";
  import { Socials } from "../configs/data";

  const clientId = field('client_id', '', [required()], {validateOnChange: false});
  const clientSecret = field('client_secret', '', [required()],  {validateOnChange: false});
  const social = field('social', '', [required()], {validateOnChange: false});
  const redirectUri = field('redirect_uri', '', [required()], {validateOnChange: false});
  const code = field('code', '', [required()], {validateOnChange: false});
  // const scope = field('scope', '', [required()], {validateOnChange: false});

  const myForm = form(clientId, clientSecret, redirectUri, code, social);
  
  const getSocial = () => Socials.filter(s => s.id == $social.value)[0];

  const handleTiktokGetProfile = async () => {
    const { token } = getSocial();
    await axios.post(token, {
      client_id: $clientId.value,
      client_secret: $clientSecret.value,
      redirect_uri: $redirectUri.value,
      code: $code.value,
      grant_type: 'authorization_code'
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: false,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => console.log(error));
  }

  const handleForSocial = () => {
    switch ($social.value) {
      case 'tiktok': 
        return handleTiktokGetProfile();
      default:
        alert('social not supported');
        break;
    }
  }

  const handledSubmit = () => {
    myForm.validate(); 
   console.log($myForm.summary);
   if (!$myForm.valid) {
    return handleForSocial();
   }
  }
</script>

<MainLayout>
  <div class="container py-5">

      <div class="form-group row">
        <label for="client_id" class="col-sm-3 col-form-label">Client ID</label>
        <div class="col-sm-9">
          <input type="text" class={`form-control`} bind:value={$clientId.value} id="client_id" placeholder="Enter here">
          {#if $myForm.hasError('client_id.required')}
            <div class="invalid-feedback d-block">
              client_id is required
            </div>
          {/if}
        </div>
      </div>
  
      <div class="form-group row">
        <label for="client_secret" class="col-sm-3 col-form-label">Client Secret</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" bind:value={$clientSecret.value} id="client_secret" placeholder="Enter here">
          {#if $myForm.hasError('client_secret.required')}
            <div class="invalid-feedback d-block">
              client_secret is required
            </div>
          {/if}
        </div>
      </div>
  
      <div class="form-group row">
       <label for="social" class="col-sm-3 col-form-label">Social</label>    
       <div class="col-sm-9">
          <select name="social" class="form-control" bind:value={$social.value}>
            <option value="">Select Social</option>
            {#each Socials as item }
              <option value={item.id}>{item.name}</option>
            {/each}
          </select>
          {#if $myForm.hasError('social.required')}
            <div class="invalid-feedback d-block">
              social is required
            </div>
          {/if}
       </div>
      </div>
  
      <div class="form-group row">
        <label for="redirect_uri" class="col-sm-3 col-form-label">Redirect URI</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" bind:value={$redirectUri.value} id="redirect_uri" placeholder="Enter Callback URL">
          {#if $myForm.hasError('redirect_uri.required')}
            <div class="invalid-feedback d-block">
              redirect_uri is required
            </div>
          {/if}
        </div>
      </div>

      <div class="form-group row">
        <label for="code" class="col-sm-3 col-form-label">Code</label>
        <div class="col-sm-9">
          <textarea class="form-control" bind:value={$code.value} id="code" placeholder="Enter Code"  rows="5" />
          {#if $myForm.hasError('code.required')}
          <div class="invalid-feedback d-block">
            code is required
          </div>
        {/if}
        </div>
      </div>
  
  
      <div class="form-group row">
        <div class="col-md-10 offset-md-2 text-center">
          <button type="submit" class="btn btn-primary w-50" on:click={handledSubmit}>Test Request</button>
        </div>
      </div>

  </div>
</MainLayout>
