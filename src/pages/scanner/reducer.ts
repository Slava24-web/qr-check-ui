type State = {
    openedScanner: boolean
    scannerResult: '',
    lessonId: ''
}

type action = {
    type: string
    [key: string]: any
}

// REDUCER
export default function ScannerReducer(state: State, action: action) {
    switch (action.type) {
        case 'goToScanner':
            return {
                ...state,
                openedScanner: action.openedScanner,
                lessonId: action.lessonId
            }
        case 'successScan':
            return {
                ...state,
                scannerResult: action.scannerResult
            }
        default:
            return state
    }
}