export class TodoFakeDb
{
    public static todos = [
        {
            'id'       : '561551bd7fe2ff461101c192',
            'title'    : 'Prendre un rendez-vous',
            'notes'    : 'Id nulla nulla proident deserunt deserunt proident in quis. Cillum reprehenderit labore id anim laborum.',
            'startDate': 'Wednesday, January 29, 2017 3:17 PM',
            'dueDate'  : null,
            'completed': false,
            'starred'  : false,
            'important': false,
            'deleted'  : false,
            'tags'     : [1]
        },
        {
            'id'       : '561551bd4ac1e7eb77a3a750',
            'title'    : 'Réponse de rendez-vous',
            'notes'    : '',
            'startDate': 'Sunday, February 1, 2018 1:30 PM',
            'dueDate'  : 'Friday, December 30, 2019 10:07 AM',
            'completed': false,
            'starred'  : false,
            'important': true,
            'deleted'  : false,
            'tags'     : [1, 4]
        },
        {
            'id'       : '561551bd917bfec2ddef2d49',
            'title'    : 'Paiment de rendez-vous',
            'notes'    : 'Sunt laborum enim nostrud ea fugiat cillum mollit aliqua exercitation ad elit.',
            'startDate': 'Friday, April 11, 2017 3:43 AM',
            'dueDate'  : 'Wednesday, July 26, 2017 11:14 AM',
            'completed': false,
            'starred'  : true,
            'important': true,
            'deleted'  : false,
            'tags'     : [3]
        },
        {
            'id'       : '561551bdeeb2fd6877e18c29',
            'title'    : 'Verification ',
            'notes'    : 'Nostrud anim mollit incididunt qui qui sit commodo duis. Anim amet irure aliquip duis nostrud sit quis fugiat ullamco non dolor labore. Lorem sunt voluptate laboris culpa proident. Aute eiusmod aliqua exercitation irure exercitation qui laboris mollit occaecat eu occaecat fugiat.',
            'startDate': 'Wednesday, May 7, 2017 4:14 AM',
            'dueDate'  : 'Friday, December 15, 2017 4:01 AM',
            'completed': true,
            'starred'  : true,
            'important': false,
            'deleted'  : false,
            'tags'     : [2]
        }
    ];

    public static filters = [
        {
            'id'    : 0,
            'handle': 'starred',
            'title' : 'Starred',
            'icon'  : 'star'
        },
        {
            'id'    : 1,
            'handle': 'important',
            'title' : 'Priority',
            'icon'  : 'error'
        },
        {
            'id'    : 2,
            'handle': 'dueDate',
            'title' : 'Sheduled',
            'icon'  : 'schedule'
        },
        {
            'id'    : 3,
            'handle': 'today',
            'title' : 'Today',
            'icon'  : 'today'
        },
        {
            'id'    : 4,
            'handle': 'completed',
            'title' : 'Done',
            'icon'  : 'check'
        },
        {
            'id'    : 4,
            'handle': 'deleted',
            'title' : 'Deleted',
            'icon'  : 'delete'
        }
    ];

    public static tags = [
        {
            'id'    : 1,
            'handle': 'frontend',
            'title' : 'Frontend',
            'color' : '#388E3C'
        },
        {
            'id'    : 2,
            'handle': 'backend',
            'title' : 'Backend',
            'color' : '#F44336'
        },
        {
            'id'    : 3,
            'handle': 'api',
            'title' : 'API',
            'color' : '#FF9800'
        },
        {
            'id'    : 4,
            'handle': 'issue',
            'title' : 'Issue',
            'color' : '#0091EA'
        },
        {
            'id'    : 5,
            'handle': 'mobile',
            'title' : 'Mobile',
            'color' : '#9C27B0'
        }
    ];
}
