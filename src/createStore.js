export function createStore(rootReduser, initialState) {
   let state = rootReduser(initialState, {type: '__ININ__'})
   let subscribers = []
   
   return {
      dispatch(action) {
         state = rootReduser(state, action)
         subscribers.forEach(sub => sub())
      },
      subscribe(callback) {
         subscribers.push(callback)
      },
      getState() {
         return state
      }
   }
}