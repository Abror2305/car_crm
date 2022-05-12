export default {
    GlobalType: {
        __resolveType: object => {
            if (object.token) return 'token'
            return null
        }
    }
}