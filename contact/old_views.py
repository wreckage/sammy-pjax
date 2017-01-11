from json import dumps

from django.shortcuts import render
from django.core.context_processors import csrf
from django.http import HttpResponse

from forms import ContactForm

def contact(request):
    template = 'contact/contact.html'
    if request.GET.get('_pjax'):
        template = 'contact/contact-pjax.html'

    context = {}
    context.update(csrf(request))
    form = ContactForm(data=request.POST or None)
    if request.method == 'POST' and request.is_ajax():
        if form.is_valid():
            form.save()
            return HttpResponse(
                dumps({'result': 'success'}),
            )
        else:
            print dict(form.errors.items())
            return HttpResponse(
                dumps({
                    'result': 'fail',
                    'errors': form.errors
                       }),
            )
    context['form'] = form
    return render(request, template, context)
