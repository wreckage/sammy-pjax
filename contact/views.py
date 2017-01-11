from json import dumps

from django.shortcuts import render
from django.core.context_processors import csrf
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.messages import success
from django.core.urlresolvers import reverse

from forms import ContactForm


def contact(request):
    template = 'contact/contact.html'
    if request.GET.get('_pjax'):
        template = 'contact/contact-pjax.html'

    context = {}
    context.update(csrf(request))
    form = ContactForm(data=request.POST or None)
    if request.method == 'POST':
        if request.is_ajax():
            if form.is_valid():
                form.save()
                return HttpResponse(
                    dumps({'result': 'success'}),
                )
            else:
                return HttpResponse(
                    dumps({'result': 'fail', 'errors': form.errors}),
                )
        else:
            if form.is_valid():
                form.save()
                success(request, "Thanks... We'll be in touch.")
                return HttpResponseRedirect(reverse('contact'))
    context['form'] = form
    return render(request, template, context)
