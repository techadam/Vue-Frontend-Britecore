<template>
   <div class="row no-gutters risks-row">
      <div class="col-sm-8 mx-auto">
         <div class="card shadow-sm">
            <div class="card-header">
               <span class="risk-head"><i class="fa fa-angle-double-down text-success"></i> Property Risk types</span>
               <button class="btn btn-outline-success pull-right" data-toggle="modal" data-target="#exampleModalLong"><i class="fa fa-plus"></i> Add new</button>
            </div>
            <div class="card-body p-0">
               <table class="table">
                  <thead>
                     <tr>
                        <th class="pl-4">Name</th>
                        <th>Fields</th>
                        <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr v-for="risk in risks" v-bind:key="risk.id">
                        <td className="pl-4">
                           {{risk.risk_name}}
                        </td>
                        <td>
                           <div v-for="field in risk_fields" v-bind:key="field.id" v-if="risk.id === field.risk_type_id" style="text-transform: capitalize">
                              <i className="fa fa-angle-double-right"></i> {{field.readable_name}}
                           </div>
                        </td>
                        <td>
                           <router-link class="btn btn-link text-success mr-2" :to="{ name: 'riskdetail', params: { id: risk.id }}" ><i class="fa fa-eye"></i></router-link>
                           <button class="btn btn-link text-primary mr-2" data-toggle="modal" data-target="#updateModalLong" @click="updateRisk(risk.id)"><i class="far fa-edit"></i></button>
                           <button class="btn btn-link text-danger mr-2" @click="deleteRisk(risk.id)"><i class="fa fa-trash-alt"></i></button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>

      <!--Add Risk Component -->
      <AddRisk />

      <EditRisk @fetchRisks="fetchRisks" />
   </div>
</template>

<script>
   import axios from 'axios';
   import AddRisk from './AddRisk';
   import EditRisk from './EditRisk';

   export default {
      name: 'Risks',
      components: {AddRisk, EditRisk},
      methods: {
         updateRisk(riskId) {
            const riskIndex = this.risks.filter(risk => risk.id === riskId)[0];
            this.$children[1].risk = riskIndex;
         },
         deleteRisk(riskId) {
            if(!isNaN(riskId)) {
               //NP Loader
               NProgress.start();
               //Delete Request
               axios.delete(`https://r9ki93pvvd.execute-api.us-west-2.amazonaws.com/dev/api/risks/${riskId}`)
               .then(res => {
                  this.$alertify.success('Risk type successfully deleted');
                  this.$store.dispatch('DELETE_RISK', res.data);
                  NProgress.done();
               })
               .catch(error => (console.log(error)))
            }
         },
         fetchRisks() {
            this.$store.dispatch('GET_RISK');
         }
      },
      created() {
         /*
         * Fetch risk types from store
         */
         this.$store.dispatch('GET_RISK')

         /*
         * Fetch all risk fields from store
         */
         this.$store.dispatch('GET_RISK_FIELDS')
      },
      computed: {
         risks() {
            return this.$store.getters.RISKS;
         },
         risk_fields() {
            return this.$store.getters.RISK_FIELDS;
         }
      }
   }

</script>
