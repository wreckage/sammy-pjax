from django.conf.urls import patterns, include, url
# from django.views.generic import TemplateView
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
# Following 2 imports are for serving uploaded files locally in development
from django.conf.urls.static import static
from django.conf import settings

import views
import gallery.views
import contact.views

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', views.HomeView.as_view(), name='home'),
    url(r'^about/$', views.AboutView.as_view(), name='about'),
    url(r'^gallery/$', gallery.views.GalleryView.as_view(), name='gallery'),
    url(r'^contact/$', contact.views.contact, name='contact'),
    # url(r'^skeleton/', include('skeleton.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    url(r'^admin/', include(admin.site.urls)),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += staticfiles_urlpatterns()
