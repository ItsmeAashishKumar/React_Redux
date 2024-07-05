const redux = require('redux');
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;



//action
const FETCH_USER_REQUEST='FETCH_USER_REQUEST'
const FETCH_USER_SUCCESS='FETCH_USER_SUCCESS'
const FETCH_USER_FAILURE='FETCH_USER_FAILURE'

//intial state
const initialState={
    loading:false,
    user:[],
    error:''
}
//action promoter
function userRequest(){
    return{
        type:FETCH_USER_REQUEST
    }
}

function userRequestSuccess(){
    return{
        type:FETCH_USER_SUCCESS,
        payload:user
    }
}

function userRequestFailure(){
    return{
        type:FETCH_USER_FAILURE,
        payload:error
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_USER_REQUEST:
            return{
                ...state,
                loading:true

            }
        case FETCH_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                user:action.payload
            }
        case FETCH_USER_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
    }
}
const fetchUser=()=>{
    return function(dispatch){
        dispatch(userRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            const users=response.data.map(user=>user.id)
            dispatch(userRequestSuccess(users))
        }).catch(error=>{
            dispatch(userRequestFailure(error.message))
        })  
    }
}

const store=createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(()=>{
    console.log("Store Connected")
})
store.dispatch(fetchUser())
