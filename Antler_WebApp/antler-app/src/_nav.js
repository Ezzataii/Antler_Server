export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: { variant: 'primary' }
    },

    {
      title: true,
      name: 'Displays & Ads',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Routing',
      url: '/Routing',
      icon: 'fa fa-plug'
    },
    {
      name: 'Displays',
      url: '/base',
      icon: 'fa fa-television',
      children: [
        {
          name: 'Hosts',
          url: '/base/Hosts',
          icon: 'fa fa-user'
        },
        {
          name: 'Sites',
          url: '/base/Sites',
          icon: 'fa fa-map-marker'
        },
        {
          name: 'Setup Device',
          url: '/SetupDevice',
          icon: 'fa fa-cog'
        }
      ]
    },
    {
      name: 'Ads',
      url: '/base',
      icon: 'fa fa-picture-o'
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Other'
    },
    {
      name: 'Map',
      url: '/map',
      icon: 'fa fa-map',
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'icon-bell'
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'icon-bell'
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell'
        }
      ]
    },
    {
      name: 'About Us',
      url: '#',
      icon: 'fa fa-info',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: 'noopener' }
    }
  ]
}
