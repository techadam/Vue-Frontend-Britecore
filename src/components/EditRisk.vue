<template>
   <div>
      <div class="modal fade" id="updateModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle"><i class="fa fa-angle-double-down text-success"></i> Update {{risk.risk_name}}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form method="post" @submit="onSubmit">
               <div class="msg"></div>
               <div class="modal-body">
                  <div class="form-group">
                     <label>Risk type name</label>
                     <input type="text" name="risk_name" class="form-control" v-model="risk.risk_name" placeholder="Enter risk type name" required />
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


<script>
import axios from 'axios'

export default {
   name: 'EditRisk',
   data() {
      return {
         risk: {
            id: '',
            risk_name: '',
         },
      }
   },
   methods: {
      onSubmit(e) {
         e.preventDefault();

         if(this.risk_name !== '') {
            axios.put(`http://127.0.0.1:8000/api/risks/${this.risk.id}/`, this.risk)
            .then(res => {
               if(res.data.id) {
                  //Update main state
                  this.$store.dispatch('UPDATE_RISK', res.data);
                  this.$emit('fetchRisks');
                  this.$alertify.success('Risk type name updated successfully');
               }else{
                  this.$alertify.error('Invalid Request. Please try again');
               }
               console.log(res.data);
            })
            .catch(error => console.log(error))
         }else{
            this.$alertify.error('Risk type name is required');
         }
      }
   }
}

</script>
