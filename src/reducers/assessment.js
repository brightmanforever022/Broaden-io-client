export default (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_ASSESSMENT':
      return {
        ...state,
        isFetching: action.isFetching
      }
    case 'ASSESSMENT_SUCCESS':
      return {
        ...action.assessment,
        errorMessage: '',
        isFetching: action.isFetching
      }
    case 'ASSESSMENT_FAILURE':
      return {
        ...state,
        errorMessage: action.message,
        isFetching: action.isFetching
      }
    case 'REQUEST_UPDATE':
      return {
        ...state,
        errorMessage: '',
        isFetching: action.isFetching
      }
    case 'UPDATE_ASSESSMENT':
      return {
        ...state,
        errorMessage: '',
        isFetching: action.isFetching,
        ...action.assessment
      }
    default:
      return {...state}
  }
}
