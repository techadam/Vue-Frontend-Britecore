<template>
   <div>
      <div class="row no-gutters risks-row">
         <div class="col-sm-8 mx-auto">
            <div class="card shadow-sm">
               <div class="card-header">
                  <span class="risk-head" style="text-transform: capitalize"><i class="fa fa-angle-double-down text-success"></i> {{risk.risk_name}}</span>
                  <button @click="goToDetail(risk.id)" class="btn btn-success pull-right mr-3"><i class="fas fa-table"></i> Back to Table View</button>
               </div>
               <div class="card-body p-0">
                  <form class="p-5" action="" method="post">
                     <div class="form-group" :key="field.id" v-for="field in risk_fields" v-if="risk.id === field.risk_type_id">
                        <label for="">{{field.readable_name}}</label>
                        <input :type="getSingleFieldType(field.field_type_id).type_name" :placeholder="field.readable_name" class="form-control shadow-sm" v-if="getSingleFieldType(field.field_type_id).type_options_req === false" name="" value="">

                        <select type="text" class="form-control shadow-sm" v-if="getSingleFieldType(field.field_type_id).type_options_req === true && getSingleFieldType(field.field_type_id).type_options_multiple === false" :name="field.field_name">
                           <option value="">Select</option>
                           <option :key="index" v-for="(option, index) in makeArrObj(field.field_options)" :value="option.name" style="text-transform: capitalize">{{option.name}}</option>
                        </select>

                        <div v-if="getSingleFieldType(field.field_type_id).type_options_req === true && getSingleFieldType(field.field_type_id).type_options_multiple === true">
                           <span :key="index" v-for="(option, index) in makeArrObj(field.field_options)" class="mr-3">
                              <input type="checkbox" :name="field.field_name" :value="option.name" /><span style="text-transform: capitalize"> {{option.name}}</span>
                           </span>
                        </div>

                     </div>
                     <div class="form-group mt-4">
                        <button type="button" name="button" class="btn btn-success btn-block btn-rounded"><i class="fa fa-share-square"></i> Administer form</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import axios from 'axios';

   export default {
      name: 'RiskForm',
      data() {
         return {
            risk: {},
            risk_field: {

            },
         }
      },
      methods: {
         /*
         * Go to Detail view of the current selected risk type and respective field
         */
         goToDetail(riskId) {
            this.$router.push({ name: 'riskdetail', params: { id: riskId }})
         },
         /*
         * get risk type
         */
         getRiskType(id) {
            axios.get(`http://127.0.0.1:8000/api/risks/${id}/`)
            .then(res => {
               this.risk = res.data
            })
            .catch(error => console.log(error))
         },

         /*
         * Remove risk field
         */
         removeField(fieldId) {
            axios.delete(`http://127.0.0.1:8000/api/risk_fields/${fieldId}/`)
            .then(res => {
               this.$store.dispatch('REMOVE_FIELD', res.data);
               this.$alertify.success('Field  removed successfully');
            })
            .catch(error => (console.log(error)))
         },

         /*
         * Remove risk field
         */
         getSingleFieldType(id) {
            return this.field_types.find(field => field.id === id);
         },
         /*
         *Make the field options an array of Objects
         */
         makeArrObj(field_options) {
            const option_arr = field_options.split(',');
            const obj_arr = [];
            for(let i = 0; i < option_arr.length; i++) {
               obj_arr.push({name: option_arr[i].trim()})
            }
            return obj_arr;
         }
      },
      watch: {
         '$route' (to, from) {
            const id = to.params.id;
            this.getRiskType(id);
            console.log(id);
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
         }
      },
   }
</script>
