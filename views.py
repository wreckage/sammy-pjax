from os.path import splitext

from django.views.generic import TemplateView


class PjaxMixin(object):
    def get_context_data(self, **kwargs):
        # b/c pjax uses ajax, checking ajax works, but not a good idea.
        # Better to check query instead.
        # if self.request.is_ajax():
        if self.request.GET.get("_pjax"):
            name, ext = splitext(self.template_name)
            self.template_name = "{!s}-pjax{!s}".format(name, ext)


class HomeView(PjaxMixin, TemplateView):
    template_name = "home.html"


class AboutView(PjaxMixin, TemplateView):
    template_name = "about.html"
