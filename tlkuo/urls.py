from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'tlkuo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^about/', include('about.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^hook/', include('github_hook.urls')),
)
