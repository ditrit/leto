 import Vue from 'vue'
 const state = {
   people: {
     "ID1": {
        name: "Brahim",
        age: "43",
        job: "Front-end Developer",
        option: "testing..."
     },
     "ID2": {
        name: "Sabine",
        age: "40",
        job: "Yoga Teacher",
        option: "testing..."
     },
     "ID3": {
        name: "Sophia",
        age: "8",
        job: "Student",
        option: "testing..."
     },
     "ID4": {
        name: "Gabriel",
        age: "6",
        job: "Student",
        option: "testing..."
     },
     "ID5": {
        name: "Anouk",
        age: "4",
        job: "Student",
        option: "testing..."
     },
   }
 }
 const getters = {
   getPeople: (state) => state.people
 }
 const mutations = {
   MuUpdateAge(state, payload){
   Object.assign(state.people[payload.id], payload.updates)
   return console.log('mutation payload:', payload);
 },
 MDeleteOption(state, id) {
   delete(state.people[id])
 }


}
 const actions = {
   updateAge: ({commit}, payload) => commit('MuUpdateAge', payload),
   deleteOption: ({commit}, id) => commit('MDeleteOption', id)
   }

 export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
