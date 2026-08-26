<template>
<!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="index3.html" class="nav-link">Home</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Navbar Search -->
      <li class="nav-item">
        <a class="nav-link" data-widget="navbar-search" href="#" role="button">
          <i class="fas fa-search"></i>
        </a>
        <div class="navbar-search-block">
          <form class="form-inline">
            <div class="input-group input-group-sm">
              <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
              <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                  <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>
      <li class="nav-item">
                <a @click="signOut" class="nav-link" role="button">
                    <i class="fas fa-sign-out-alt text-danger"></i>
                </a>
            </li>

     
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#" aria-expanded="false">
          <i class="fas fa-language"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right" style="left: inherit; right: 0px;">
          
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item" @click="switchLang('en')">
            <i class="fi fi-us mr-2"></i> English
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item" @click="switchLang('kh')">
            <i class="fi fi-kh mr-2"></i> Khmer
          </a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
          <i class="fas fa-th-large"></i>
        </a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>
<script setup>
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const {locale} =useI18n();

async function signOut() {
    await Swal.fire({
        title: 'Are you sure?',
        text: "You will be signed out from the system!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, sign me out!'
    }).then((result) => {
        if (result.isConfirmed) {
            return router.push({ name: 'SignOut' });
        }
    });
}
function switchLang (lang) {
  locale.value=lang;
}
</script>