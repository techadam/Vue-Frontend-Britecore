import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

const url = 'https://r9ki93pvvd.execute-api.us-west-2.amazonaws.com/dev';

export const store = new Vuex.Store({
   state: {
      risks: [],
      risk_fields: [],
      field_types: [],
   },
   getters: {
      RISKS: state => {
         return state.risks
      },
      RISK_FIELDS: state => {
         return state.risk_fields
      },
      FIELD_TYPES: state => {
         return state.field_types
      },
      FIELD_TYPE_OPTIONS: (state) => (id) => {
         return state.field_types.find(field => (field.id === id));
      }
   },
   mutations: {
      SET_RISK: (state, payload) => {
         state.risks = payload
      },
      ADD_RISK: (state, payload) => {
         state.risks.push(payload)
      },
      UPDATE_RISK: (state, payload) => {
         const index = state.risks.findIndex(risk => risk.id === payload.id);
         state.risks[index] = payload;
      },
      DELETE_RISK: (state, payload) => {
         const index = state.risks.findIndex(risk => risk.id === payload);
         state.risks.splice(index, 1);
      },
      ADD_FIELD: (state, payload) => {
         state.risk_fields.push(payload)
      },
      UPDATE_FIELD: (state, payload) => {
         const index = state.risk_fields.findIndex(field => field.id === payload.id);
         state.risk_fields[index] = payload;
      },
      SET_RISK_FIELDS: (state, payload) => {
         state.risk_fields = payload
      },
      SET_FIELD_TYPES: (state, payload) => {
         state.field_types = payload
      },
      DELETE_RISK_FIELD: (state, payload) => {
         const index = state.risk_fields.findIndex(field => field.id === payload);
         state.risk_fields.splice(index, 1);
      }
   },
   actions: {
         GET_RISK : async (context, payload) => {
            await axios.get(`${url}/api/risks/`).then(res => {
                  context.commit('SET_RISK', res.data);
               }).catch(error => (console.log(error)))
         },
        GET_RISK_FIELDS : async (context, payload) => {
           await axios.get(`${url}/api/risk_fields/`).then(res => {
              context.commit('SET_RISK_FIELDS', res.data);
           }).catch(error => (console.log(error)))
       },
       UPDATE_RISK: (context, payload) => {
          context.commit('UPDATE_RISK', payload)
       },
       DELETE_RISK: (context, payload) => {
          context.commit('DELETE_RISK', payload)
       },
       UPDATE_FIELD: (context, payload) => {
          context.commit('UPDATE_FIELD', payload)
       },
       GET_FIELD_TYPES : async (context, payload) => {
          await axios.get(`${url}/api/field_types/`).then(res => {
             context.commit('SET_FIELD_TYPES', res.data);
          }).catch(error => (console.log(error)))
       },
       SAVE_RISK: (context, payload) => {
          context.commit('ADD_RISK', payload)
       },
       SAVE_FIELD: (context, payload) => {
          context.commit('ADD_FIELD', payload)
       },
       REMOVE_FIELD: (context, payload) => {
          context.commit('DELETE_RISK_FIELD', payload);
       }
   }
});
