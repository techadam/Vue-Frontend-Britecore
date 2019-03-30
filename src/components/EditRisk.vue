<template>
   <div>
      <div class="popup-overlay" :class="isOpen">
        <div class="popup-content w-40 mx-auto mt-5">
         <div class="popup-header">
           <h5 class="popup-title"><i class="fa fa-angle-double-down text-success"></i> Update {{risk.risk_name}}</h5>
           <button type="button" className="close" @click="disableModal" data-dismiss="modal" aria-label="Close">
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
              <button type="button" class="btn btn-secondary" @click="disableModal">Close</button>
              <button type="submit" class="btn btn-success">Save changes</button>
            </div>
         </form>
       </div>
     </div>
   </div>
</template>


<script>
import axios from 'axios'

export default {
   name: 'EditRisk',
   props: ['isOpen'],
   data() {
      return {
         risk: {},
      }
   },
   methods: {
      disableModal() {
         this.$emit('disableModal');
      },
      onSubmit(e) {
         e.preventDefault();

         if(this.risk.risk_name !== '') {
            //NP Loader
            NProgress.start();
            //Put Request
            axios.put(`https://cors-anywhere.herokuapp.com/https://r9ki93pvvd.execute-api.us-west-2.amazonaws.com/dev/api/risks/${this.risk.id}/`, this.risk)
            .then(res => {
               if(res.data.id) {
                  //Update main state
                  this.$store.dispatch('UPDATE_RISK', res.data);
                  this.$emit('fetchRisks');
                  this.$alertify.success('Risk type name updated successfully');
                  NProgress.done();
                  this.$emit('disableModal');
               }else{
                  this.$alertify.error('Invalid Request. Please try again');
               }
            })
            .catch(error => console.log(error))
         }else{
            this.$alertify.error('Risk type name is required');
         }
      }
   }
}

</script>
