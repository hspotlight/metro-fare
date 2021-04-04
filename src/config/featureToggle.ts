import Config from './config.json'

export const canShowMobileUi = () => Config.feature_toggles.can_show_mobile_ui

export const canShowSideMenu = () => Config.feature_toggles.show_side_menu

export const canShowRoutingDrawer = () => Config.feature_toggles.show_routing_drawer