from os.path import splitext

from django.views.generic import ListView
# from django.shortcuts import render

from gallery.models import Gallery


class PjaxMixin(object):
    def get_context_data(self, **kwargs):
        context = super(PjaxMixin, self).get_context_data(**kwargs)
        if self.request.GET.get("_pjax"):
            name, ext = splitext(self.template_name)
            self.template_name = "{!s}-pjax{!s}".format(name, ext)
        return context

class GalleryView(PjaxMixin, ListView):
    model = Gallery
    template_name = 'gallery/gallery.html'
