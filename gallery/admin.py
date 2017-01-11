from django.contrib import admin

from gallery.models import Gallery, GalleryImage


class GalleryImageInline(admin.TabularInline):
    model = GalleryImage


class GalleryAdmin(admin.ModelAdmin):
    inlines = [GalleryImageInline]

admin.site.register(Gallery, GalleryAdmin)
