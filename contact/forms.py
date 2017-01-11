from django import forms
#from django.core.mail import send_mail


class ContactForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super(ContactForm, self).__init__(*args, **kwargs)
        self.fields['subject'].widget.attrs['autofocus'] = 'autofocus'

    subject = forms.CharField(max_length=100)
    sender = forms.EmailField(label="Email")
    message = forms.CharField(widget=forms.Textarea)
    #cc_myself = forms.BooleanField(label="Send me a copy:", required=False)

    def _message_dict(self):
        message_dict = {}
        message_dict['subject'] = self.cleaned_data['subject']
        message_dict['message'] = self.cleaned_data['message']
        message_dict['from_email'] = self.cleaned_data['sender']
        #cc_myself = self.cleaned_data['cc_myself']

        recipients = ['reubenurbina@gmail.com']
        #if cc_myself:
            #recipients.append(sender)
        message_dict['recipient_list'] = recipients
        return message_dict

    def save(self):
        #send_mail(**self._message_dict())
        #print self._message_dict()
        pass
