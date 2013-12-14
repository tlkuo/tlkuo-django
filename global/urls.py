from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    # Bad Request
    url(r'^400$', 'django.views.defaults.bad_request'),
    # Forbidden
    url(r'^403$', 'django.views.defaults.permission_denied'),
    # Not Found
    url(r'^404$', 'django.views.defaults.page_not_found'),
    # Internal Server Error
    url(r'^500$', 'django.views.defaults.server_error'),
)
