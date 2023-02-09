const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    total: state => state.spu.data.total,
    spuList: state => state.spu.data.records
}
export default getters
