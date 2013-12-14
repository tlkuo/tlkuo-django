from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'tlkuo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^about/', include('about.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^hook/', include('github_hook.urls')),
    url(r'^global/', include('global.urls')),
) + static('/jam/static/', document_root = settings.STATIC_JAM)

