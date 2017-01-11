# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'GalleryImage.description'
        db.add_column(u'gallery_galleryimage', 'description',
                      self.gf('django.db.models.fields.CharField')(default='none', max_length=1000),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'GalleryImage.description'
        db.delete_column(u'gallery_galleryimage', 'description')


    models = {
        u'gallery.gallery': {
            'Meta': {'object_name': 'Gallery'},
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1000'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'gallery.galleryimage': {
            'Meta': {'object_name': 'GalleryImage'},
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1000'}),
            'gallery': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['gallery.Gallery']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'img': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['gallery']