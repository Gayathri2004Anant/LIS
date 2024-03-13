# Generated by Django 5.0.3 on 2024-03-12 18:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_book_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='available',
            field=models.BooleanField(default=1),
        ),
        migrations.AddField(
            model_name='book',
            name='last_issue_date',
            field=models.DateField(default=datetime.date(2024, 3, 12)),
        ),
        migrations.AddField(
            model_name='book',
            name='reserved',
            field=models.BooleanField(default=0),
        ),
    ]