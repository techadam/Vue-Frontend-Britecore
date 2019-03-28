<template>
   <div>
      <div class="modal fade" id="RiskFieldModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle"><i class="fa fa-angle-double-down text-success"></i> Add custom risk field to {{risk_name}}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form method="post" @submit="onSubmit" id="addFieldForm">
               <div class="msg"></div>
               <div class="modal-body">
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
                     <div class="form-group" v-if="options === true">
                        <label for="">Field options</label>
                        <textarea name="field_options" required rows="4" v-model="risk_field.field_options" placeholder="Enter field options separated by comma ',' e.g Male, Female" class="form-control"></textarea>
                     </div>
                  </div>
               </div>
               <div class="modal-footer">
                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                 <button type="submit" class="btn btn-success">Save changes</button>
               </div>
            </form>
          </div>
        </div>
      </div>
   </div>
</template>


<script type="text/javascript">
   import axios from 'axios';

   export default {
      name: 'AddRiskField',
      props: ['field_types', 'risk_name', 'rid'],
      data() {
         return {
            risk_field: {
               risk_type_id: this.rid,
               readable_name: '',
               field_name: '',
               field_type_id: '',
               field_options: '',
            },
            options: false,
         }
      },
      methods: {
         changeOption(e) {
            const value = e.target.value;
            if(value.trim() !== '') {
               const field_id = parseInt(value.trim());
               const field_obj = this.field_types.find(field => (field.id === field_id));
               this.options = field_obj.type_options_req;
            }
         },
         onSubmit(e) {
            e.preventDefault();
            let flag = true;

            const data = {
               risk_type_id: this.rid,
               readable_name: this.risk_field.readable_name,
               field_name: this.risk_field.readable_name.split(' ').join('_').toLowerCase(),
               field_type_id: parseInt(this.risk_field.field_type_id),
               field_options: this.risk_field.field_options,
            }

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
               if(data.field_options.trim() === '' && this.options === true) {
                  flag = true;
                  this.$alertify.error("Provide Field options separated by commas");
               }
            }

            if(flag !== false) {
               //Save form
               axios.post('https://r9ki93pvvd.execute-api.us-west-2.amazonaws.com/dev/api/risk_fields/', data)
               .then(res => {
                  this.$store.dispatch('SAVE_FIELD', data);
                  this.$alertify.success('Risk field added successfully');

                  //Clear Form field
                  this.options = false;
                  document.querySelector('#addFieldForm').reset();
               })
               .catch(error => (console.log(error)))
            }

         }
      },
      created() {

      }
   }
</script>
