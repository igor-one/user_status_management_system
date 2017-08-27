# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-25 18:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='user_status',
            field=models.CharField(choices=[('working', 'Working'), ('business_trip', 'Business Trip'), ('vacation', 'On Vacation')], default='working', max_length=32),
        ),
        migrations.DeleteModel(
            name='UserStatus',
        ),
    ]