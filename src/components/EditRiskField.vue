<template>
   <div>
      <div class="popup-overlay" :class="isOpen">
        <div class="popup-content w-40 mx-auto mt-5">
            <div class="popup-header">
              <h5 class="popup-title"><i class="fa fa-angle-double-down text-success"></i> Update risk field</h5>
              <button type="button" @click="close()" className="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form method="post" @submit="onSubmit" id="editFieldForm">
               <div class="msg"></div>
               <div class="popup-body">
                  <div class="form-group">
                     <div class="form-group">
                        <label>Field name</label>
                        <input type="text" name="field_name" class="form-control" v-model="risk_field.readable_name" placeholder="Enter field name"  />
                     </div>
                     <div class="form-group">
                        <label for="">Field type</label>
                        <select class="form-control" required name="field_type_id" onchange="" v-model="risk_field.field_type_id" @change="changeOption">
                           <option value="">Select field type</option>
                           <option :key="field.id" v-for="field in field_types" :value="field.id">{{field.type_name}}</option>
                        </select>
                     </div>
                     <div class="form-group" v-if="options_edit === true">
                        <label for="">Field options</label>
                        <textarea name="field_options" required rows="4" v-model="risk_field.field_options" placeholder="Enter field options separated by comma ',' e.g Male, Female" class="form-control"></textarea>
                     </div>
                  </div>
               </div>
               <div class="popup-footer">
                 <button type="button" class="btn btn-secondary mr-2" @click="close">Close</button>
                 <button type="submit" class="btn btn-success">Save changes</button>
               </div>
            </form>
          </div>
        </div>
   </div>
</template>


<script type="text/javascript">
   import axios from 'axios';

   export default {
      name: 'EditRiskField',
      props: ['field_types', 'risk_name', 'rid', 'isOpen'],
      data() {
         return {
            risk_field: {},
            options_edit: false,
         }
      },
      methods: {
         goToForm(riskId) {
            this.$router.push({ name: 'riskform', params: { id: riskId }})
         },
         changeOption(e) {
            const field_id = parseInt(e.target.value);
            const field_obj = this.field_types.find(field => (field.id === field_id));
            this.options_edit = field_obj.type_options_req;
         },
         close() {
            //Emit close event to close Modal
            this.$emit('closeRequest');
         },
         onSubmit(e) {
            e.preventDefault();
            let flag = true;

            const data = {
               id: this.risk_field.id,
               risk_type_id: this.risk_field.risk_type_id,
               readable_name: this.risk_field.readable_name,
               field_name: this.risk_field.readable_name.split(' ').join('_').toLowerCase(),
               field_type_id: parseInt(this.risk_field.field_type_id),
               field_options: (this.options_edit)? this.risk_field.field_options : '',
            }
            console.log(data);

            if(data.readable_name.trim() === '') {
               flag = true;
               this.$alertify.error("Field name required");
            }

            if(flag !== false) {
               if(isNaN(data.field_type_id)) {
                  flag = true;
                  this.$alertify.error("Field type is required");
               }
            }

            if(flag !== false) {
               if(data.field_options.trim() === '' && this.options_edit === true) {
                  flag = true;
                  this.$alertify.error("Provide Field options separated by commas");
               }
            }

            if(flag !== false) {
               //Update form
               axios.put(`http://127.0.0.1:8000/api/risk_fields/11/`, data)
               .then(res => {
                  this.$store.dispatch('UPDATE_FIELD', data);
                  this.$alertify.success('Risk field updated successfully');
               })
               .catch(error => (console.log(error)))
            }

         }
      },
      mounted() {
         console.log(this.risk_field)
      },
      computed: {
         field_options() {
            return this.$store.getters.FIELD_TYPE_OPTIONS(this.rid);
         }
      }
   }
</script>
