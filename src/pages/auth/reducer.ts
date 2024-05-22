type State = {
    login: string
    account: string
    isAuth: boolean,
    teacherId: string
}

type action = {
    type: string
    [key: string]: any
}

// REDUCER
export default function AuthReducer(state: State, action: action) {
    switch (action.type) {
        case 'auth':
            return {
                ...state,
                login: action.payload.login,
                isAuth: true,
                teacherId: action.payload.teacherId
            }
        default:
            return state
    }
}