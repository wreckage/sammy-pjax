# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'GalleryImage'
        db.create_table(u'gallery_galleryimage', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('gallery', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['gallery.Gallery'])),
            ('img', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
        ))
        db.send_create_signal(u'gallery', ['GalleryImage'])

        # Deleting field 'Gallery.img'
        db.delete_column(u'gallery_gallery', 'img')


    def backwards(self, orm):
        # Deleting model 'GalleryImage'
        db.delete_table(u'gallery_galleryimage')


        # User chose to not deal with backwards NULL issues for 'Gallery.img'
        raise RuntimeError("Cannot reverse this migration. 'Gallery.img' and its values cannot be restored.")
        
        # The following code is provided here to aid in writing a correct migration        # Adding field 'Gallery.img'
        db.add_column(u'gallery_gallery', 'img',
                      self.gf('django.db.models.fields.files.ImageField')(max_length=100),
                      keep_default=False)


    models = {
        u'gallery.gallery': {
            'Meta': {'object_name': 'Gallery'},
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1000'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'gallery.galleryimage': {
            'Meta': {'object_name': 'GalleryImage'},
            'gallery': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['gallery.Gallery']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'img': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['gallery']