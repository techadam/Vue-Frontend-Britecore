<template>
   <div>
      <div class="row no-gutters risks-row">
         <div class="col-sm-8 mx-auto">
            <div class="card shadow-sm">
               <div class="card-header">
                  <span class="risk-head" style="text-transform: capitalize"><i class="fa fa-angle-double-down text-success"></i> {{risk.risk_name}}</span>
                  <button class="btn btn-outline-success pull-right" data-toggle="modal" data-target="#RiskFieldModalLong"><i class="fa fa-plus"></i> Add new Field</button>
                  <button @click="goToForm(risk.id)" class="btn btn-success pull-right mr-3"><i class="fab fa-wpforms"></i> View Form</button>
               </div>
               <div class="card-body p-0">
                  <table class="table">
                     <thead>
                        <tr>
                           <th class="pl-4">Fields</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr :key="field.id" v-for="field in risk_fields" v-if="risk.id === field.risk_type_id">
                           <td class="pl-4">
                              <div style="text-transform: capitalize">
                                 <i class="fa fa-angle-double-right"></i> {{field.readable_name}}
                              </div>
                           </td>
                           <td>
                              <button class="btn btn-link text-primary mr-2" @click="editFieldModal(field.id, risk.id)" data-toggle="modal" data-target="#EditRiskFieldModalLong"><i class="far fa-edit"></i></button>
                              <button @click="removeField(field.id)" class="btn btn-link text-danger mr-2"><i class="fa fa-trash-alt"></i></button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>

      <AddRiskField :field_types="field_types" :risk_name="risk.risk_name" :rid="risk.id" />

      <EditRiskField
         :field_types="field_types"
         :risk_name="risk.risk_name"
         :rid="risk.id"
         :isOpen="isOpen"

         @closeRequest="close"
      />
   </div>
</template>

<script>
   import axios from 'axios';
   import AddRiskField from './AddRiskField';
   import EditRiskField from './EditRiskField';

   export default {
      components: {AddRiskField, EditRiskField},
      name: 'RiskDetail',
      data() {
         return {
            risk: {},
            risk_field: {},
            isOpen: 'popup-close',
         }
      },
      methods: {
         /*
         * Go to Form view of the current selected risk type and respective field
         */
         goToForm(riskId) {
            this.$router.push({ name: 'riskform', params: { id: riskId }})
         },

         /*
         * Close Edit modal
         */
         close() {
            this.isOpen = 'popup-close';
         },

         /*
         * Fetch the data of the current selected risk type
         */
         getRiskType(id) {
            //NP loader
            NProgress.start();
            //Get Request
            axios.get(`https://r9ki93pvvd.execute-api.us-west-2.amazonaws.com/dev/api/risks/${id}/`)
            .then(res => {
               this.risk = res.data;
               NProgress.done();
            })
            .catch(error => console.log(error))
         },

         /*
         *
         */
         editFieldModal(fieldId, riskId) {
            const riskField = this.risk_fields.filter(field => field.id === fieldId && field.risk_type_id === riskId);
            this.$children[1].risk_field = riskField[0];

            const field_obj = this.field_types.find(field => (field.id === riskField[0].field_type_id));
            this.$children[1].options_edit = field_obj.type_options_req;
            this.isOpen = '';
            console.log(this.$children[1].risk_field)
         },

         /*
         * Remove risk field
         */
         removeField(fieldId) {
            //NP loader
            NProgress.start();
            //Delete Request
            axios.delete(`https://r9ki93pvvd.execute-api.us-west-2.amazonaws.com/dev/api/risk_fields/${fieldId}/`)
            .then(res => {
               this.$store.dispatch('REMOVE_FIELD', res.data);
               this.$alertify.success('Field  removed successfully');
            })
            .catch(error => (console.log(error)))
         }
      },
      watch: {
         '$route' (to, from) {
            const id = to.params.id;
            this.getRiskType(id);
         }
      },
      created() {
         const id = this.$route.params.id;
         this.getRiskType(id);

         this.$store.dispatch('GET_FIELD_TYPES');
      },
      computed: {
         risk_fields() {
            return this.$store.getters.RISK_FIELDS;
         },
         field_types() {
            return this.$store.getters.FIELD_TYPES;
         },
      },
   }
</script>
