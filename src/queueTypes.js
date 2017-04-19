import sessionStorage from './sessionStorage'

export default {
    "non-persistent": () => [],
    "persistent-session": () => sessionStorage('logging')
};