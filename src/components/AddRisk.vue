<template>
   <div>
      <div class="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle"><i class="fa fa-angle-double-down text-success"></i> Add risk type</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form method="post" @submit="onSubmit">
               <div class="msg"></div>
               <div class="modal-body">
                  <div class="form-group">
                     <label>Risk type name</label>
                     <input type="text" name="risk_name" class="form-control" v-model="risk_name" placeholder="Enter risk type name" required />
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
   name: 'AddRisk',
   data() {
      return {
         risk_name: '',
      }
   },
   methods: {
      onSubmit(e) {
         e.preventDefault();

         if(this.risk_name !== '') {
            //NP Loader
            NProgress.start();
            //Post Request
            axios.post('https://r9ki93pvvd.execute-api.us-west-2.amazonaws.com/dev/api/risks/', {risk_name: this.risk_name})
            .then(res => {
               if(res.data.id) {
                  //Update main state
                  this.$store.dispatch('SAVE_RISK', res.data);
                  this.risk_name = '';
                  this.$alertify.success('Risk type name added successfully');
                  NProgress.done();
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
