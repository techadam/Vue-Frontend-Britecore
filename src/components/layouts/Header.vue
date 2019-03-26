<template>
   <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
     <a class="navbar-brand text-success" to="/">App Insured</a>
     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>

     <div class="collapse navbar-collapse" id="navbarSupportedContent">
       <ul class="navbar-nav mr-auto">
         <li class="nav-item active">
           <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
         </li>
         <li class="nav-item">
           <router-link class="nav-link" to="/about">About</router-link>
         </li>
       </ul>
     </div>
   </nav>
</template>
