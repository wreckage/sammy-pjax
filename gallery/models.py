from django.db import models


class Gallery(models.Model):
    description = models.CharField(max_length=1000)

    class Meta:
        verbose_name = "Gallery"
        verbose_name_plural = "Galleries"

    def __unicode__(self):
        return self.description

class GalleryImage(models.Model):
    gallery = models.ForeignKey(Gallery)
    img = models.ImageField(upload_to="gallery/img/")
    description = models.CharField(max_length=1000)

    def __unicode__(self):
        return self.description
