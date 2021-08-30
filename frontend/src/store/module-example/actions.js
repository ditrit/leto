import services from '../../services/Users'

export const showAllUsers = ({commit}) => {
	services.getAlllUsers().then((response) => {
		commit('GET_ALL_USERS', response.data)
	})
}
