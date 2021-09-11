import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'calendar',
                title    : 'Calendrier',
         
                type     : 'item',
                icon     : 'today',
                url      : '/apps/calendar'
            },
            {
                id       : 'academy',
                title    : 'Mes invitation',
              
                type     : 'item',
                icon     : 'school',
                url      : '/apps/academy'
            },
            {
                id       : 'chat',
                title    : 'Chat',
              
                type     : 'item',
                icon     : 'chat',
                url      : '/apps/chat',
         
            },

            {
                id   : 'profile',
                title: 'Profile',
                type : 'item',
                icon : 'person',
                url  : '/pages/profile'
            },
            {
                id   : 'search-modern',
                title: 'Recherche des groupes',
                icon : 'search',
                type : 'item',
                url  : '/pages/search/modern'
            },
            {
                id   : 'faq',
                title: 'Faq',
                type : 'item',
                icon : 'help',
                url  : '/pages/faq'
            },
            {
                id   : 'cards',
                title: 'Trouver un avocat',
                type : 'item',
                icon : 'crop_portrait',
                url  : '/ui/cards'
            },
            {
                id   : 'full-width-2',
                title: 'Blog',
                type : 'item',
                icon : 'home',
                url  : '/ui/page-layouts/carded/full-width-2'
            },
            {
                id   : 'full-width-tabbed-1',
                title: 'Créer un groupe',
                type : 'item',
                icon : 'create',
                url  : '/ui/page-layouts/simple/left-sidebar-1'
            }
 
        ]
    }
  
];
